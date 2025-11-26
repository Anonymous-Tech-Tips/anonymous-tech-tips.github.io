import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Check, Copy, Search, FileCode, Globe, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SEOSetupPage = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const siteUrl = "https://subset28.github.io/Anonymous-Tech-Tips";
  const sitemapUrl = `${siteUrl}/sitemap.xml`;
  const robotsUrl = `${siteUrl}/robots.txt`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedItem(label);
      toast.success(`${label} copied!`);
      setTimeout(() => setCopiedItem(null), 2000);
    });
  };

  const generateMetaTag = () => {
    if (!verificationCode.trim()) {
      toast.error("Please enter your Google verification code");
      return "";
    }
    return `<meta name="google-site-verification" content="${verificationCode}" />`;
  };

  return (
    <>
      <SEO
        title="SEO Setup Guide - Tech Tips"
        description="Complete guide to setting up Google Search Console and improving search engine visibility for Tech Tips"
        keywords="seo setup, google search console, github pages seo, search engine optimization"
      />
      <div className="min-h-screen bg-gamer-bg">
        <Navbar />

        <main className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Search className="text-gamer-accent" size={40} />
              <h1 className="text-4xl font-rowdies font-bold text-gamer-text">
                SEO Setup Guide
              </h1>
            </div>
            <p className="text-gamer-muted text-lg">
              Get Tech Tips indexed on Google and boost your search rankings
            </p>
          </div>

          <Tabs defaultValue="search-console" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gamer-card mb-8">
              <TabsTrigger value="search-console">Search Console</TabsTrigger>
              <TabsTrigger value="technical">Technical SEO</TabsTrigger>
              <TabsTrigger value="checklist">Checklist</TabsTrigger>
            </TabsList>

            {/* Google Search Console Tab */}
            <TabsContent value="search-console" className="space-y-6">
              <Card className="bg-gamer-card border-gamer-border">
                <CardHeader>
                  <CardTitle className="text-gamer-text flex items-center gap-2">
                    <Globe size={20} />
                    Step 1: Create Google Search Console Account
                  </CardTitle>
                  <CardDescription className="text-gamer-muted">
                    Register your site with Google to appear in search results
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="list-decimal list-inside space-y-3 text-gamer-text">
                    <li>
                      Go to{" "}
                      <a
                        href="https://search.google.com/search-console/welcome"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gamer-accent hover:underline"
                      >
                        Google Search Console
                      </a>
                    </li>
                    <li>Click "Start now" and sign in with your Google account</li>
                    <li>Choose "URL prefix" property type</li>
                    <li>
                      Enter your site URL:{" "}
                      <code className="bg-gamer-bg px-2 py-1 rounded text-sm">{siteUrl}</code>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card className="bg-gamer-card border-gamer-border">
                <CardHeader>
                  <CardTitle className="text-gamer-text flex items-center gap-2">
                    <FileCode size={20} />
                    Step 2: Verify Ownership (Meta Tag Method)
                  </CardTitle>
                  <CardDescription className="text-gamer-muted">
                    Easiest method for GitHub Pages - no file uploads needed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-gamer-text mb-3">
                      1. In Search Console, select "HTML tag" verification method
                    </p>
                    <p className="text-gamer-text mb-3">
                      2. Copy your verification code (it looks like a long random string)
                    </p>
                    <p className="text-gamer-text mb-4">
                      3. Paste your verification code here:
                    </p>
                    <Input
                      type="text"
                      placeholder="Paste your google-site-verification code here..."
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="bg-gamer-bg border-gamer-border text-gamer-text mb-3"
                    />
                    {verificationCode && (
                      <div className="bg-gamer-bg border border-gamer-border rounded p-3 mb-3">
                        <p className="text-xs text-gamer-muted mb-2">Your meta tag:</p>
                        <code className="text-xs text-gamer-text break-all">
                          {generateMetaTag()}
                        </code>
                      </div>
                    )}
                    <p className="text-gamer-text mb-3">
                      4. Add this meta tag to <code className="bg-gamer-bg px-2 py-1 rounded text-sm">index.html</code> in the{" "}
                      <code className="bg-gamer-bg px-2 py-1 rounded text-sm">&lt;head&gt;</code> section
                    </p>
                    <p className="text-gamer-text mb-3">
                      5. Deploy your changes to GitHub Pages
                    </p>
                    <p className="text-gamer-text">
                      6. Wait 1-2 minutes, then click "Verify" in Search Console
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gamer-card border-gamer-border">
                <CardHeader>
                  <CardTitle className="text-gamer-text flex items-center gap-2">
                    <TrendingUp size={20} />
                    Step 3: Submit Your Sitemap
                  </CardTitle>
                  <CardDescription className="text-gamer-muted">
                    Help Google discover all your pages faster
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="list-decimal list-inside space-y-3 text-gamer-text">
                    <li>After verification, go to "Sitemaps" in the left sidebar</li>
                    <li>Enter your sitemap URL in the "Add a new sitemap" field:</li>
                  </ol>
                  <div className="flex gap-2 items-center">
                    <Input
                      type="text"
                      value={sitemapUrl}
                      readOnly
                      className="bg-gamer-bg border-gamer-border text-gamer-text"
                    />
                    <Button
                      onClick={() => copyToClipboard(sitemapUrl, "Sitemap URL")}
                      variant="default"
                      size="sm"
                    >
                      {copiedItem === "Sitemap URL" ? <Check size={16} /> : <Copy size={16} />}
                    </Button>
                  </div>
                  <ol start={3} className="list-decimal list-inside space-y-3 text-gamer-text">
                    <li>Click "Submit"</li>
                    <li>
                      Wait 24-48 hours for Google to crawl your site
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card className="bg-gamer-card border-gamer-border">
                <CardHeader>
                  <CardTitle className="text-gamer-text">
                    Step 4: Request Indexing (Optional but Faster)
                  </CardTitle>
                  <CardDescription className="text-gamer-muted">
                    Speed up the indexing process for important pages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="list-decimal list-inside space-y-3 text-gamer-text">
                    <li>In Search Console, go to "URL Inspection" tool</li>
                    <li>
                      Enter specific URLs you want indexed (homepage, popular games, etc.)
                    </li>
                    <li>Click "Request Indexing" for each URL</li>
                    <li>
                      Google typically indexes within 1-7 days
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Technical SEO Tab */}
            <TabsContent value="technical" className="space-y-6">
              <Card className="bg-gamer-card border-gamer-border">
                <CardHeader>
                  <CardTitle className="text-gamer-text">✅ Already Implemented</CardTitle>
                  <CardDescription className="text-gamer-muted">
                    Your site already has these SEO best practices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gamer-text">
                    <li className="flex items-start gap-2">
                      <Check className="text-green-500 mt-1 flex-shrink-0" size={18} />
                      <span>
                        <strong>Structured Data (JSON-LD)</strong>: VideoGame schema for all game
                        pages with proper metadata
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="text-green-500 mt-1 flex-shrink-0" size={18} />
                      <span>
                        <strong>Sitemap.xml</strong>: Auto-generated sitemap with 145+ game URLs
                        and all main pages
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="text-green-500 mt-1 flex-shrink-0" size={18} />
                      <span>
                        <strong>Robots.txt</strong>: Properly configured to allow crawling
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="text-green-500 mt-1 flex-shrink-0" size={18} />
                      <span>
                        <strong>Meta Tags</strong>: Title, description, keywords, and Open Graph
                        tags on every page
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="text-green-500 mt-1 flex-shrink-0" size={18} />
                      <span>
                        <strong>Canonical URLs</strong>: Proper canonical links to prevent
                        duplicate content issues
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="text-green-500 mt-1 flex-shrink-0" size={18} />
                      <span>
                        <strong>Descriptive URLs</strong>: Clean, keyword-rich URLs like
                        /games/slope
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="text-green-500 mt-1 flex-shrink-0" size={18} />
                      <span>
                        <strong>Mobile Responsive</strong>: Fully responsive design for all
                        devices
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gamer-card border-gamer-border">
                <CardHeader>
                  <CardTitle className="text-gamer-text">Site Resources</CardTitle>
                  <CardDescription className="text-gamer-muted">
                    Important URLs for search engines
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gamer-muted mb-2">Sitemap:</p>
                    <div className="flex gap-2">
                      <a
                        href={sitemapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-2 bg-gamer-bg border border-gamer-border rounded text-gamer-text text-sm hover:border-gamer-accent transition-colors"
                      >
                        {sitemapUrl}
                      </a>
                      <Button
                        onClick={() => copyToClipboard(sitemapUrl, "Sitemap")}
                        variant="default"
                        size="sm"
                      >
                        {copiedItem === "Sitemap" ? <Check size={16} /> : <Copy size={16} />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gamer-muted mb-2">Robots.txt:</p>
                    <div className="flex gap-2">
                      <a
                        href={robotsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-2 bg-gamer-bg border border-gamer-border rounded text-gamer-text text-sm hover:border-gamer-accent transition-colors"
                      >
                        {robotsUrl}
                      </a>
                      <Button
                        onClick={() => copyToClipboard(robotsUrl, "Robots.txt")}
                        variant="default"
                        size="sm"
                      >
                        {copiedItem === "Robots.txt" ? <Check size={16} /> : <Copy size={16} />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Checklist Tab */}
            <TabsContent value="checklist" className="space-y-6">
              <Card className="bg-gamer-card border-gamer-border">
                <CardHeader>
                  <CardTitle className="text-gamer-text">SEO Setup Checklist</CardTitle>
                  <CardDescription className="text-gamer-muted">
                    Follow this checklist to get fully indexed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded border-2 border-gamer-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-gamer-accent text-xs font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gamer-text mb-1">
                          Create Google Search Console Account
                        </h3>
                        <p className="text-sm text-gamer-muted">
                          Sign up at search.google.com/search-console
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded border-2 border-gamer-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-gamer-accent text-xs font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gamer-text mb-1">
                          Add Your Site as URL Prefix Property
                        </h3>
                        <p className="text-sm text-gamer-muted">
                          Use the full URL: {siteUrl}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded border-2 border-gamer-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-gamer-accent text-xs font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gamer-text mb-1">
                          Verify with HTML Meta Tag
                        </h3>
                        <p className="text-sm text-gamer-muted">
                          Add verification meta tag to index.html and deploy
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded border-2 border-gamer-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-gamer-accent text-xs font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gamer-text mb-1">Submit Sitemap</h3>
                        <p className="text-sm text-gamer-muted">
                          Add {sitemapUrl} in the Sitemaps section
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded border-2 border-gamer-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-gamer-accent text-xs font-bold">5</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gamer-text mb-1">
                          Request Indexing for Key Pages
                        </h3>
                        <p className="text-sm text-gamer-muted">
                          Use URL Inspection to request indexing of homepage and popular games
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded border-2 border-gamer-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-gamer-accent text-xs font-bold">6</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gamer-text mb-1">
                          Share Your Site Naturally
                        </h3>
                        <p className="text-sm text-gamer-muted">
                          Use the Share Hub to spread your link on Discord, Reddit, and with
                          friends
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded border-2 border-gamer-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-gamer-accent text-xs font-bold">7</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gamer-text mb-1">Wait and Monitor</h3>
                        <p className="text-sm text-gamer-muted">
                          Check Search Console after 3-7 days to see indexing progress
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gamer-card border-gamer-border">
                <CardHeader>
                  <CardTitle className="text-gamer-text">Expected Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gamer-text text-sm">
                    <li>• <strong>Verification:</strong> Instant (once meta tag is deployed)</li>
                    <li>• <strong>Sitemap Processing:</strong> 1-3 days</li>
                    <li>• <strong>First Pages Indexed:</strong> 3-7 days</li>
                    <li>• <strong>Full Site Indexed:</strong> 1-4 weeks</li>
                    <li>• <strong>Ranking Improvements:</strong> 1-3 months</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SEOSetupPage;
