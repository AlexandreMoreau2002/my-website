export default function generateUrl(locale: string, path: string): string {
  path = path.startsWith('/') ? path.slice(1) : path;
  return `/${locale}/${path}`;
}