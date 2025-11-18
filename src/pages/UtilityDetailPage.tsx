import { useState, useEffect } from "react";
import { useUserPrefs } from "@/contexts/UserPrefsContext";
import { useParams, useNavigate } from "react-router-dom";
import {
  Share2,
  Heart,
  ChevronLeft,
  ExternalLink,
  Tag,
  Calculator,
  FileText,
  Image,
  Clock,
  Zap,
  Copy,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import utilitiesData from "@/data/utilities.json";
import { ShareButton } from "@/components/ShareButton";
import { SEO } from "@/components/SEO";
import { canonical } from "@/lib/paths";

interface UtilityDetailPageProps {}

const UtilityDetailPage: React.FC<UtilityDetailPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { prefs, toggleFavorite, pushHistory } = useUserPrefs();
  const [utility, setUtility] = useState<typeof utilitiesData[0] | null>(null);

  useEffect(() => {
    if (!id) return;

    // Find the utility by id
    const foundUtility = utilitiesData.find(u => u.id === id);
    if (foundUtility) {
      setUtility(foundUtility);
      // Record utility view in history
      pushHistory(foundUtility.id, 'utility');
    }
  }, [id, pushHistory]);

  const isFavorite = utility ? prefs.favorites.includes(utility.id) : false;

  const toggleFav = () => {
    if (!utility) return;
    toggleFavorite(utility.id);
  };

  const handleUse = () => {
    if (!utility) return;
    // All utilities now use plain paths (HashRouter adds # automatically)
    navigate(utility.url);
  };

  if (!utility) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Utility Not Found</CardTitle>
            <CardDescription className="text-gray-300">
              The utility you're looking for doesn't exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/utilities')} className="w-full">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Utilities
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const share = async () => {
    const url = canonical(`/utilities/${utility.id}`);
    if (navigator.share) await navigator.share({ title: utility.title, url });
    else { await navigator.clipboard.writeText(url); alert("Link copied"); }
  };

  const getInputIcon = (inputType: string) => {
    switch (inputType) {
      case 'file': return <FileText className="h-4 w-4" />;
      case 'number': return <Calculator className="h-4 w-4" />;
      case 'text': return <FileText className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const getOutputIcon = (outputType: string) => {
    switch (outputType) {
      case 'file': return <Download className="h-4 w-4" />;
      case 'image': return <Image className="h-4 w-4" />;
      case 'text': return <Copy className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  return (
    <>
      <SEO
        title={`${utility.title} — Tech Tips`}
        description={utility.description}
        canonical={canonical(`/utilities/${utility.id}`)}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-black/20" />
          <div className="h-48 bg-gradient-to-r from-blue-900 to-purple-900 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute top-4 left-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/utilities')}
                className="bg-black/20 border-white/20 text-white hover:bg-black/40"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Utilities
              </Button>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Badge className="mb-2 bg-purple-500/20 text-purple-300 border-purple-400">
                    {utility.category}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-rowdies">
                    {utility.title}
                  </h1>
                  <p className="text-gray-300 text-sm md:text-base line-clamp-2">
                    {utility.description}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleFav}
                    className={`bg-white/10 border-white/20 ${isFavorite ? 'text-red-400' : 'text-white'} hover:bg-white/20`}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline" size="sm" onClick={share} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={handleUse}
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    Use Tool
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Utility Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-white/10 border-white/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-lg flex items-center">
                        <Tag className="h-5 w-5 mr-2 text-purple-400" />
                        Tags
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {utility.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-purple-500/20 text-purple-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-white/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-lg flex items-center">
                        <Calculator className="h-5 w-5 mr-2 text-green-400" />
                        I/O Types
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Input:</span>
                        <div className="flex items-center gap-2">
                          {getInputIcon(utility.inputType)}
                          <Badge className="bg-blue-500/20 text-blue-300 capitalize">{utility.inputType}</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Output:</span>
                        <div className="flex items-center gap-2">
                          {getOutputIcon(utility.outputType)}
                          <Badge className="bg-green-500/20 text-green-300 capitalize">{utility.outputType}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Features */}
                {utility.features && utility.features.length > 0 && (
                  <Card className="bg-white/10 border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {utility.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-gray-300">
                            <span className="text-green-400 mr-2 mt-1">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Limitations */}
                {utility.limitations && (
                  <Card className="bg-white/10 border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Limitations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{utility.limitations}</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button onClick={handleUse} className="w-full bg-purple-600 hover:bg-purple-700">
                      <Zap className="h-4 w-4 mr-2" />
                      Use Utility
                    </Button>
                    <Button variant="outline" onClick={() => window.open(canonical(`/utilities/${utility.id}`), '_blank')} className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in New Tab
                    </Button>
                    <Button variant="outline" onClick={toggleFav} className="w-full">
                      <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current text-red-400' : ''}`} />
                      {isFavorite ? 'Remove from' : 'Add to'} Favorites
                    </Button>
                  </CardContent>
                </Card>

                {/* Utility Stats */}
                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Tool Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Category:</span>
                      <Badge className="bg-purple-500/20 text-purple-300 capitalize">{utility.category}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Input Type:</span>
                      <Badge className="bg-blue-500/20 text-blue-300 capitalize">{utility.inputType}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Output Type:</span>
                      <Badge className="bg-green-500/20 text-green-300 capitalize">{utility.outputType}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Client-side:</span>
                      <Badge className="bg-green-500/20 text-green-300">✓ No Uploads</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Usage Tips */}
                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Usage Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>All processing happens in your browser - no data leaves your device</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Copy className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Use the copy button to easily transfer results to other applications</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Download className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>Download buttons are available for file outputs like images or PDFs</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UtilityDetailPage;
