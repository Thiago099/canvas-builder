import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite"

// custom jsx pragma
export default defineConfig({

    resolve: {
        alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        }
    }
})