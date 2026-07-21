export function formatPostTitle(title: string, subtitle?: string) {
  return subtitle ? `${title}: ${subtitle}` : title;
}

export function formatShortDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
