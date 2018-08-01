export function period(ms: number): string {
  if (ms > 1000) {
    const s = ms / 1000;
    if (s > 60) {
      const m = Math.floor(s / 60);
      const ls = s % 60;
      return `${m}min${ls}s`;
    }
    return `${s.toFixed(2)}s`;
  }
  return `${ms}ms`;
}