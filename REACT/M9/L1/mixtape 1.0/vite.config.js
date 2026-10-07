import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// El plugin de React es lo que le enseña a Vite a entender JSX
export default defineConfig({
    plugins: [react()],
});
