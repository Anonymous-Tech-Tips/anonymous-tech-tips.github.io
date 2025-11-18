import React from "react";
import { ExternalLink, Github, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const LinksPage = () => {
  const links = [
    {
      title: "Home",
      description: "Main hub with all features",
      url: "/",
      icon: "🏠"
    },
    {
      title: "Games Hub",
      description: "Unblocked games collection",
      url: "/games",
      icon: "🎮"
    },
    {
      title: "Utilities",
      description: "Password generator, QR codes, and more",
      url: "/utilities",
      icon: "🛠️"
    },
    {
      title: "PC Optimization",
      description: "Performance guides and tips",
      url: "/optimizations",
      icon: "⚡"
    },
    {
      title: "Education",
      description: "Learning resources and guides",
      url: "/education",
      icon: "📚"
    }
  ];

  const socialLinks = [
    {
      title: "Share Site",
      url: `${window.location.origin}${window.location.pathname}?utm_source=links&utm_medium=button&utm_campaign=site`,
      icon: <Share2 className="h-4 w-4" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-rowdies">
            Tech Tips
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your ultimate student tech hub - games, utilities, and optimization tools
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {socialLinks.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                asChild
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.icon}
                  <span className="ml-2">{link.title}</span>
                  <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {links.map((link, index) => (
            <Card key={index} className="bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <span className="text-2xl mr-3">{link.icon}</span>
                  {link.title}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {link.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <a href={link.url}>
                    Visit {link.title}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="bg-white/10 border-white/20 max-w-md mx-auto">
            <CardContent className="pt-6">
              <p className="text-gray-300 mb-4">
                Open source tech resources for students
              </p>
              <p className="text-sm text-gray-400">
                © 2024 Tech Tips. All rights reserved.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LinksPage;
