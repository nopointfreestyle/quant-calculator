import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
    plugins: [vue(), tailwindcss()],

    css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					@use '@/assets/styles/_globals.scss' as *;
				`,
			}
		}
	},

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    }
})
