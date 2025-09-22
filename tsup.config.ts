import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/index.web.ts"],
  outDir: "lib",
  format: ["cjs", "esm"], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  splitting: false,
  sourcemap: true,
  clean: true,
})