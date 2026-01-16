import fs from "fs-extra";
import path from "path";

export async function runSetup() {
  console.log("🚀 Running C4 Stack setup...\n");

  // Check for .env
  const envExists = await fs.pathExists(".env.local");
  if (!envExists) {
    const envExample = await fs.readFile(".env.example", "utf-8");
    await fs.writeFile(".env.local", envExample);
    console.log("✅ Created .env.local from .env.example");
    console.log("📝 Please fill in your environment variables\n");
  }

  console.log("✅ Setup complete!");
  console.log("\nNext steps:");
  console.log("1. Fill in .env.local with your API keys");
  console.log("2. Run 'pnpm dev' to start development");
}

runSetup().catch(console.error);
