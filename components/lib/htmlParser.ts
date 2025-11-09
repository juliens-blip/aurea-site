export function cleanHtmlContent(html: string): string {
  // Supprimer les balises <!DOCTYPE>, <html>, <head>, <body>
  let cleaned = html
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<html[^>]*>/gi, '')
    .replace(/<\/html>/gi, '')
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
    .replace(/<body[^>]*>/gi, '')
    .replace(/<\/body>/gi, '');

  // Extraire juste le contenu du container
  const containerMatch = cleaned.match(/<div class="container">([\s\S]*)<\/div>/);
  if (containerMatch) {
    cleaned = containerMatch[1];
  }

  return cleaned;
}