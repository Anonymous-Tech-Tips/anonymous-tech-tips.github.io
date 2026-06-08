import { useEffect, useRef, useState } from 'react';

interface GameOverlayEvent extends CustomEvent {
  detail: { url: string };
}

export function GameOverlay() {
  const [gameUrl, setGameUrl] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      setGameUrl((e as GameOverlayEvent).detail.url);
    };
    window.addEventListener('open-game-overlay', handler);
    return () => window.removeEventListener('open-game-overlay', handler);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setGameUrl(null);
    };
    if (gameUrl) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gameUrl]);

  // Hide background app content while game runs — reduces compositor work and
  // prevents the React tree from competing with the game's RAF on the shared thread.
  useEffect(() => {
    const mainContent = document.getElementById('app-main-content');
    if (!mainContent) return;
    if (gameUrl) {
      mainContent.style.visibility = 'hidden';
      mainContent.style.pointerEvents = 'none';
    } else {
      mainContent.style.visibility = '';
      mainContent.style.pointerEvents = '';
    }
    return () => {
      mainContent.style.visibility = '';
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
        canvas {
          width: 100% !important; height: 100% !important;
          display: block !important;
        }
      `;
      (doc.head || doc.documentElement).appendChild(style);
    } catch (_) { /* cross-origin — no-op */ }
  };

  if (!gameUrl) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#000', display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{
        display: 'flex', justifyContent: 'flex-end',
        background: 'rgba(0,0,0,0.7)', padding: '4px 8px',
      }}>
        <button
          onClick={() => setGameUrl(null)}
          style={{
            background: 'rgba(255,255,255,0.1)', border: 'none',
            color: '#fff', cursor: 'pointer', padding: '4px 12px',
            borderRadius: '4px', fontSize: '14px',
          }}
        >
          ✕ Close
        </button>
      </div>
      <iframe
        ref={iframeRef}
        src={gameUrl}
        style={{
          flex: 1, border: 'none', width: '100%',
          // Promote to separate GPU compositing layer so the game renders
          // independently without competing with the parent page compositor.
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
        allow="autoplay; fullscreen; gamepad; pointer-lock; microphone; camera"
        sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-downloads allow-orientation-lock allow-modals"
        onLoad={injectFullscreenCSS}
      />
    </div>
  );
}
