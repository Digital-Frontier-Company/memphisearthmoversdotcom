import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.1";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TruckRequest {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  location: string;
  desiredDate: string;
  desiredTime: string;
}

interface GravelOrder {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  location: string;
  quantity: string;
  pickupDelivery: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data } = await req.json();
    
    // Initialize Supabase client
    const supabaseUrl = "https://dghrfpexhbqqotkjbdxr.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnaHJmcGV4aGJxcW90a2piZHhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NzQwNTMsImV4cCI6MjA2NjM1MDA1M30.a7oANo4xjMOR2doEw56YnZOR6K4ti8b0cFhwwZRvA0o";
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Initialize Resend
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    if (type === 'truck-request') {
      const requestData: TruckRequest = data;
      
      // Save to database
      const { error: dbError } = await supabase
        .from('truck_requests')
        .insert({
          first_name: requestData.firstName,
          last_name: requestData.lastName,
          phone: requestData.phone,
          email: requestData.email,
          location: requestData.location,
          desired_date: requestData.desiredDate,
          desired_time: requestData.desiredTime,
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Failed to save truck request');
      }

      // Send notification email
      const emailResponse = await resend.emails.send({
        from: "Memphis Earth Movers <onboarding@resend.dev>",
        to: ["david@memphisearthmovers.com", "dcthompson89@gmail.com"],
        subject: "New Truck Request from Memphis Earth Movers",
        html: `
          <h2>New Truck Request Received</h2>
          <p><strong>Customer Information:</strong></p>
          <ul>
            <li><strong>Name:</strong> ${requestData.firstName} ${requestData.lastName}</li>
            <li><strong>Phone:</strong> ${requestData.phone}</li>
            <li><strong>Email:</strong> ${requestData.email}</li>
            <li><strong>Location:</strong> ${requestData.location}</li>
            <li><strong>Desired Date:</strong> ${requestData.desiredDate}</li>
            <li><strong>Desired Time:</strong> ${requestData.desiredTime}</li>
          </ul>
          <p>Please contact the customer to schedule their truck rental.</p>
        `,
      });

      console.log("Truck request email sent:", emailResponse);

    } else if (type === 'gravel-order') {
      const orderData: GravelOrder = data;
      
      // Save to database
      const { error: dbError } = await supabase
        .from('gravel_orders')
        .insert({
          first_name: orderData.firstName,
          last_name: orderData.lastName,
          phone: orderData.phone,
          email: orderData.email,
          location: orderData.location,
          quantity: orderData.quantity,
          pickup_delivery: orderData.pickupDelivery,
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Failed to save gravel order');
      }

      // Send notification email
      const emailResponse = await resend.emails.send({
        from: "Memphis Earth Movers <onboarding@resend.dev>",
        to: ["david@memphisearthmovers.com", "dcthompson89@gmail.com"],
        subject: "New Gravel Order from Memphis Earth Movers",
        html: `
          <h2>New Gravel Order Received</h2>
          <p><strong>Customer Information:</strong></p>
          <ul>
            <li><strong>Name:</strong> ${orderData.firstName} ${orderData.lastName}</li>
            <li><strong>Phone:</strong> ${orderData.phone}</li>
            <li><strong>Email:</strong> ${orderData.email}</li>
            <li><strong>Location:</strong> ${orderData.location}</li>
            <li><strong>Quantity:</strong> ${orderData.quantity}</li>
            <li><strong>Service Type:</strong> ${orderData.pickupDelivery}</li>
          </ul>
          <p>Please contact the customer to process their gravel order.</p>
        `,
      });

      console.log("Gravel order email sent:", emailResponse);
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error("Error in submit-contact-form function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);