"use client";

import { useState } from "react";
import { Button } from "@c4/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@c4/ui/components/card";

interface TestEmailSectionProps {
  userEmail: string;
  userName: string;
}

export function TestEmailSection({ userEmail, userName }: TestEmailSectionProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSendTestEmail = async () => {
    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: userEmail,
          subject: "Test Email from C4 App",
          type: "welcome",
          data: {
            name: userName,
            dashboardUrl: `${window.location.origin}/dashboard`,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      setStatus({
        type: "success",
        message: `Test email sent successfully to ${userEmail}!`,
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to send email",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Integration Test</CardTitle>
        <CardDescription>
          Test the Resend email integration (requires RESEND_API_KEY configured)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            This will send a welcome email to <strong>{userEmail}</strong> using the
            configured Resend API.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleSendTestEmail} disabled={loading}>
            {loading ? "Sending..." : "Send Test Email"}
          </Button>
        </div>
        {status.type && (
          <div
            className={`p-3 rounded-md text-sm ${
              status.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {status.message}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
