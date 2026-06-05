declare function gtag(...args: unknown[]): void;

const GA_ENABLED = typeof window !== 'undefined' && typeof (window as any).gtag === 'function';

function g(...args: unknown[]) {
  if (GA_ENABLED) (window as any).gtag(...args);
}

export function trackPageView(path: string, title?: string) {
  g('event', 'page_view', {
    page_location: `${window.location.origin}/#${path}`,
    page_path: path,
    page_title: title || document.title,
  });
}

export function trackGamePlay(gameId: string, gameTitle: string) {
  g('event', 'game_play', {
    event_category: 'Games',
    event_label: gameTitle,
    game_id: gameId,
  });
}

export function trackSearch(query: string, resultCount: number) {
  g('event', 'search', {
    search_term: query,
    result_count: resultCount,
  });
}

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  g('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
}
