import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  name?: string;
  dashboardUrl?: string;
}

export function WelcomeEmail({
  name = "there",
  dashboardUrl = "https://app.example.com/dashboard",
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to C4 App!</Preview>
      <Body>
        <Container>
          <Heading>Welcome to C4 App!</Heading>
          <Text>Hi {name},</Text>
          <Text>
            Thanks for signing up! We're excited to have you on board.
          </Text>
          <Section>
            <Button href={dashboardUrl}>
              Go to Dashboard
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default WelcomeEmail;
