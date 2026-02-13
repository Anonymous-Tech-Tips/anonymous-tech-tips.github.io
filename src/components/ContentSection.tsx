import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LucideIcon } from "lucide-react";
import { UtilityModal } from "./UtilityModal";
import { GuideModal } from "./GuideModal";

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

  return (
    <>
      <section
        id={id}
        className={`py-20 ${isAuthenticated ? "bg-gamer-bg" : "bg-background"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Icon
              className={isAuthenticated ? "text-gamer-accent" : "text-primary"}
              size={32}
            />
            <h2
              className={`text-3xl md:text-4xl font-rowdies font-bold ${isAuthenticated ? "text-gamer-text" : "text-foreground"
                }`}
            >
              {title}
            </h2>
          </div>

          <p
            className={`text-lg mb-8 ${isAuthenticated ? "text-gamer-muted" : "text-muted-foreground"
              }`}
          >
            {description}
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => {
              const itemText = typeof item === 'string' ? item : item.text;
              const itemUrl = typeof item === 'string' ? undefined : item.url;
              const itemUtility = typeof item === 'string' ? undefined : item.utility;
              const itemGuide = typeof item === 'string' ? undefined : item.guide;
              const itemCloakedUrl = typeof item === 'string' ? undefined : item.cloakedUrl;
              const itemHighlight = typeof item === 'string' ? undefined : item.highlight;

              return (
                <div
                  key={index}
                  className={`p-6 rounded-lg border transition-all duration-normal hover:scale-105 ${isAuthenticated
                    ? itemHighlight
                      ? "bg-gamer-card border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:border-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]"
                      : "bg-gamer-card border-gamer-border hover:border-gamer-accent hover:shadow-lg hover:shadow-gamer-accent/10"
                    : "bg-card border-border hover:border-primary hover:shadow-lg"
                    }`}
                >
                  {itemUrl ? (
                    <a
                      href={itemUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-medium block ${isAuthenticated ? (itemHighlight ? "text-amber-400 font-bold tracking-wide" : "text-gamer-text hover:text-gamer-accent") : "text-foreground hover:text-primary"
                        }`}
                    >
                      {itemText}
                    </a>
                  ) : itemCloakedUrl ? (
                    <button
                      onClick={() => handleCloakedClick(itemCloakedUrl)}
                      className={`font-medium text-left w-full ${isAuthenticated ? (itemHighlight ? "text-amber-400 font-bold tracking-wide flex items-center gap-2" : "text-gamer-text hover:text-gamer-accent") : "text-foreground hover:text-primary"
                        }`}
                    >
                      {itemHighlight && <span className="animate-pulse">🔥</span>}
                      {itemText}
                    </button>
                  ) : itemUtility ? (
                    <button
                      onClick={() => handleUtilityClick(itemUtility)}
                      className={`font-medium text-left w-full ${isAuthenticated ? "text-gamer-text hover:text-gamer-accent" : "text-foreground hover:text-primary"
                        }`}
                    >
                      {itemText}
                    </button>
                  ) : itemGuide ? (
                    <button
                      onClick={() => handleGuideClick(itemGuide)}
                      className={`font-medium text-left w-full ${isAuthenticated ? "text-gamer-text hover:text-gamer-accent" : "text-foreground hover:text-primary"
                        }`}
                    >
                      {itemText}
                    </button>
                  ) : (
                    <p
                      className={`font-medium ${isAuthenticated ? "text-gamer-text" : "text-foreground"
                        }`}
                    >
                      {itemText}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <UtilityModal
        isOpen={!!selectedUtility}
        onClose={() => setSelectedUtility(null)}
        utilityType={selectedUtility}
      />

      <GuideModal
        isOpen={!!selectedGuide}
        onClose={() => setSelectedGuide(null)}
        guideType={selectedGuide}
      />
    </>
  );
};
