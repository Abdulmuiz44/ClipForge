export const logger = {
  info(message: string, meta?: unknown) {
    console.info(`[PromptClips] ${message}`, meta ?? "");
  },
  error(message: string, meta?: unknown) {
    console.error(`[PromptClips] ${message}`, meta ?? "");
  },
};
