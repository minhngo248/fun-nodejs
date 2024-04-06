import { createLogger, defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const logger= createLogger();
const loggerWarn = logger.warn;

logger.warn = (msg, options) => {
    // Ignore empty CSS files warning
    if (msg.includes('vite:css') && msg.includes(' is empty')) return loggerWarn(msg, options);
}

const loggerInfo = logger.info;

logger.info = (msg, options) => {
    // Ignore "vite v2.3.8 building for production..." message
    if (msg.includes('vite v') && msg.includes(' building for production...')) return;
    return loggerInfo(msg, options);
}

const loggerError = logger.error;

logger.error = (msg, options) => {
    // Ignore "Failed to load resource" error
    if (msg.includes('Failed to load resource')) return;
    return loggerError(msg, options);
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    customLogger: logger,
    /* server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            }
        }
    } */
})
