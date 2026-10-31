import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        emptyOutDir: false,
        lib: {
            entry: new URL('./src/index.ts', import.meta.url).pathname,
            name: 'Lion-UI',
            formats: ['es'],
            fileName: 'index',
            cssFileName: 'style',
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                'react/jsx-dev-runtime',
                'react-bootstrap',
                'bootstrap',
                'bootstrap-icons',
                '@tanstack/react-table',
                '@capacitor/core',
                'react-router-dom',
            ],
        },
    },
});