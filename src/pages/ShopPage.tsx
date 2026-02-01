import React, { useState } from 'react';
import { useProgression } from '@/contexts/ProgressionContext';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { SEO } from '@/components/SEO';
import { TopBannerAd, BottomAd } from '@/components/GoogleAd';
import { SHOP_ITEMS, CATEGORY_INFO, ShopItem } from '@/data/shopItems';
import { canPurchaseAdSkip } from '@/lib/featureFlags';
import { Sparkles, Lock, Check, Info, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useUserPrefs } from '@/contexts/UserPrefsContext';

const ShopPage: React.FC = () => {
  const { progress, spendPoints, getCurrentRank, getNextRank, purchases, purchaseItem } = useProgression();
  const { prefs, setSetting } = useUserPrefs();
  const [selectedCategory, setSelectedCategory] = useState<string>('visual');
  const [previewItem, setPreviewItem] = useState<ShopItem | null>(null);

  const currentRank = getCurrentRank();
  const nextRank = getNextRank();
  const activeTheme = prefs.settings.activeTheme || null;

  const handlePurchase = (item: ShopItem) => {
    if (purchases.includes(item.id)) {
      toast.info('You already own this item!');
      return;
    }

    // Ad-skip items are now fully functional client-side
    // Proceed to purchase logic


    if (progress.totalPoints >= item.cost) {
      if (purchaseItem(item.id, item.cost)) {

        toast.success(`🎉 Purchased ${item.name}!`, {
          description: item.category === 'visual'
            ? 'Toggle the switch to enable it!'
            : 'Check your profile to use it!',
          duration: 4000,
        });
      }
    } else {
      const needed = item.cost - progress.totalPoints;
      toast.error('Not enough points!', {
        description: `You need ${needed} more points.`,
        duration: 3000,
      });
    }
  };

  const toggleTheme = (themeId: string) => {
    if (activeTheme === themeId) {
      setSetting('activeTheme', null);
      toast.success('Theme disabled');
    } else {
      setSetting('activeTheme', themeId);
      toast.success('Theme enabled!');
    }
  };

  const getCategoryItems = (category: string) => {
    const items = SHOP_ITEMS.filter(item => item.category === category);
    return items;
  };

  const getTierColor = (tier: ShopItem['tier']) => {
    switch (tier) {
      case 'starter': return 'bg-slate-500';
      case 'medium': return 'bg-blue-500';
      case 'advanced': return 'bg-purple-500';
      case 'ultimate': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  const getTierLabel = (tier: ShopItem['tier']) => {
    return tier.charAt(0).toUpperCase() + tier.slice(1);
  };

  return (
    <>
      <SEO
        title="Shop | Tech Tips"
        description="Unlock themes, features, and upgrades with your points"
      />
      <div className="min-h-screen bg-gamer-bg">
        <TopBannerAd />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header with Stats */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-rowdies text-gamer-text mb-4">
              🛒 Points Shop
            </h1>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-gamer-card border-gamer-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gamer-muted mb-1">Your Points</p>
                      <p className="text-3xl font-bold text-gamer-accent flex items-center gap-2">
                        <span>🪙</span>
                        {progress.totalPoints}
                      </p>
                    </div>
                    <Sparkles className="h-8 w-8 text-amber-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gamer-card border-gamer-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gamer-muted mb-1">Current Rank</p>
                      <p className="text-2xl font-bold text-gamer-text flex items-center gap-2">
                        <span>{currentRank.icon}</span>
                        {currentRank.name}
                      </p>
                    </div>
                    {nextRank && (
                      <div className="text-right text-xs text-gamer-muted">
                        <p>Next: {nextRank.icon} {nextRank.name}</p>
                        <p>{nextRank.minPoints - progress.totalPoints} pts away</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gamer-card border-gamer-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gamer-muted mb-1">Items Owned</p>
                      <p className="text-3xl font-bold text-gamer-text">
                        {purchases.length}
                      </p>
                    </div>
                    <Check className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <p className="text-gamer-muted text-center">
              Earn points by playing games, maintaining streaks, and exploring the site!
            </p>
          </div>

          {/* Category Tabs */}
          <Tabs defaultValue="visual" className="w-full" onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-5 w-full max-w-3xl mx-auto mb-8 bg-gamer-card">
              {Object.entries(CATEGORY_INFO).map(([key, info]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-gamer-accent data-[state=active]:text-gamer-card"
                >
                  <span className="mr-1">{info.icon}</span>
                  <span className="hidden sm:inline">{info.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.keys(CATEGORY_INFO).map(category => (
              <TabsContent key={category} value={category}>
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-gamer-text mb-2">
                    {CATEGORY_INFO[category as keyof typeof CATEGORY_INFO].icon}{' '}
                    {CATEGORY_INFO[category as keyof typeof CATEGORY_INFO].name}
                  </h2>
                  <p className="text-gamer-muted">
                    {CATEGORY_INFO[category as keyof typeof CATEGORY_INFO].description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getCategoryItems(category).map((item) => {
                    const owned = purchases.includes(item.id);
                    const canAfford = progress.totalPoints >= item.cost;
                    const isTheme = item.category === 'visual';
                    const isActive = isTheme && activeTheme === item.id;

                    return (
                      <motion.div
                        key={item.id}
                        whileHover={{ y: -5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Card className={`h-full flex flex-col bg-gamer-card border-2 ${owned ? 'border-green-500/50' : 'border-gamer-border'
                          } ${isActive ? 'ring-2 ring-gamer-accent' : ''}`}>
                          <CardHeader>
                            <div className="flex items-start justify-between mb-2">
                              <div className="text-4xl">{item.icon}</div>
                              <Badge className={`${getTierColor(item.tier)} text-white`}>
                                {getTierLabel(item.tier)}
                              </Badge>
                            </div>
                            <CardTitle className="text-gamer-text flex items-center gap-2">
                              {item.name}
                              {owned && <Check className="h-4 w-4 text-green-400" />}
                            </CardTitle>
                          </CardHeader>

                          <CardContent className="flex-grow">
                            <p className="text-gamer-muted text-sm mb-4">{item.description}</p>

                            {item.effects && item.effects.length > 0 && (
                              <div className="space-y-1 mb-4">
                                {item.effects.map((effect, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-xs text-gamer-muted">
                                    <span className="text-gamer-accent">✓</span>
                                    {effect}
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center justify-between mt-auto">
                              <p className="text-xl font-bold text-gamer-accent flex items-center gap-1">
                                <span>🪙</span>
                                {item.cost}
                              </p>

                              {item.preview && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-gamer-muted hover:text-gamer-text"
                                    >
                                      <Info className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="bg-gamer-card border-gamer-border">
                                    <DialogHeader>
                                      <DialogTitle className="text-gamer-text flex items-center gap-2">
                                        <span className="text-2xl">{item.icon}</span>
                                        {item.name}
                                      </DialogTitle>
                                      <DialogDescription className="text-gamer-muted">
                                        {item.preview}
                                      </DialogDescription>
                                    </DialogHeader>
                                  </DialogContent>
                                </Dialog>
                              )}
                            </div>
                          </CardContent>

                          <CardFooter className="flex flex-col gap-2">
                            {owned ? (
                              isTheme ? (
                                <div className="w-full flex items-center justify-between">
                                  <span className="text-sm text-gamer-muted">
                                    {isActive ? 'Active' : 'Enable theme'}
                                  </span>
                                  <Switch
                                    checked={isActive}
                                    onCheckedChange={() => toggleTheme(item.id)}
                                  />
                                </div>
                              ) : (
                                <div className="w-full text-center py-2">
                                  <Badge className="bg-green-500 text-white">
                                    ✓ Owned
                                  </Badge>
                                </div>
                              )
                            ) : (
                              <Button
                                onClick={() => handlePurchase(item)}
                                disabled={!canAfford}
                                className={`w-full ${canAfford
                                  ? 'bg-gamer-accent hover:bg-gamer-accent/90 text-gamer-card'
                                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                  }`}
                              >
                                {canAfford ? (
                                  <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Purchase
                                  </>
                                ) : (
                                  <>
                                    <Lock className="mr-2 h-4 w-4" />
                                    Need {item.cost - progress.totalPoints} more
                                  </>
                                )}
                              </Button>
                            )}
                          </CardFooter>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </main>

        <BottomAd />
      </div>
    </>
  );
};

export default ShopPage;
