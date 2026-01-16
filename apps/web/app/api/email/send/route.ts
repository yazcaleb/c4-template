import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/components";
import { WelcomeEmail } from "@c4/email";

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Resend not configured" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { to, subject, type = "welcome", data = {} } = body;

    if (!to || !subject) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject" },
        { status: 400 }
      );
    }

    // Select template based on type
    let emailHtml: string;

    switch (type) {
      case "welcome":
        emailHtml = await render(
          WelcomeEmail({
            name: data.name,
            dashboardUrl: data.dashboardUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
          })
        );
        break;
      default:
        return NextResponse.json(
          { error: `Unknown email type: ${type}` },
          { status: 400 }
        );
    }

    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to,
      subject,
      html: emailHtml,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json(
        { error: "Failed to send email", details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: result.data?.id,
    });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
