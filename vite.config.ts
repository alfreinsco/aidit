import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load all env (prefix '' = semua variabel), agar DO_AGENT_* tersedia untuk proxy
  const env = loadEnv(mode, ".", "");
  const agentEndpoint = env.DO_AGENT_ENDPOINT || env.VITE_DO_AGENT_ENDPOINT;
  const agentKey = env.DO_AGENT_KEY || env.VITE_DO_AGENT_KEY;

  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
      proxy:
        agentEndpoint && agentKey
          ? {
              "/api/agent": {
                target: agentEndpoint.replace(/\/$/, ""),
                changeOrigin: true,
                rewrite: () => "/api/v1/chat/completions",
                configure: (proxy) => {
                  proxy.on("proxyReq", (proxyReq) => {
                    proxyReq.setHeader("Authorization", `Bearer ${agentKey}`);
                  });
                },
              },
            }
          : undefined,
    },
    preview: {
      host: "0.0.0.0",
      port: 4173, // port preview Vite
      allowedHosts: [
        "localhost",
        "127.0.0.1",
        "aidit.unpatti.site",
        "165.22.111.146",
      ],
    },
    plugins: [react()],
    define: {
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
