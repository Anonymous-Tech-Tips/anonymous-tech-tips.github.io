import React, { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import { Search, ArrowRight, Gamepad2, Calculator, BookOpen, Hash, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { games } from "@/data/games";
import utilitiesData from "@/data/utilities.json";
import guidesData from "@/data/guides.json";

interface SearchItem {
  id: string;
  title: string;
  description: string;
  type: 'game' | 'utility' | 'guide';
  category?: string;
  tags: string[];
  slug: string;
  featured?: boolean;
}

interface SearchResult extends SearchItem {
  score: number;
}

interface FastSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const FastSearch: React.FC<FastSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  // Create search index with error handling
  const searchIndex = useMemo(() => {
    const allItems: SearchItem[] = [];

    // Safely add games
    try {
      if (Array.isArray(games)) {
        games.forEach(game => {
          if (game?.id && game?.title) {
            allItems.push({
              id: game.id,
              title: game.title,
              description: `Play ${game.title} - ${(game.tags || []).join(', ')}`,
              type: 'game',
              category: game.tags?.[0] || 'game',
              tags: game.tags || [],
              slug: game.id,
              featured: game.featured
            });
          }
        });
      }
    } catch (e) {
      console.warn("Error loading games for search:", e);
    }

    // Safely add utilities
    try {
      if (Array.isArray(utilitiesData)) {
        utilitiesData.forEach(utility => {
          if (utility?.id && utility?.title) {
            allItems.push({
              id: utility.id,
              title: utility.title,
              description: utility.description || '',
              type: 'utility',
              category: utility.category || 'utility',
              tags: utility.tags || [],
              slug: utility.id,
              featured: utility.featured
            });
          }
        });
      }
    } catch (e) {
      console.warn("Error loading utilities for search:", e);
    }

    // Safely add guides
    try {
      if (Array.isArray(guidesData)) {
        guidesData.forEach(guide => {
          if (guide?.id && guide?.title) {
            allItems.push({
              id: guide.id,
              title: guide.title,
              description: guide.description || '',
              type: 'guide',
              category: guide.difficulty || 'guide',
              tags: guide.tags || [],
              slug: guide.id,
              featured: guide.featured
            });
          }
        });
      }
    } catch (e) {
      console.warn("Error loading guides for search:", e);
    }

    return new Fuse(allItems, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'description', weight: 0.3 },
        { name: 'tags', weight: 0.2 },
        { name: 'category', weight: 0.1 }
      ],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2
    });
  }, []);

  // Update results when query changes
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setSelectedIndex(-1);
      return;
    }

    try {
      const fuseResults = searchIndex.search(query);
      const searchResults: SearchResult[] = fuseResults.slice(0, 8).map(result => ({
        ...result.item,
        score: result.score || 0
      }));

      setResults(searchResults);
      setSelectedIndex(searchResults.length > 0 ? 0 : -1);
    } catch (e) {
      console.warn("Search error:", e);
      setResults([]);
    }
  }, [query, searchIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => prev < results.length - 1 ? prev + 1 : 0);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : results.length - 1);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            handleSelect(results[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, results, onClose]);

  const handleSelect = (item: SearchResult) => {
    let path = '';
    switch (item.type) {
      case 'game':
        path = `/games/${item.slug}`;
        break;
      case 'utility':
        path = `/utilities/${item.slug}`;
        break;
      case 'guide':
        path = `/#guides`;
        break;
    }

    navigate(path);
    onClose();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'game': return <Gamepad2 className="h-4 w-4" />;
      case 'utility': return <Calculator className="h-4 w-4" />;
      case 'guide': return <BookOpen className="h-4 w-4" />;
      default: return <Hash className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'game': return 'bg-gamer-accent/20 text-gamer-accent border-gamer-accent/40';
      case 'utility': return 'bg-primary/20 text-primary border-primary/40';
      case 'guide': return 'bg-accent/20 text-accent border-accent/40';
      default: return 'bg-gamer-muted/20 text-gamer-muted border-gamer-border';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gamer-bg/80 backdrop-blur-sm z-50 flex items-start justify-center pt-16 px-4">
      <Card className="w-full max-w-2xl bg-gamer-card border-gamer-border shadow-2xl">
        <CardContent className="p-4">
          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gamer-muted" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search games, utilities, guides..."
              className="pl-10 bg-gamer-bg border-gamer-border text-gamer-text placeholder-gamer-muted focus:border-gamer-accent focus:ring-gamer-accent"
              autoFocus
            />
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {query.length < 2 ? (
              <div className="text-center text-gamer-muted py-8">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Type at least 2 characters to search</p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center text-gamer-muted py-8">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No results found for "{query}"</p>
              </div>
            ) : (
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div
                    key={`${result.type}-${result.id}`}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-fast ${
                      index === selectedIndex
                        ? 'bg-gamer-accent/20 border-gamer-accent'
                        : 'bg-gamer-bg border-gamer-border hover:bg-gamer-bg/50 hover:border-gamer-accent/50'
                    }`}
                    onClick={() => handleSelect(result)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getTypeColor(result.type)}`}>
                        {getTypeIcon(result.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gamer-text truncate">{result.title}</h3>
                          {result.featured && (
                            <Badge className="bg-accent/20 text-accent text-xs border-accent/40">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-gamer-muted line-clamp-2 mb-2">
                          {result.description}
                        </p>

                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className={getTypeColor(result.type)}>
                            {result.type}
                          </Badge>
                          {result.category && (
                            <Badge variant="outline" className="text-xs text-gamer-muted border-gamer-border">
                              {result.category}
                            </Badge>
                          )}
                          <div className="flex gap-1">
                            {(result.tags || []).slice(0, 3).map(tag => (
                              <Badge key={tag} className="text-xs bg-gamer-border/30 text-gamer-muted border-gamer-border">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <ArrowRight className="h-4 w-4 text-gamer-muted" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-gamer-border text-xs text-gamer-muted">
            <div className="flex justify-between items-center">
              <span>↑↓ Navigate • Enter Select • Esc Close</span>
              <span>{results.length} {results.length === 1 ? 'result' : 'results'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { FastSearch };
