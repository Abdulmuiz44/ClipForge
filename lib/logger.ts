export const logger = {
  info(message: string, meta?: unknown) {
    console.info(`[ClipForge] ${message}`, meta ?? "");
  },
  warn(message: string, meta?: unknown) {
    console.warn(`[ClipForge] ${message}`, meta ?? "");
  },
  error(message: string, meta?: unknown) {
    console.error(`[ClipForge] ${message}`, meta ?? "");
  },
};
