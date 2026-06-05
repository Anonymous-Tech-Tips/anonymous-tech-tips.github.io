function g(event: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', event, params);
  }
}

// ── Page / Session ──────────────────────────────────────────────────────────

export function trackPageView(path: string, title?: string) {
  g('page_view', {
    page_location: `${window.location.origin}/#${path}`,
    page_path: path,
    page_title: title || document.title,
  });
}

// ── Games ───────────────────────────────────────────────────────────────────

export function trackGamePlay(gameId: string, gameTitle: string) {
  g('game_play', {
    event_category: 'Games',
    event_label: gameTitle,
    game_id: gameId,
  });
}

export function trackGameCardClick(gameId: string, gameTitle: string, source: string) {
  g('game_card_click', {
    event_category: 'Games',
    event_label: gameTitle,
    game_id: gameId,
    source,
  });
}

// ── Search ──────────────────────────────────────────────────────────────────

export function trackSearch(query: string, resultCount: number, source = 'games_page') {
  g('search', {
    search_term: query,
    result_count: resultCount,
    source,
  });
}

// ── Games Page ──────────────────────────────────────────────────────────────

export function trackCategoryFilter(category: string) {
  g('category_filter', {
    event_category: 'Games',
    event_label: category,
  });
}

export function trackLoadMore(page: number, totalVisible: number) {
  g('load_more', {
    event_category: 'Games',
    page_number: page,
    total_visible: totalVisible,
  });
}

// ── Utilities ───────────────────────────────────────────────────────────────

export function trackUtilityOpen(utilityId: string, utilityName: string) {
  g('utility_open', {
    event_category: 'Utilities',
    event_label: utilityName,
    utility_id: utilityId,
  });
}

// ── Snow Day ────────────────────────────────────────────────────────────────

export function trackSnowDayDistrict(districtId: string) {
  g('snow_day_district_select', {
    event_category: 'SnowDay',
    event_label: districtId,
  });
}

export function trackSnowDayDayChange(dayIndex: number, label: string) {
  g('snow_day_day_change', {
    event_category: 'SnowDay',
    event_label: label,
    day_index: dayIndex,
  });
}

// ── Auth ────────────────────────────────────────────────────────────────────

export function trackLoginAttempt(method = 'email') {
  g('login_attempt', {
    event_category: 'Auth',
    method,
  });
}

export function trackLoginSuccess(method = 'email') {
  g('login', {
    method,
  });
}

export function trackLoginFailure(reason: string) {
  g('login_failure', {
    event_category: 'Auth',
    event_label: reason,
  });
}

// ── Sharing ─────────────────────────────────────────────────────────────────

export function trackShare(contentType: string, itemId: string, method: string) {
  g('share', {
    content_type: contentType,
    item_id: itemId,
    method,
  });
}

// ── Generic ─────────────────────────────────────────────────────────────────

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  g(action, {
    event_category: category,
    event_label: label,
    value,
  });
}
