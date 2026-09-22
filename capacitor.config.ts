import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.mohema.app",
  appName: "مهمة",
  webDir: "www",

  server: {
    url: "https://mohema.vercel.app",
    cleartext: false,
  },
};

export default config;