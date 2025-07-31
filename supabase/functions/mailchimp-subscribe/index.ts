import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SubscriberData {
  email: string;
  mergeFields?: {
    [key: string]: string | number;
  };
  tags?: string[];
  calculationData?: any;
  materialName?: string;
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

    const { email, mergeFields, tags, calculationData, materialName }: SubscriberData = await req.json();
    
    console.log(`Processing subscription request for email: ${email}`);

    // Get Mailchimp configuration from secrets
    const MAILCHIMP_API_KEY = Deno.env.get('MAILCHIMP_API_KEY');
    const MAILCHIMP_SERVER_PREFIX = Deno.env.get('MAILCHIMP_SERVER_PREFIX') || 'us18';
    const MAILCHIMP_LIST_ID = Deno.env.get('MAILCHIMP_LIST_ID');

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID) {
      console.error('Mailchimp configuration missing');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Prepare the data for Mailchimp API
    const subscriber = {
      email_address: email,
      status: "subscribed",
      merge_fields: mergeFields || {},
      tags: tags || []
    };

    // Call Mailchimp API
    const mailchimpResponse = await fetch(
      `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `apikey ${MAILCHIMP_API_KEY}`
        },
        body: JSON.stringify(subscriber)
      }
    );

    const result = await mailchimpResponse.json();
    
    if (!mailchimpResponse.ok) {
      console.error("Mailchimp API error:", result);
      
      // Store lead in database as backup even if Mailchimp fails
      if (calculationData && materialName) {
        await supabaseClient
          .from('calculator_leads')
          .insert({
            email,
            calculation_data: calculationData,
            material_name: materialName,
            created_at: new Date().toISOString()
          });
      }
      
      return new Response(
        JSON.stringify({ 
          error: 'Email subscription failed, but your information has been saved',
          fallback: true
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Store successful lead in database for tracking
    if (calculationData && materialName) {
      await supabaseClient
        .from('calculator_leads')
        .insert({
          email,
          calculation_data: calculationData,
          material_name: materialName,
          mailchimp_member_id: result.id,
          created_at: new Date().toISOString()
        });
    }

    console.log(`Successfully subscribed ${email} to Mailchimp`);
    
    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Successfully subscribed to updates!'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(
      JSON.stringify({ error: 'Subscription service error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});