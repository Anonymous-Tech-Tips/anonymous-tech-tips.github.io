import React from "react";
import { Calendar, ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock changelog data - in a real app, this would be loaded from a file or API
const changelogEntries = [
  {
    version: "2.0.0",
    date: "2025-10-13",
    title: "Major Growth & SEO Update",
    changes: [
      "🚀 Comprehensive SEO improvements for better search visibility",
      "📊 Enhanced analytics and tracking setup",
      "🎯 Improved user experience with smart navigation",
      "🔧 Bug fixes and performance optimizations",
      "📱 Better mobile responsiveness",
      "🎨 Updated visual design and animations"
    ]
  },
  {
    version: "1.9.0",
    date: "2025-09-15",
    title: "Smart Navigation & Bug Fixes",
    changes: [
      "🎮 Smart Games navigation - scrolls to games section when on homepage",
      "🔧 Fixed visitor counter display issues",
      "⚡ Improved loading performance",
      "🎯 Enhanced user experience flows"
    ]
  },
  {
    version: "1.8.0",
    date: "2025-08-20",
    title: "Authentication & Polish",
    changes: [
      "🔐 Added proper authentication system",
      "🎨 Improved visual polish and animations",
      "📱 Better mobile experience",
      "🛠️ Enhanced utility tools"
    ]
  },
  {
    version: "1.7.0",
    date: "2025-07-10",
    title: "Gaming Hub Expansion",
    changes: [
      "🎮 Added more unblocked games",
      "🏆 Implemented Popular vs All Games tabs",
      "🎯 Improved game discovery",
      "📊 Better game organization"
    ]
  },
  {
    version: "1.6.0",
    date: "2025-06-05",
    title: "Utilities Expansion",
    changes: [
      "🛠️ Added comprehensive utility tools",
      "🔒 Password generator improvements",
      "📱 QR code generator",
      "🎨 Color picker and text tools"
    ]
  },
  {
    version: "1.5.0",
    date: "2025-05-01",
    title: "PC Optimization Suite",
    changes: [
      "⚡ Complete PC optimization guides",
      "🧹 System cleanup tools",
      "🚀 Performance monitoring",
      "💡 Windows optimization tips"
    ]
  },
  {
    version: "1.0.0",
    date: "2025-01-15",
    title: "Initial Launch",
    changes: [
      "🚀 First release of Tech Tips",
      "🎮 Basic gaming hub functionality",
      "🛠️ Core utility tools",
      "📚 Educational resources"
    ]
  }
];

const UpdatesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-rowdies">
            Updates & Changelog
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Stay updated with the latest features, improvements, and bug fixes
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
              <a href="/links">
                <ExternalLink className="h-4 w-4 mr-2" />
                Link in Bio
              </a>
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {changelogEntries.map((entry, index) => (
            <Card key={index} className="bg-white/10 border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-400">
                      v{entry.version}
                    </Badge>
                    <CardTitle className="text-white text-xl">{entry.title}</CardTitle>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 mb-4">
                  What's new in this version:
                </CardDescription>
                <ul className="space-y-2">
                  {entry.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="flex items-start text-gray-200">
                      <span className="text-green-400 mr-2 mt-1">•</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Card className="bg-white/10 border-white/20 max-w-md mx-auto">
            <CardContent className="pt-6">
              <p className="text-gray-300 mb-4">
                Want to see something new? Have feedback or suggestions?
              </p>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSceaVXrWwjj0zqMqdmPJTCxPQoq166Pe72I7pKjcChU-h1mRQ/viewform" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="ml-2 h-3 w-3" />
                  Send Feedback
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UpdatesPage;
