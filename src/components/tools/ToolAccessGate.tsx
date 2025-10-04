import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface ToolAccessGateProps {
  isOpen: boolean;
  onOptIn: (email: string, firstName: string) => void;
}

export const ToolAccessGate = ({ isOpen, onOptIn }: ToolAccessGateProps) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !email.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please provide your first name and email.',
        variant: 'destructive',
      });
      return;
    }

    if (!agreedToPrivacy) {
      toast({
        title: 'Privacy policy',
        description: 'Please agree to the privacy policy to continue.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if already subscribed
      const { data: existing } = await supabase
        .from('newsletter_subscribers')
        .select('email')
        .eq('email', email.toLowerCase().trim())
        .maybeSingle();

      if (!existing) {
        // Add to newsletter subscribers
        const { error: insertError } = await supabase
          .from('newsletter_subscribers')
          .insert({
            email: email.toLowerCase().trim(),
            first_name: firstName.trim(),
          });

        if (insertError) {
          throw insertError;
        }

        // Send welcome email
        const { error: emailError } = await supabase.functions.invoke('send-welcome-email', {
          body: {
            firstName: firstName.trim(),
            email: email.toLowerCase().trim(),
          },
        });

        if (emailError) {
          console.error('Failed to send welcome email:', emailError);
          // Don't block access if email fails
        }
      }

      // Grant access
      onOptIn(email.toLowerCase().trim(), firstName.trim());

      toast({
        title: 'Welcome aboard! 🎉',
        description: 'You now have unlimited access to all our AI tools. Check your email for a welcome message!',
      });

      // Reset form
      setFirstName('');
      setEmail('');
      setAgreedToPrivacy(false);
    } catch (error: any) {
      console.error('Opt-in error:', error);
      toast({
        title: 'Something went wrong',
        description: 'Please try again or contact support if the issue persists.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[500px] bg-[#151A22] border-[#1a202c]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Get Unlimited Access 🚀</DialogTitle>
          <DialogDescription className="text-[#E2E8FF]">
            You've used your 3 free queries. Sign up now to continue using all our AI-powered RV technology tools with no limits!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-white">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#131a2a] border-[#1a202c] text-white"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#131a2a] border-[#1a202c] text-white"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="privacy"
              checked={agreedToPrivacy}
              onCheckedChange={(checked) => setAgreedToPrivacy(checked as boolean)}
              disabled={isSubmitting}
              className="mt-1"
            />
            <label
              htmlFor="privacy"
              className="text-sm text-[#E2E8FF] leading-relaxed cursor-pointer"
            >
              I agree to receive helpful RV technology tips and updates. You can unsubscribe anytime.
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting your access...
              </>
            ) : (
              'Get Unlimited Access'
            )}
          </Button>

          <p className="text-xs text-center text-[#898989]">
            🔒 Your information is safe and will never be shared
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
