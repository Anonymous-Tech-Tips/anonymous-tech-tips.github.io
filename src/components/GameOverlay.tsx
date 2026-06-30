import { useEffect, useRef, useState, useCallback } from 'react';

interface GameOverlayDetail { url: string; title?: string; }
interface GameOverlayEvent extends CustomEvent { detail: GameOverlayDetail; }

export function GameOverlay() {
  const [gameUrl, setGameUrl] = useState<string | null>(null);
  const [gameTitle, setGameTitle] = useState<string>('');
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setGameUrl(null);
    setGameTitle('');
    window.dispatchEvent(new CustomEvent('close-game-overlay'));
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const { url, title } = (e as GameOverlayEvent).detail;
      setLoaded(false);
      setGameUrl(url);
      setGameTitle(title ?? '');
    };
    window.addEventListener('open-game-overlay', handler);
    return () => window.removeEventListener('open-game-overlay', handler);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    if (gameUrl) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gameUrl, close]);

  // Hide background — content-visibility skips layout+paint for the hidden tree
  useEffect(() => {
    const mainContent = document.getElementById('app-main-content');
    if (!mainContent) return;
    if (gameUrl) {
      mainContent.style.contentVisibility = 'hidden';
      mainContent.style.pointerEvents = 'none';
    } else {
      mainContent.style.contentVisibility = '';
      mainContent.style.pointerEvents = '';
    }
    return () => {
      mainContent.style.contentVisibility = '';
      mainContent.style.pointerEvents = '';
    };
  }, [gameUrl]);

  const injectFullscreenCSS = () => {
    try {
      const doc = iframeRef.current?.contentDocument;
      if (!doc) return;
      const style = doc.createElement('style');
      style.textContent = `
        html, body {
          width: 100% !important; height: 100% !important;
          margin: 0 !important; padding: 0 !important;
          overflow: hidden !important;
        }
        canvas { width: 100% !important; height: 100% !important; display: block !important; }
      `;
      (doc.head || doc.documentElement).appendChild(style);
    } catch (_) { /* cross-origin — no-op */ }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      (overlayRef.current ?? document.documentElement).requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  if (!gameUrl) return null;

  return (
    <div
      ref={overlayRef}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#000', display: 'flex', flexDirection: 'column' }}
    >
      {/* Console bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '0 12px',
        height: 44,
        background: 'linear-gradient(180deg, rgba(8,8,20,0.98) 0%, rgba(8,8,20,0.92) 100%)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
      }}>
        {/* Status dot + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 7, height: 7, borderRadius: '50%',
            background: loaded ? '#22c55e' : '#f59e0b',
            boxShadow: loaded ? '0 0 6px #22c55e' : '0 0 6px #f59e0b',
            flexShrink: 0,
          }} />
          <span style={{
            color: '#e2e8f0', fontSize: 13, fontWeight: 700,
            letterSpacing: '0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {gameTitle || 'Loading…'}
          </span>
        </div>

        {/* ESC hint — center */}
        <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: 11, fontWeight: 500, letterSpacing: '0.04em', flexShrink: 0 }}>
          ESC to exit
        </span>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <button
            onClick={toggleFullscreen}
            title="Fullscreen"
            style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
              padding: '4px 8px', borderRadius: 6, fontSize: 13,
              display: 'flex', alignItems: 'center',
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)'; }}
          >
            ⛶
          </button>
          <button
            onClick={close}
            title="Close (Esc)"
            style={{
              background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)',
              color: '#f87171', cursor: 'pointer',
              padding: '4px 12px', borderRadius: 6, fontSize: 13, fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 5,
              transition: 'background 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.22)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(239,68,68,0.5)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.12)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(239,68,68,0.25)'; }}
          >
            ✕ Close
          </button>
        </div>
      </div>

      {/* Loading shimmer */}
      {!loaded && (
        <div style={{
          position: 'absolute', inset: '44px 0 0 0',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 16, pointerEvents: 'none',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            border: '3px solid rgba(255,255,255,0.06)',
            borderTopColor: '#3b82f6',
            animation: 'spin 0.75s linear infinite',
          }} />
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, letterSpacing: '0.08em', fontWeight: 500 }}>
            LOADING MODULE
          </span>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={gameUrl}
        style={{
          flex: 1, border: 'none', width: '100%',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
        allow="autoplay; fullscreen; gamepad; pointer-lock; microphone; camera"
        sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-downloads allow-orientation-lock allow-modals"
        onLoad={() => { injectFullscreenCSS(); setLoaded(true); }}
      />
    </div>
  );
}
