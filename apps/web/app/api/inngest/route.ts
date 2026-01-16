import { serve } from "inngest/next";
import { inngest, onboardUser, sendEmail } from "@c4/inngest";

// Serve the Inngest API
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [onboardUser, sendEmail],
});
