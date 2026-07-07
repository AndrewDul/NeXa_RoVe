export function publicPath(path: string) {
  if (path.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(path)) return path;
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\/+/, "")}`;
}
