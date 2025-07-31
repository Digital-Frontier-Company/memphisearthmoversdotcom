
import { supabase } from "@/integrations/supabase/client";

interface SubscriberData {
  email: string;
  mergeFields?: {
    [key: string]: string | number;
  };
  tags?: string[];
}

export async function addSubscriberToMailchimp(data: SubscriberData): Promise<boolean> {
  try {
    // Use secure edge function instead of direct API call
    const { data: response, error } = await supabase.functions.invoke('mailchimp-subscribe', {
      body: data
    });

    if (error) {
      console.error("Mailchimp subscription error:", error);
      return false;
    }

    return response?.success || false;
  } catch (error) {
    console.error("Error adding subscriber to Mailchimp:", error);
    return false;
  }
}

export async function sendLeadNotification(email: string, calculationData: any, materialName: string): Promise<boolean> {
  try {
    // Use secure edge function for lead notification
    const { data: response, error } = await supabase.functions.invoke('mailchimp-subscribe', {
      body: {
        email,
        calculationData,
        materialName,
        tags: ['calculator-lead'],
        mergeFields: {
          MATERIAL: materialName,
          CALC_DATE: new Date().toISOString()
        }
      }
    });

    if (error) {
      console.error("Error sending lead notification:", error);
      return false;
    }

    // Still store in localStorage for backup tracking
    const savedEmails = JSON.parse(localStorage.getItem('calculatorEmails') || '[]');
    savedEmails.push({
      email,
      date: new Date().toISOString(),
      calculation: calculationData,
      material: materialName,
      label: "MEM LEADS"
    });
    localStorage.setItem('calculatorEmails', JSON.stringify(savedEmails));
    
    return response?.success || false;
  } catch (error) {
    console.error("Error sending lead notification:", error);
    return false;
  }
}
