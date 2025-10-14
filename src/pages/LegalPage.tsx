import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LegalPage = () => {
  return (
    <>
      <SEO
        title="Legal Disclaimer | Armaan's Tech Tips"
        description="Legal disclaimer and terms of use for Armaan's Tech Tips game collection and external links."
        keywords="legal disclaimer, terms of use, external links, game collection"
      />
      <div className="min-h-screen bg-gamer-bg">
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-rowdies font-bold text-gamer-text mb-8">
            Legal Disclaimer & Terms of Use
          </h1>

          <div className="space-y-6">
            <Card className="bg-gamer-card border-gamer-border">
              <CardHeader>
                <CardTitle className="text-gamer-text">External Links & Game Collection</CardTitle>
              </CardHeader>
              <CardContent className="text-gamer-text">
                <p className="mb-4">
                  This website provides a curated collection of links to browser-based games available on the internet.
                  We do not host, own, or maintain any game files ourselves.
                </p>
                <p className="mb-4">
                  <strong>Important:</strong> All games listed on this site are external links that open in new windows/tabs.
                  We are not responsible for the content, availability, or legality of these external resources.
                </p>
                <p className="mb-4">
                  Users are responsible for ensuring they have the legal right to access any content they choose to view.
                  We recommend checking local laws and regulations regarding online gaming content.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gamer-card border-gamer-border">
              <CardHeader>
                <CardTitle className="text-gamer-text">Copyright & Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="text-gamer-text">
                <p className="mb-4">
                  We respect intellectual property rights and do not claim ownership of any games or content linked from this site.
                  If you believe any content violates your copyright, please contact us immediately.
                </p>
                <p className="mb-4">
                  This site is for educational and entertainment purposes only. We do not endorse or guarantee the legality
                  of any external content linked from these pages.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gamer-card border-gamer-border">
              <CardHeader>
                <CardTitle className="text-gamer-text">User Responsibility</CardTitle>
              </CardHeader>
              <CardContent className="text-gamer-text">
                <p className="mb-4">
                  By using this website, you acknowledge that:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>You are responsible for verifying the legality of any content you access</li>
                  <li>You will respect the terms of service of external websites</li>
                  <li>You will not use this site for any illegal activities</li>
                  <li>You understand that external links may change or become unavailable</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gamer-card border-gamer-border">
              <CardHeader>
                <CardTitle className="text-gamer-text">Contact</CardTitle>
              </CardHeader>
              <CardContent className="text-gamer-text">
                <p className="mb-4">
                  If you have concerns about any content linked from this site or believe it violates your rights,
                  please contact us through the appropriate channels.
                </p>
                <p>
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default LegalPage;
