import React, { useState, lazy, Suspense } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LucideIcon, ExternalLink, ArrowUpRight } from "lucide-react";

const UtilityModal = lazy(() =>
  import("./UtilityModal").then(m => ({ default: m.UtilityModal }))
);
const GuideModal = lazy(() =>
  import("./GuideModal").then(m => ({ default: m.GuideModal }))
);

interface ContentItem {
  text: string;
  url?: string;
  utility?: "password" | "color" | "text" | "qr";
  guide?: string; // Internal guide identifier
  cloakedUrl?: string; // URL to open in about:blank iframe
  highlight?: boolean; // Special emphasis for premium items
}

interface ContentSectionProps {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  items: (string | ContentItem)[];
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  id,
  icon: Icon,
  title,
  description,
  items,
}) => {
  const { isAuthenticated } = useAuth();
  const [selectedUtility, setSelectedUtility] = useState<"password" | "color" | "text" | "qr" | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  const handleUtilityClick = (utility: string) => {
    if (utility === "password" || utility === "color" || utility === "text" || utility === "qr") {
      setSelectedUtility(utility);
    }
  };

  const handleGuideClick = (guide: string) => {
    setSelectedGuide(guide);
  };

  const handleCloakedClick = (url: string) => {
    const win = window.open('about:blank', '_blank');
    if (win) {
      win.document.write(`
        <!DOCTYPE html>
        <html style="margin:0; height:100%; overflow:hidden;">
          <body style="margin:0; height:100%; overflow:hidden;">
            <iframe src="${url}" style="width:100%; height:100%; border:none;"></iframe>
          </body>
        </html>
      `);
      win.document.close();
    }
  };

  // Split leading emoji from the rest of the text for visual treatment
  const parseItem = (text: string) => {
    const emojiMatch = text.match(/^(\p{Emoji_Presentation}|\p{Emoji}️)\s*/u);
    if (emojiMatch) return { emoji: emojiMatch[0].trim(), label: text.slice(emojiMatch[0].length) };
    return { emoji: null, label: text };
  };

  return (
    <>
      <section
        id={id}
        className={`py-10 ${isAuthenticated ? "" : "bg-background"}`}
      >
        <div className={isAuthenticated ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
          {isAuthenticated ? (
            <div className="flex items-center gap-2 mb-5">
              <Icon className="text-blue-400" size={18} />
              <h2 className="text-lg font-black text-white">{title}</h2>
              <span className="text-xs text-slate-500 ml-1">{description}</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <Icon className="text-primary" size={32} />
                <h2 className="text-3xl md:text-4xl font-rowdies font-bold text-foreground">{title}</h2>
              </div>
              <p className="text-lg mb-8 text-muted-foreground">{description}</p>
            </>
          )}

          <div className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-3 ${isAuthenticated ? '' : 'gap-4'}`}>
            {items.map((item, index) => {
              const itemText = typeof item === 'string' ? item : item.text;
              const itemUrl = typeof item === 'string' ? undefined : item.url;
              const itemUtility = typeof item === 'string' ? undefined : item.utility;
              const itemGuide = typeof item === 'string' ? undefined : item.guide;
              const itemCloakedUrl = typeof item === 'string' ? undefined : item.cloakedUrl;
              const itemHighlight = typeof item === 'string' ? undefined : item.highlight;
              const { emoji, label } = parseItem(itemText);

              const authCardClass = itemHighlight
                ? "group bg-[#1a1208] border border-amber-500/30 hover:border-amber-400/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] rounded-2xl p-4 transition-all duration-200"
                : "group bg-[#13131f] border border-white/6 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] rounded-2xl p-4 transition-all duration-200";

              const innerContent = (
                <div className="flex items-center gap-3">
                  {emoji && (
                    <span className="text-xl flex-shrink-0 w-8 text-center">{emoji}</span>
                  )}
                  <span className={`flex-1 text-sm font-semibold leading-snug ${
                    isAuthenticated
                      ? itemHighlight ? "text-amber-300 group-hover:text-amber-200" : "text-slate-200 group-hover:text-white"
                      : "text-foreground group-hover:text-primary"
                  } transition-colors`}>
                    {label}
                  </span>
                  {(itemUrl || itemCloakedUrl) && isAuthenticated && (
                    <ArrowUpRight size={14} className="text-slate-600 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                  )}
                </div>
              );

              if (!isAuthenticated) {
                return (
                  <div key={index} className={`p-6 rounded-lg border transition-all duration-normal hover:scale-105 bg-card border-border hover:border-primary hover:shadow-lg`}>
                    {itemUrl ? (
                      <a href={itemUrl} target="_blank" rel="noopener noreferrer" className="font-medium block text-foreground hover:text-primary">{itemText}</a>
                    ) : (
                      <p className="font-medium text-foreground">{itemText}</p>
                    )}
                  </div>
                );
              }

              return (
                <div key={index} className={authCardClass}>
                  {itemUrl ? (
                    <a href={itemUrl} target="_blank" rel="noopener noreferrer" className="block">{innerContent}</a>
                  ) : itemCloakedUrl ? (
                    <button onClick={() => handleCloakedClick(itemCloakedUrl)} className="block w-full text-left">{innerContent}</button>
                  ) : itemUtility ? (
                    <button onClick={() => handleUtilityClick(itemUtility)} className="block w-full text-left">{innerContent}</button>
                  ) : itemGuide ? (
                    <button onClick={() => handleGuideClick(itemGuide)} className="block w-full text-left">{innerContent}</button>
                  ) : (
                    <div>{innerContent}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedUtility && (
        <Suspense fallback={null}>
          <UtilityModal
            isOpen={!!selectedUtility}
            onClose={() => setSelectedUtility(null)}
            utilityType={selectedUtility}
          />
        </Suspense>
      )}

      {selectedGuide && (
        <Suspense fallback={null}>
          <GuideModal
            isOpen={!!selectedGuide}
            onClose={() => setSelectedGuide(null)}
            guideType={selectedGuide}
          />
        </Suspense>
      )}
    </>
  );
};
