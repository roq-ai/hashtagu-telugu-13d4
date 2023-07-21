const mapping: Record<string, string> = {
  articles: 'article',
  publishers: 'publisher',
  'saved-articles': 'saved_article',
  subscribers: 'subscriber',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
