import React, { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import type { FuseResult, FuseResultMatch } from "fuse.js";
import { Search, ArrowRight, ExternalLink, Gamepad2, Calculator, BookOpen, Hash, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import gamesData from "@/data/games.json";
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
  matches: readonly Record<string, unknown>[];
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

  // Create search index
  const searchIndex = useMemo(() => {
    const allItems: SearchItem[] = [
      ...gamesData.map(game => ({
        id: game.id,
        title: game.title,
        description: game.description,
        type: 'game' as const,
        category: game.category,
        tags: game.tags,
        slug: game.id,
        featured: game.featured
      })),
      ...utilitiesData.map(utility => ({
        id: utility.id,
        title: utility.title,
        description: utility.description,
        type: 'utility' as const,
        category: utility.category,
        tags: utility.tags,
        slug: utility.id,
        featured: utility.featured
      })),
      ...guidesData.map(guide => ({
        id: guide.id,
        title: guide.title,
        description: guide.description,
        type: 'guide' as const,
        category: guide.difficulty,
        tags: guide.tags,
        slug: guide.id,
        featured: guide.featured
      }))
    ];

    return new Fuse(allItems, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'description', weight: 0.3 },
        { name: 'tags', weight: 0.2 },
        { name: 'category', weight: 0.1 }
      ],
      threshold: 0.3,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
      useExtendedSearch: true
    });
  }, []);

  // Update results when query changes
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setSelectedIndex(-1);
      return;
    }

    const fuseResults = searchIndex.search(query);
    const searchResults: SearchResult[] = fuseResults.slice(0, 8).map(result => ({
      ...result.item,
      score: result.score || 0,
      matches: result.matches || []
    }));

    setResults(searchResults);
    setSelectedIndex(searchResults.length > 0 ? 0 : -1);
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
        path = `/#guides`; // For now, guides are in education section
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
      case 'game': return 'bg-blue-500/20 text-blue-300 border-blue-400';
      case 'utility': return 'bg-purple-500/20 text-purple-300 border-purple-400';
      case 'guide': return 'bg-green-500/20 text-green-300 border-green-400';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-16 px-4">
      <Card className="w-full max-w-2xl bg-slate-900 border-slate-700 shadow-2xl">
        <CardContent className="p-4">
          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search games, utilities, guides..."
              className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500"
              autoFocus
            />
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {query.length < 2 ? (
              <div className="text-center text-gray-400 py-8">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Type at least 2 characters to search</p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No results found for "{query}"</p>
              </div>
            ) : (
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div
                    key={`${result.type}-${result.id}`}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      index === selectedIndex
                        ? 'bg-blue-500/20 border-blue-400'
                        : 'bg-slate-800 border-slate-700 hover:bg-slate-700'
                    }`}
                    onClick={() => handleSelect(result)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getTypeColor(result.type)}`}>
                        {getTypeIcon(result.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-white truncate">{result.title}</h3>
                          {result.featured && (
                            <Badge className="bg-yellow-500/20 text-yellow-300 text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                          {result.description}
                        </p>

                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getTypeColor(result.type)}>
                            {result.type}
                          </Badge>
                          {result.category && (
                            <Badge variant="outline" className="text-xs text-gray-400">
                              {result.category}
                            </Badge>
                          )}
                          <div className="flex gap-1">
                            {result.tags.slice(0, 3).map(tag => (
                              <Badge key={tag} className="text-xs bg-slate-700 text-gray-300">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <ArrowRight className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-slate-700 text-xs text-gray-400">
            <div className="flex justify-between items-center">
              <span>↑↓ Navigate • Enter Select • Esc Close</span>
              <span>{results.length} results</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { FastSearch };
