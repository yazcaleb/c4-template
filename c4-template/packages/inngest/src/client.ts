import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "c4-app",
  env: process.env.INNGEST_ENV,
});
