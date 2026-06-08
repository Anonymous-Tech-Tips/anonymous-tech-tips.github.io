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
        style={{ flex: 1, border: 'none', width: '100%' }}
        allow="autoplay; fullscreen; gamepad; pointer-lock; microphone; camera"
        sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-downloads allow-orientation-lock allow-modals"
      />
    </div>
  );
}
