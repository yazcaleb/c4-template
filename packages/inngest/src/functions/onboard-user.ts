import { inngest } from "../client";

export const onboardUser = inngest.createFunction(
  {
    id: "onboard-user",
    name: "Onboard New User",
  },
  { event: "user/created" },
  async ({ event, step }) => {
    // Send welcome email
    await step.run("send-welcome-email", async () => {
      console.log(`Sending welcome email to ${event.data.email}`);
      // TODO: Integrate with @c4/email to send actual email
      // import { sendWelcomeEmail } from "@c4/email";
      // await sendWelcomeEmail(event.data.email, event.data.name);
      return { sent: true };
    });

    // Wait 1 day
    await step.sleep("wait-1-day", "1d");

    // Send follow-up email
    await step.run("send-followup-email", async () => {
      console.log(`Sending follow-up email to ${event.data.email}`);
      // TODO: Send follow-up email
      return { sent: true };
    });

    // Wait 3 days
    await step.sleep("wait-3-days", "3d");

    // Send tips email
    await step.run("send-tips-email", async () => {
      console.log(`Sending tips email to ${event.data.email}`);
      // TODO: Send tips email
      return { sent: true };
    });

    return { completed: true };
  }
);
