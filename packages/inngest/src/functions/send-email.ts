import { inngest } from "../client";
import { Resend } from "resend";
import { render } from "@react-email/components";

interface SendEmailData {
  to: string;
  subject: string;
  template: "welcome";
  data?: Record<string, unknown>;
}

export const sendEmail = inngest.createFunction(
  { id: "send-email", name: "Send Email" },
  { event: "email/send" },
  async ({ event, step }) => {
    const { to, subject, template, data = {} } = event.data as SendEmailData;

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Validate Resend is configured
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not configured");
    }

    // Render email template
    const emailHtml = await step.run("render-template", async () => {
      // Dynamically import template to avoid build issues
      const { WelcomeEmail } = await import("@c4/email");

      switch (template) {
        case "welcome":
          return await render(
            WelcomeEmail({
              name: (data.name as string) || "there",
              dashboardUrl: (data.dashboardUrl as string) || undefined,
            })
          );
        default:
          throw new Error(`Unknown email template: ${template}`);
      }
    });

    // Send email
    const result = await step.run("send-email", async () => {
      return await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to,
        subject,
        html: emailHtml,
      });
    });

    if (result.error) {
      throw new Error(`Failed to send email: ${result.error.message}`);
    }

    return {
      success: true,
      id: result.data?.id,
      to,
      subject,
    };
  }
);
