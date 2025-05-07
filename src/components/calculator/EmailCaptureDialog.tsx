
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, XCircle, Mail } from "lucide-react";
import { z } from "zod";

interface EmailCaptureDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

const emailSchema = z.string().email({ message: "Please enter a valid email address" });

const EmailCaptureDialog: React.FC<EmailCaptureDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      emailSchema.parse(email);
      setError("");
      onSubmit(email);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError("Please enter a valid email address");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-mem-darkNavy border-mem-babyBlue/40 text-white max-w-md shadow-[0_0_20px_rgba(77,210,255,0.3)]">
        <DialogHeader>
          <DialogTitle className="text-xl text-mem-babyBlue flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Your Results Are Ready!
          </DialogTitle>
          <DialogDescription className="text-white/80">
            Enter your email to view your material calculation results.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="yourname@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-mem-darkNavy/50 border-mem-babyBlue/40 text-white"
              autoFocus
            />
            {error && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <XCircle className="h-3 w-3" /> {error}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="agree"
              className="rounded border-mem-babyBlue/40 bg-mem-darkNavy/50"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="agree" className="text-sm text-white/80">
              I agree to receive material information and promotions
            </label>
          </div>
          
          <div className="bg-mem-darkNavy/40 p-3 rounded border border-mem-babyBlue/30 text-white/70 text-sm">
            <p className="flex items-start gap-2">
              <Check className="h-4 w-4 text-mem-babyBlue shrink-0 mt-0.5" />
              <span>We'll send your calculation results to your email for future reference</span>
            </p>
            <p className="flex items-start gap-2 mt-2">
              <Check className="h-4 w-4 text-mem-babyBlue shrink-0 mt-0.5" />
              <span>Your privacy is important to us. We won't share your email with third parties.</span>
            </p>
          </div>
          
          <DialogFooter className="pt-2">
            <Button
              type="submit"
              className="w-full bg-mem-blue hover:bg-mem-darkBlue text-white py-6"
            >
              View My Results
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailCaptureDialog;
