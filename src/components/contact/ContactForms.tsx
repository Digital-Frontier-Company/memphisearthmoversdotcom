
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Truck, Calendar, MapPin, User, Phone, Mail } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

const ContactForms = () => {
  const { toast } = useToast();
  
  // Truck Request Form State
  const [truckForm, setTruckForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    location: "",
    date: "",
    time: ""
  });
  
  // Gravel Order Form State
  const [gravelForm, setGravelForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    location: "",
    quantity: "",
    pickupDelivery: "delivery"
  });
  
  const [isSubmittingTruck, setIsSubmittingTruck] = useState(false);
  const [isSubmittingGravel, setIsSubmittingGravel] = useState(false);
  
  const handleTruckFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTruckForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleGravelFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGravelForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTruckFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingTruck(true);
    
    try {
      const { error } = await supabase.functions.invoke('submit-contact-form', {
        body: {
          type: 'truck-request',
          data: {
            firstName: truckForm.firstName,
            lastName: truckForm.lastName,
            phone: truckForm.phone,
            email: truckForm.email,
            location: truckForm.location,
            desiredDate: truckForm.date,
            desiredTime: truckForm.time,
          }
        }
      });

      if (error) throw error;
      
      toast({
        title: "Truck request submitted!",
        description: "We'll get back to you shortly to confirm your request.",
      });
      
      // Reset form
      setTruckForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        location: "",
        date: "",
        time: ""
      });
    } catch (error) {
      console.error('Error submitting truck request:', error);
      toast({
        title: "Error submitting request",
        description: "Please try again or call us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingTruck(false);
    }
  };
  
  const handleGravelFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingGravel(true);
    
    try {
      const { error } = await supabase.functions.invoke('submit-contact-form', {
        body: {
          type: 'gravel-order',
          data: {
            firstName: gravelForm.firstName,
            lastName: gravelForm.lastName,
            phone: gravelForm.phone,
            email: gravelForm.email,
            location: gravelForm.location,
            quantity: gravelForm.quantity,
            pickupDelivery: gravelForm.pickupDelivery,
          }
        }
      });

      if (error) throw error;
      
      toast({
        title: "Gravel order submitted!",
        description: "We'll get back to you shortly to confirm your order.",
      });
      
      // Reset form
      setGravelForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        location: "",
        quantity: "",
        pickupDelivery: "delivery"
      });
    } catch (error) {
      console.error('Error submitting gravel order:', error);
      toast({
        title: "Error submitting order",
        description: "Please try again or call us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingGravel(false);
    }
  };
  
  return (
    <section className="mem-section relative bg-white overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://cdn.midjourney.com/video/c9427689-1d50-4676-801a-4837ce53ec32/0.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/85"></div>
      </div>
      <div className="mem-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Truck Request Form */}
          <Card className="border-mem-blue/20 shadow-lg">
            <CardHeader className="bg-mem-blue/5 border-b border-mem-blue/20">
              <CardTitle className="text-mem-blue">Request a Dump Truck</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleTruckFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="truck-firstName">First Name*</Label>
                    <Input 
                      id="truck-firstName"
                      name="firstName"
                      value={truckForm.firstName}
                      onChange={handleTruckFormChange}
                      required
                      placeholder="Your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="truck-lastName">Last Name*</Label>
                    <Input 
                      id="truck-lastName"
                      name="lastName"
                      value={truckForm.lastName}
                      onChange={handleTruckFormChange}
                      required
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="truck-phone">Phone Number*</Label>
                    <Input 
                      id="truck-phone"
                      name="phone"
                      type="tel"
                      value={truckForm.phone}
                      onChange={handleTruckFormChange}
                      required
                      placeholder="(901) 555-5555"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="truck-email">Email*</Label>
                    <Input 
                      id="truck-email"
                      name="email"
                      type="email"
                      value={truckForm.email}
                      onChange={handleTruckFormChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="truck-location">Location*</Label>
                  <Input 
                    id="truck-location"
                    name="location"
                    value={truckForm.location}
                    onChange={handleTruckFormChange}
                    required
                    placeholder="Job site address"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="truck-date">Desired Date*</Label>
                    <Input 
                      id="truck-date"
                      name="date"
                      type="date"
                      value={truckForm.date}
                      onChange={handleTruckFormChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="truck-time">Desired Time*</Label>
                    <Input 
                      id="truck-time"
                      name="time"
                      type="time"
                      value={truckForm.time}
                      onChange={handleTruckFormChange}
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full mt-2" disabled={isSubmittingTruck}>
                  <Truck className="mr-2 h-5 w-5" />
                  {isSubmittingTruck ? "Submitting..." : "Request a Truck"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Gravel Order Form */}
          <Card className="border-mem-blue/20 shadow-lg">
            <CardHeader className="bg-mem-blue/5 border-b border-mem-blue/20">
              <CardTitle className="text-mem-blue">I Need Gravel?</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleGravelFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gravel-firstName">First Name*</Label>
                    <Input 
                      id="gravel-firstName"
                      name="firstName"
                      value={gravelForm.firstName}
                      onChange={handleGravelFormChange}
                      required
                      placeholder="Your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gravel-lastName">Last Name*</Label>
                    <Input 
                      id="gravel-lastName"
                      name="lastName"
                      value={gravelForm.lastName}
                      onChange={handleGravelFormChange}
                      required
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gravel-phone">Phone Number*</Label>
                    <Input 
                      id="gravel-phone"
                      name="phone"
                      type="tel"
                      value={gravelForm.phone}
                      onChange={handleGravelFormChange}
                      required
                      placeholder="(901) 555-5555"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gravel-email">Email*</Label>
                    <Input 
                      id="gravel-email"
                      name="email"
                      type="email"
                      value={gravelForm.email}
                      onChange={handleGravelFormChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gravel-quantity">How many loads or tons do you need?*</Label>
                  <Input 
                    id="gravel-quantity"
                    name="quantity"
                    value={gravelForm.quantity}
                    onChange={handleGravelFormChange}
                    required
                    placeholder="E.g. 10 tons or 2 loads"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gravel-location">Delivery Location or Pickup*</Label>
                  <Input 
                    id="gravel-location"
                    name="location"
                    value={gravelForm.location}
                    onChange={handleGravelFormChange}
                    required
                    placeholder="Delivery address or 'Pickup'"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Delivery or Pickup?</Label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="pickupDelivery"
                        value="delivery"
                        checked={gravelForm.pickupDelivery === "delivery"}
                        onChange={handleGravelFormChange}
                        className="text-mem-blue"
                      />
                      <span>Delivery</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="pickupDelivery"
                        value="pickup"
                        checked={gravelForm.pickupDelivery === "pickup"}
                        onChange={handleGravelFormChange}
                        className="text-mem-blue"
                      />
                      <span>Pickup</span>
                    </label>
                  </div>
                </div>
                
                <Button type="submit" className="w-full mt-2" disabled={isSubmittingGravel}>
                  <Truck className="mr-2 h-5 w-5" />
                  {isSubmittingGravel ? "Submitting..." : "Order Gravel"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Central Request a Truck Button */}
        <div className="text-center">
          <Button size="lg" className="px-8 py-6 text-lg bg-mem-blue hover:bg-mem-darkBlue">
            <Truck className="mr-2 h-6 w-6" />
            Request a Truck Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactForms;
