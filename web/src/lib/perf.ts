type PerfMeta = Record<string, string | number | boolean | null | undefined>;

export function startServerTimer(name: string) {
  const start = performance.now();

  return {
    end(meta?: PerfMeta) {
      if (process.env.NODE_ENV !== "development") {
        return;
      }
      const elapsedMs = Math.round((performance.now() - start) * 10) / 10;
      const metaText = meta ? ` ${JSON.stringify(meta)}` : "";
      console.info(`[perf] ${name} ${elapsedMs}ms${metaText}`);
    },
  };
}
