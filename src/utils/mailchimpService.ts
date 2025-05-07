
import { toast } from "@/hooks/use-toast";

const API_KEY = "9f98d0d03dac170b104b47ad65786fe6-us18";
const SERVER_PREFIX = "us18";
const LIST_ID = ""; // You'll need to add your list ID here

interface SubscriberData {
  email: string;
  mergeFields?: {
    [key: string]: string | number;
  };
  tags?: string[];
}

export async function addSubscriberToMailchimp(data: SubscriberData): Promise<boolean> {
  try {
    // Prepare the data for Mailchimp API
    const subscriber = {
      email_address: data.email,
      status: "subscribed",
      merge_fields: data.mergeFields || {},
      tags: data.tags || []
    };

    // Call Mailchimp API
    const response = await fetch(`https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `apikey ${API_KEY}`
      },
      body: JSON.stringify(subscriber)
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error("Mailchimp API error:", result);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error adding subscriber to Mailchimp:", error);
    return false;
  }
}

export async function sendLeadNotification(email: string, calculationData: any, materialName: string): Promise<boolean> {
  try {
    // For now, we'll use a simpler approach that doesn't rely on server-side functions
    // We'll log the lead in localStorage and rely on the embedded Mailchimp script
    
    // Store in localStorage for tracking
    const savedEmails = JSON.parse(localStorage.getItem('calculatorEmails') || '[]');
    savedEmails.push({
      email,
      date: new Date().toISOString(),
      calculation: calculationData,
      material: materialName,
      label: "MEM LEADS"
    });
    localStorage.setItem('calculatorEmails', JSON.stringify(savedEmails));
    
    // Return success - the Mailchimp embedded script will handle subscription
    // When the form is properly configured in Mailchimp
    return true;
  } catch (error) {
    console.error("Error sending lead notification:", error);
    return false;
  }
}
