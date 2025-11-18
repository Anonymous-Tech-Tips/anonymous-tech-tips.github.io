import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  Plus,
  Share2,
  Trash2,
  Copy,
  ExternalLink,
  Gamepad2,
  Calculator,
  Bookmark,
  X,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import gamesData from "@/data/games.json";
import utilitiesData from "@/data/utilities.json";
import { SEO } from "@/components/SEO";
import { hash, canonical } from '@/lib/paths';

interface CollectionItem {
  id: string;
  title: string;
  type: 'game' | 'utility';
  thumbnail?: string;
}

interface Collection {
  id: string;
  title: string;
  description: string;
  items: CollectionItem[];
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
}

interface CollectionsPageProps {}

const CollectionsPage: React.FC<CollectionsPageProps> = () => {
  const { collectionId } = useParams<{ collectionId?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [currentCollection, setCurrentCollection] = useState<Collection | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCollectionTitle, setNewCollectionTitle] = useState("");
  const [newCollectionDescription, setNewCollectionDescription] = useState("");
  const [availableItems, setAvailableItems] = useState<CollectionItem[]>([]);

  // Load collections from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('collections');
    if (saved) {
      setCollections(JSON.parse(saved));
    }

    // Prepare available items for adding to collections
    const allItems: CollectionItem[] = [
      ...gamesData.map(game => ({
        id: game.id,
        title: game.title,
        type: 'game' as const,
        thumbnail: game.thumbnail
      })),
      ...utilitiesData.map(utility => ({
        id: utility.id,
        title: utility.title,
        type: 'utility' as const,
        thumbnail: utility.thumbnail
      }))
    ];
    setAvailableItems(allItems);
  }, []);

  // Load collection from URL params if present
  useEffect(() => {
    if (collectionId) {
      const collection = collections.find(c => c.id === collectionId);
      if (collection) {
        setCurrentCollection(collection);
      } else {
        // Try to decode from URL params
        const encoded = searchParams.get('data');
        if (encoded) {
          try {
            const decoded = JSON.parse(atob(encoded));
            setCurrentCollection(decoded);
          } catch (error) {
            console.error('Failed to decode collection from URL:', error);
          }
        }
      }
    }
  }, [collectionId, collections, searchParams]);

  // Save collections to localStorage
  const saveCollections = (newCollections: Collection[]) => {
    setCollections(newCollections);
    localStorage.setItem('collections', JSON.stringify(newCollections));
  };

  // Create new collection
  const createCollection = () => {
    if (!newCollectionTitle.trim()) return;

    const newCollection: Collection = {
      id: `collection-${Date.now()}`,
      title: newCollectionTitle,
      description: newCollectionDescription,
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublic: false
    };

    const updatedCollections = [...collections, newCollection];
    saveCollections(updatedCollections);

    setNewCollectionTitle("");
    setNewCollectionDescription("");
    setIsCreateDialogOpen(false);

    // Navigate to the new collection
    navigate(`/collections/${newCollection.id}`);
  };

  // Update collection
  const updateCollection = (updatedCollection: Collection) => {
    const updatedCollections = collections.map(c =>
      c.id === updatedCollection.id ? { ...updatedCollection, updatedAt: new Date().toISOString() } : c
    );
    saveCollections(updatedCollections);
    setCurrentCollection(updatedCollection);
  };

  // Delete collection
  const deleteCollection = (collectionId: string) => {
    const updatedCollections = collections.filter(c => c.id !== collectionId);
    saveCollections(updatedCollections);

    if (currentCollection?.id === collectionId) {
      setCurrentCollection(null);
      navigate('/collections');
    }
  };

  // Add item to collection
  const addItemToCollection = (item: CollectionItem) => {
    if (!currentCollection) return;

    const updatedCollection = {
      ...currentCollection,
      items: [...currentCollection.items, item],
      updatedAt: new Date().toISOString()
    };

    updateCollection(updatedCollection);
  };

  // Remove item from collection
  const removeItemFromCollection = (itemId: string) => {
    if (!currentCollection) return;

    const updatedCollection = {
      ...currentCollection,
      items: currentCollection.items.filter(item => item.id !== itemId),
      updatedAt: new Date().toISOString()
    };

    updateCollection(updatedCollection);
  };

  // Generate shareable URL
  const generateShareUrl = () => {
    if (!currentCollection) return '';

    const encoded = btoa(JSON.stringify(currentCollection));
    const baseUrl = window.location.origin;
    return `${baseUrl}/Armaan-Tech-Tips/collections/${currentCollection.id}?data=${encoded}`;
  };

  // Copy share URL to clipboard
  const copyShareUrl = async () => {
    const url = generateShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  if (currentCollection) {
    // Show specific collection
    const shareUrl = generateShareUrl();

    return (
      <>
        <SEO
          title={`${currentCollection.title} - Curated Collection | Tech Tips`}
          description={currentCollection.description}
          canonical={canonical(`/collections/${currentCollection.id}`)}
        />

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-purple-900 to-blue-900">
            <div className="container mx-auto px-4 py-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/collections')}
                    className="text-white hover:bg-white/10"
                  >
                    ← Back to Collections
                  </Button>
                  <div>
                    <h1 className="text-3xl font-bold text-white font-rowdies">
                      {currentCollection.title}
                    </h1>
                    <p className="text-gray-300 mt-1">{currentCollection.description}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={copyShareUrl} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" onClick={() => deleteCollection(currentCollection.id)} className="bg-red-500/20 border-red-400/50 text-red-300 hover:bg-red-500/30">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Collection Items */}
                <div className="lg:col-span-2">
                  <Card className="bg-white/10 border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Bookmark className="h-5 w-5" />
                        Collection Items ({currentCollection.items.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {currentCollection.items.length === 0 ? (
                        <div className="text-center text-gray-400 py-8">
                          <Bookmark className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No items in this collection yet</p>
                          <p className="text-sm">Add games or utilities to get started</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentCollection.items.map(item => (
                            <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                              <img
                                src={item.thumbnail || '/placeholder.svg'}
                                alt={item.title}
                                className="w-12 h-12 rounded object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white text-sm font-medium truncate">{item.title}</h4>
                                <Badge className={`text-xs ${item.type === 'game' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'}`}>
                                  {item.type}
                                </Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItemFromCollection(item.id)}
                                className="text-gray-400 hover:text-red-400"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Add Items Sidebar */}
                <div>
                  <Card className="bg-white/10 border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Add Items</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        {availableItems.slice(0, 8).map(item => (
                          <Button
                            key={item.id}
                            variant="outline"
                            size="sm"
                            onClick={() => addItemToCollection(item)}
                            disabled={currentCollection.items.some(i => i.id === item.id)}
                            className="bg-white/5 border-white/10 text-white hover:bg-white/10 text-xs"
                          >
                            <div className="flex items-center gap-1">
                              {item.type === 'game' ? <Gamepad2 className="h-3 w-3" /> : <Calculator className="h-3 w-3" />}
                              <span className="truncate">{item.title}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                        Browse All Items →
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Show collections list
  return (
    <>
      <SEO
        title="My Collections - Curated Games & Tools | Tech Tips"
        description="Create and share curated collections of your favorite games and utilities"
        canonical={canonical("/collections")}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-blue-900">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-rowdies">
                My Collections
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Create and share curated collections of your favorite games and utilities
              </p>

              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-5 w-5 mr-2" />
                    Create Collection
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-slate-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">Create New Collection</DialogTitle>
                    <DialogDescription className="text-gray-300">
                      Give your collection a title and description to help others understand what it's about.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title" className="text-white">Title</Label>
                      <Input
                        id="title"
                        value={newCollectionTitle}
                        onChange={(e) => setNewCollectionTitle(e.target.value)}
                        placeholder="My Favorite Games"
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description" className="text-white">Description</Label>
                      <Textarea
                        id="description"
                        value={newCollectionDescription}
                        onChange={(e) => setNewCollectionDescription(e.target.value)}
                        placeholder="A collection of my favorite unblocked games for school breaks..."
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={createCollection} className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        Create Collection
                      </Button>
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {collections.length === 0 ? (
              <div className="text-center py-16">
                <Bookmark className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h2 className="text-2xl font-bold text-white mb-4">No Collections Yet</h2>
                <p className="text-gray-300 mb-8 max-w-md mx-auto">
                  Create your first collection to organize and share your favorite games and utilities.
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)} size="lg">
                  <Plus className="h-5 w-5 mr-2" />
                  Create Your First Collection
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map(collection => (
                  <Card key={collection.id} className="bg-white/10 border-white/20 hover:bg-white/15 transition-colors cursor-pointer" onClick={() => navigate(`/collections/${collection.id}`)}>
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        <span className="truncate">{collection.title}</span>
                        <Bookmark className="h-5 w-5 text-purple-400" />
                      </CardTitle>
                      <CardDescription className="text-gray-300 line-clamp-2">
                        {collection.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>{collection.items.length} items</span>
                        <span>{new Date(collection.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionsPage;
