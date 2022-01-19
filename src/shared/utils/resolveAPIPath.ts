export function getUrlFromAPIPath(apiPath: string): string {
  const url = new URL(apiPath, process.env.NEXT_PUBLIC_API_URL);
  return url.href;
}
