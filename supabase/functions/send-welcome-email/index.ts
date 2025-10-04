import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  firstName: string;
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, email }: WelcomeEmailRequest = await req.json();

    console.log(`Sending welcome email to ${email} (${firstName})`);

    const emailResponse = await resend.emails.send({
      from: "RV Tech Tools <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to RV Tech Tools - Unlimited Access Activated! 🚀",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #080F1F;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #080F1F;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #151A22; border-radius: 8px; overflow: hidden;">
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 20px; text-align: center;">
                        <h1 style="color: #FFFFFF; margin: 0; font-size: 28px;">Welcome, ${firstName}! 🎉</h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 20px 40px;">
                        <p style="color: #E2E8FF; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                          Thanks for signing up! You now have unlimited access to all our AI-powered RV technology tools.
                        </p>
                        
                        <h2 style="color: #5B9BD5; font-size: 20px; margin: 30px 0 15px;">Your AI Tools Dashboard:</h2>
                        
                        <div style="background-color: #1a202c; border-left: 3px solid #5B9BD5; padding: 15px; margin-bottom: 15px;">
                          <h3 style="color: #FFFFFF; font-size: 16px; margin: 0 0 8px;">🎯 Readiness Assessment</h3>
                          <p style="color: #E2E8FF; font-size: 14px; margin: 0; line-height: 1.5;">
                            Get personalized RV technology recommendations based on your experience level and goals.
                          </p>
                        </div>
                        
                        <div style="background-color: #1a202c; border-left: 3px solid #5B9BD5; padding: 15px; margin-bottom: 15px;">
                          <h3 style="color: #FFFFFF; font-size: 16px; margin: 0 0 8px;">🔍 Feature Matcher</h3>
                          <p style="color: #E2E8FF; font-size: 14px; margin: 0; line-height: 1.5;">
                            Find the perfect RV tech features that match your lifestyle and needs.
                          </p>
                        </div>
                        
                        <div style="background-color: #1a202c; border-left: 3px solid #5B9BD5; padding: 15px; margin-bottom: 15px;">
                          <h3 style="color: #FFFFFF; font-size: 16px; margin: 0 0 8px;">📚 AI Consultation</h3>
                          <p style="color: #E2E8FF; font-size: 14px; margin: 0; line-height: 1.5;">
                            Get expert guidance on RV technology setup and troubleshooting.
                          </p>
                        </div>
                        
                        <div style="background-color: #1a202c; border-left: 3px solid #5B9BD5; padding: 15px; margin-bottom: 15px;">
                          <h3 style="color: #FFFFFF; font-size: 16px; margin: 0 0 8px;">✅ Technology Checklist</h3>
                          <p style="color: #E2E8FF; font-size: 14px; margin: 0; line-height: 1.5;">
                            Ensure you have all the essential tech for your RV adventures.
                          </p>
                        </div>
                        
                        <div style="background-color: #1a202c; border-left: 3px solid #5B9BD5; padding: 15px; margin-bottom: 15px;">
                          <h3 style="color: #FFFFFF; font-size: 16px; margin: 0 0 8px;">🗺️ Lifestyle Planning</h3>
                          <p style="color: #E2E8FF; font-size: 14px; margin: 0; line-height: 1.5;">
                            Plan your RV lifestyle with AI-powered recommendations.
                          </p>
                        </div>
                        
                        <div style="background-color: #1a202c; border-left: 3px solid #5B9BD5; padding: 15px; margin-bottom: 25px;">
                          <h3 style="color: #FFFFFF; font-size: 16px; margin: 0 0 8px;">🚐 RV Finder</h3>
                          <p style="color: #E2E8FF; font-size: 14px; margin: 0; line-height: 1.5;">
                            Discover the perfect RV that matches your technology preferences.
                          </p>
                        </div>
                        
                        <p style="color: #E2E8FF; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                          Start exploring these tools now and take your RV tech game to the next level!
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px 40px; background-color: #0a0f1a; text-align: center;">
                        <p style="color: #898989; font-size: 14px; margin: 0;">
                          Happy travels!<br>
                          <strong style="color: #5B9BD5;">The RV Tech Tools Team</strong>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
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
