import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AuthRequest {
  driverId: string;
  pin: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { driverId, pin }: AuthRequest = await req.json();
    
    // Get client IP for rate limiting (handle comma-separated IPs)
    const clientIP = (req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1').split(',')[0].trim();
    
    console.log(`Authentication attempt for driver ${driverId} from IP ${clientIP}`);

    // Check rate limiting first
    const { data: rateLimitCheck, error: rateLimitError } = await supabaseClient
      .rpc('check_rate_limit', { 
        p_driver_id: driverId, 
        p_ip_address: clientIP 
      });

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError);
      return new Response(
        JSON.stringify({ error: 'Authentication service error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!rateLimitCheck) {
      console.log(`Rate limit exceeded for driver ${driverId} from IP ${clientIP}`);
      
      // Log failed attempt
      await supabaseClient.rpc('log_login_attempt', {
        p_driver_id: driverId,
        p_ip_address: clientIP,
        p_success: false
      });

      return new Response(
        JSON.stringify({ error: 'Too many failed attempts. Please try again in 15 minutes.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get driver data
    const { data: driver, error: driverError } = await supabaseClient
      .from('drivers')
      .select('id, name, pin, role, active')
      .eq('id', driverId)
      .eq('active', true)
      .single();

    if (driverError || !driver) {
      console.log(`Driver not found: ${driverId}`);
      
      // Log failed attempt
      await supabaseClient.rpc('log_login_attempt', {
        p_driver_id: driverId,
        p_ip_address: clientIP,
        p_success: false
      });

      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // For now, check plain text PIN (will be upgraded to hashed later)
    const pinValid = driver.pin === pin;

    // Log the attempt
    await supabaseClient.rpc('log_login_attempt', {
      p_driver_id: driverId,
      p_ip_address: clientIP,
      p_success: pinValid
    });

    if (!pinValid) {
      console.log(`Invalid PIN for driver ${driverId}`);
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Successful authentication for driver ${driver.name}`);

    // Return driver data (without PIN)
    const { pin: _, ...safeDriverData } = driver;
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        driver: safeDriverData,
        message: `Welcome, ${driver.name}!`
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Authentication error:', error);
    return new Response(
      JSON.stringify({ error: 'Authentication service error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});