// Returns a stable YYYY-MM-DD key, used as the document ID for each day's
// stats bucket. Uses UTC so the key is consistent regardless of which
// timezone a visitor's browser is in — the tradeoff is the "day" boundary
// won't exactly match midnight in India, but it stays consistent, which
// matters more than exactness here.
export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function daysAgoKey(daysAgo: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}