import React from "react";
import { Link } from "react-router-dom";
import { Clock, BarChart2, ArrowRight, BookOpen } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import guides from "@/data/guides.json";

const difficultyColor: Record<string, string> = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

const LearnPage = () => {
  return (
    <>
      <SEO
        title="Free Student Learning Guides | Anonymous Tech Tips"
        description="Free in-depth guides covering PC optimization, effective study methods, gaming performance, and more. Written for students by students."
        keywords="study guides, pc optimization guide, study methods, gaming performance, student learning, free tech guides, windows optimization, spaced repetition, active recall"
      />
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <span>Guides</span>
            </div>
            <h1 className="text-4xl font-bold mb-3">Learning Guides</h1>
            <p className="text-lg text-muted-foreground">
              Free, detailed guides on PC optimization, study techniques, and tech performance. No login required.
            </p>
          </div>

          <div className="grid gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.id}
                to={`/learn/${guide.id}`}
                className="group block border border-border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all bg-card"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <BookOpen size={16} className="text-primary" />
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${difficultyColor[guide.difficulty] ?? difficultyColor.beginner}`}>
                        {guide.difficulty}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={12} />
                        {guide.estimatedTime} min read
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {guide.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {guide.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {guide.tags.slice(0, 5).map((tag) => (
                        <span key={tag} className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-muted-foreground group-hover:text-primary shrink-0 mt-1 transition-colors" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 p-6 bg-muted/50 rounded-xl border border-border">
            <h2 className="text-lg font-semibold mb-2">More resources inside</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Create a free account to access 145+ browser games, interactive utilities, and the full education resource library.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Get started free <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LearnPage;
