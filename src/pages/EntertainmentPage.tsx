import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, AlertTriangle, Tv, Film, Popcorn } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { openGameSandbox } from "@/utils/openGameSandbox";
const streamingServices = [
  {
    name: "Netflix (Google Slides)",
    url: "https://docs.google.com/presentation/d/149GpUX0v2xNpwbUTv0Ra1bXSBJ8VImN3yQXMYA9ZhKA/edit?slide=id.g3390e1e779d_159_56#slide=id.g3390e1e779d_159_56",
    icon: "🎬",
    description: "Watch your favorite shows and movies",
  },
  {
    name: "Netflix (Canva)",
    url: "https://netflix-offical.my.canva.site/",
    icon: "📺",
    description: "Alternative Netflix viewing platform",
  },
  {
    name: "Crunchyroll (Anime)",
    url: "https://docs.google.com/presentation/d/11emRJ473ihU1R5lKucb1e9xJDbHy4-myZBw3sMzBiac/edit?slide=id.g3546607dc8c_0_998#slide=id.g3546607dc8c_0_998",
    icon: "🎌",
    description: "Stream your favorite anime series",
  },
  {
    name: "Disney+",
    url: "https://docs.google.com/presentation/d/1cqMoS7rNvOX77938GusdWNi6mYVPOfETCVsAVW9I9ps/edit?slide=id.p#slide=id.p",
    icon: "🏰",
    description: "Access Disney, Marvel, and Star Wars content",
  },
  {
    name: "Paramount Plus",
    url: "https://docs.google.com/presentation/d/1CiZMdBm677M7EIus7gT89WPxwYPzXJQgwmXGv3sLAaw/edit#slide=id.g1b71f8bdb3c_2_77",
    icon: "⭐",
    description: "Stream Paramount movies and shows",
  },
  {
    name: "Roku",
    url: "https://docs.google.com/presentation/d/1OjrWHYHz5xbxhVYfWbDF4J0NdM3AYHC9x2pTchv4GuU/edit#slide=id.g26f6dcac621_1_0",
    icon: "📡",
    description: "Access Roku streaming content",
  },
  {
    name: "Tubi",
    url: "https://docs.google.com/presentation/d/1MKUZLOhfS1PyOtbz-uhfdNqewzDJIqZxBEfMeWPhJpE/edit#slide=id.g2d03a5085ad_0_68",
    icon: "🎥",
    description: "Free movies and TV shows",
  },
  {
    name: "Hulu",
    url: "https://docs.google.com/presentation/d/1YDZCGRJMcIXA6CDnnxEUcNuZuEx-NdUETeeVFulhYDg/edit",
    icon: "💚",
    description: "Stream Hulu originals and network shows",
  },
  {
    name: "YouTube",
    url: "https://docs.google.com/presentation/d/1DPscrn5ZTcUj5sbsMM1LeC1hhd2vE_kZfF9xTmY1Xgw/edit#slide=id.g25ece339069_2_71",
    icon: "▶️",
    description: "Watch YouTube videos and content",
  },
  {
    name: "Premium Streaming",
    url: "https://docs.google.com/document/d/1D9ruLVUZ9k9AmGDf52p0oTlRTnGd_zmYx2v6NoE2dbM/edit?tab=t.qdnbynrjz9av",
    icon: "🎭",
    description: "Access premium streaming content",
  },
];

const EntertainmentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gamer-bg">
      <SEO 
        title="Entertainment Hub - Stream Shows & Movies at School"
        description="Access your favorite streaming services at school. Watch Netflix, Disney+, Hulu, anime and more unblocked during breaks."
        keywords="streaming unblocked, watch tv at school, netflix unblocked, anime streaming, entertainment hub"
      />
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Tv className="h-12 w-12 text-gamer-accent" />
            <h1 className="text-5xl font-rowdies font-bold text-gamer-text">
              Entertainment Hub
            </h1>
            <Popcorn className="h-12 w-12 text-gamer-accent" />
          </div>
          <p className="text-xl text-gamer-muted max-w-3xl mx-auto">
            Watch your favorite shows and movies during breaks! 
            <span className="text-gamer-accent font-semibold"> Perfect for downtime at school</span>
          </p>
        </motion.div>

        {/* Legal Disclaimer - Collapsible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <details className="group">
            <summary className="cursor-pointer list-none">
              <div className="flex items-center gap-2 text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors">
                <AlertTriangle className="h-4 w-4" />
                <span>Legal Disclaimer (click to expand)</span>
                <span className="ml-auto group-open:rotate-180 transition-transform">▼</span>
              </div>
            </summary>
            <Alert className="mt-2 bg-amber-950/30 border-2 border-amber-600/80">
              <AlertDescription className="text-xs text-amber-100/90 leading-relaxed">
                <strong className="font-bold text-amber-50">IMPORTANT LEGAL DISCLAIMER:</strong>
                <br /><br />
                These links are provided for educational and informational purposes only. 
                We are not responsible for the content, availability, or legality of third-party services. 
                Users are responsible for complying with their school&apos;s policies and applicable copyright laws. 
                By accessing these links, you acknowledge that you use them at your own risk. 
                We do not host, distribute, or control any of the linked content and cannot be held liable for any issues arising from their use.
                Always respect content creators and consider supporting official streaming services.
              </AlertDescription>
            </Alert>
          </details>
        </motion.div>

        {/* Usage Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-gamer-card border-gamer-border">
            <CardHeader>
              <CardTitle className="text-gamer-text flex items-center gap-2">
                <Film className="h-5 w-5 text-gamer-accent" />
                Usage Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gamer-muted space-y-2">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Use during appropriate times (lunch, breaks, free periods)</li>
                <li>Always prioritize your studies and assignments</li>
                <li>Keep volume at appropriate levels or use headphones</li>
                <li>Respect your school's internet usage policies</li>
                <li>Report any broken links or issues</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Streaming Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl font-rowdies font-bold text-gamer-text mb-6 text-center">
            Available Streaming Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {streamingServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="bg-gamer-card border-gamer-border hover:border-gamer-accent transition-all duration-normal h-full cursor-pointer group"
                  onClick={() => openGameSandbox(service.url)}
                >
                  <div className="block h-full">
                    <CardHeader>
                      <CardTitle className="text-gamer-text flex items-center gap-2 group-hover:text-gamer-accent transition-colors">
                        <span className="text-3xl">{service.icon}</span>
                        <span className="flex-1">{service.name}</span>
                        <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </CardTitle>
                      <CardDescription className="text-gamer-muted">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-gamer-accent text-sm font-medium">
                        Open Stream
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Card className="bg-gamer-card/50 border-gamer-border">
            <CardContent className="py-6">
              <p className="text-gamer-muted text-sm">
                <strong className="text-gamer-text">Note:</strong> These services are maintained by third parties. 
                Links may change or become unavailable. If you encounter issues, please let us know.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default EntertainmentPage;
