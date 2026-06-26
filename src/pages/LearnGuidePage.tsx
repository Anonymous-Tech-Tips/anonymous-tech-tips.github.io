import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Clock, BarChart2, Tag, ArrowLeft, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { parseMarkdown } from "@/lib/parseMarkdown";
import guides from "@/data/guides.json";

const difficultyColor: Record<string, string> = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

const LearnGuidePage = () => {
  const { id } = useParams<{ id: string }>();
  const guide = guides.find((g) => g.id === id);

  if (!guide) return <Navigate to="/learn" replace />;

  const html = parseMarkdown(guide.content);
  const guideIndex = guides.indexOf(guide);
  const prev = guides[guideIndex - 1];
  const next = guides[guideIndex + 1];

  return (
    <>
      <SEO
        title={`${guide.title} | Anonymous Tech Tips`}
        description={guide.description}
        keywords={guide.tags.join(", ")}
      />
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/learn" className="hover:text-foreground">Guides</Link>
            <span>/</span>
            <span className="text-foreground truncate">{guide.title}</span>
          </div>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${difficultyColor[guide.difficulty] ?? difficultyColor.beginner}`}>
                {guide.difficulty}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={12} />
                {guide.estimatedTime} min read
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-3">{guide.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{guide.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {guide.tags.map((tag) => (
                <span key={tag} className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground flex items-center gap-1">
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Prerequisites */}
          {guide.prerequisites && guide.prerequisites.length > 0 && (
            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">Prerequisites</p>
              <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-0.5">
                {guide.prerequisites.map((p) => <li key={p}>• {p}</li>)}
              </ul>
            </div>
          )}

          {/* Guide content */}
          <article
            className="prose prose-neutral dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Navigation between guides */}
          <nav className="mt-12 pt-6 border-t border-border grid grid-cols-2 gap-4">
            {prev ? (
              <Link to={`/learn/${prev.id}`} className="group flex flex-col gap-1 p-4 border border-border rounded-lg hover:border-primary transition-colors">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><ArrowLeft size={12} /> Previous</span>
                <span className="text-sm font-medium group-hover:text-primary transition-colors">{prev.title}</span>
              </Link>
            ) : <div />}
            {next ? (
              <Link to={`/learn/${next.id}`} className="group flex flex-col gap-1 p-4 border border-border rounded-lg hover:border-primary transition-colors text-right ml-auto w-full">
                <span className="text-xs text-muted-foreground flex items-center gap-1 justify-end">Next <ArrowRight size={12} /></span>
                <span className="text-sm font-medium group-hover:text-primary transition-colors">{next.title}</span>
              </Link>
            ) : <div />}
          </nav>

          <div className="mt-8 p-6 bg-muted/50 rounded-xl border border-border">
            <p className="text-sm font-medium mb-1">Want more?</p>
            <p className="text-sm text-muted-foreground mb-3">
              Access 145+ browser games, utilities, and the full resource library — free account, no downloads.
            </p>
            <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              Create free account <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LearnGuidePage;
