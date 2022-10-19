import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import fs from "fs"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    https: {
      key: fs.readFileSync("./certificates/server.key"),
      cert: fs.readFileSync("./certificates/server.crt")
    }
  }
})

