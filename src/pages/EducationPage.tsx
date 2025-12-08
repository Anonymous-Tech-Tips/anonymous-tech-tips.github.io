import React from "react";
import { GraduationCap, BookOpen, Code, Calculator, Globe, Film, FlaskConical, Languages, Gamepad2, Brain } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ShareBanner } from "@/components/ShareBanner";
import { ContentSection } from "@/components/ContentSection";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { TopBannerAd, BottomAd, InContentAd } from "@/components/GoogleAd";
import { useAuth } from "@/contexts/AuthContext";

const EducationPage = () => {
  const { isAuthenticated } = useAuth();

  // Learning Platforms
  const learningPlatforms: Array<{ text: string; url?: string }> = [
    { text: "📚 Khan Academy - Free Courses", url: "https://www.khanacademy.org/" },
    { text: "🎓 Coursera - University Courses", url: "https://www.coursera.org/" },
    { text: "💡 Brilliant - Math & Science", url: "https://brilliant.org/" },
    { text: "🧪 PhET - Science Simulations", url: "https://phet.colorado.edu/" },
    { text: "🎯 edX - University Courses", url: "https://www.edx.org/" },
    { text: "📖 MIT OpenCourseWare", url: "https://ocw.mit.edu/" },
    { text: "🔬 Class Central - Course Search", url: "https://www.classcentral.com/" },
    { text: "📕 OpenLearn - Free Courses", url: "https://www.open.edu/openlearn/" },
    { text: "🎓 Alison - Free Certificates", url: "https://alison.com/" },
    { text: "💻 freeCodeCamp - Learn to Code", url: "https://www.freecodecamp.org/" },
  ];

  // Study Tools
  const studyTools: Array<{ text: string; url?: string }> = [
    { text: "🧮 Desmos Graphing Calculator", url: "https://www.desmos.com/calculator" },
    { text: "📊 Wolfram Alpha", url: "https://www.wolframalpha.com/" },
    { text: "🧮 Course Grade Calculator", url: "https://www.desmos.com/calculator/wrmalnmnpj" },
    { text: "📝 Grammarly - Writing Help", url: "https://www.grammarly.com/" },
    { text: "🎓 Quizlet - Flashcards", url: "https://quizlet.com/" },
    { text: "🧠 Anki - Spaced Repetition", url: "https://apps.ankiweb.net/" },
    { text: "📋 Notion - Notes & Organization", url: "https://www.notion.so/" },
    { text: "⏱️ Pomodoro Timer", url: "https://pomofocus.io/" },
    { text: "📚 Zotero - Citation Manager", url: "https://www.zotero.org/" },
  ];

  // Research & Reading
  const researchReading: Array<{ text: string; url?: string }> = [
    { text: "🔍 Google Scholar", url: "https://scholar.google.com/" },
    { text: "📖 SparkNotes - Study Guides", url: "https://www.sparknotes.com/" },
    { text: "📚 LibGen - Free Textbooks", url: "https://libgen.is/" },
    { text: "🎬 Internet Archive", url: "https://archive.org/" },
    { text: "📰 Wikipedia", url: "https://www.wikipedia.org/" },
    { text: "📕 LitCharts - Literature Guides", url: "https://www.litcharts.com/" },
    { text: "🔬 JSTOR - Academic Journals", url: "https://www.jstor.org/" },
    { text: "📖 Project Gutenberg - Free Books", url: "https://www.gutenberg.org/" },
    { text: "🧪 PubMed - Medical Research", url: "https://pubmed.ncbi.nlm.nih.gov/" },
  ];

  // Documentaries
  const documentaries: Array<{ text: string; url?: string }> = [
    { text: "📺 Documentary Heaven", url: "https://documentaryheaven.com/" },
    { text: "🎬 Top Documentary Films", url: "https://topdocumentaryfilms.com/" },
    { text: "🌍 ARTE Documentaries", url: "https://www.arte.tv/en/" },
    { text: "🎥 PBS Documentaries", url: "https://www.pbs.org/shows/" },
    { text: "🌿 Nat Geo", url: "https://www.nationalgeographic.com/" },
    { text: "📚 TED Talks", url: "https://www.ted.com/" },
    { text: "🎞️ Crash Course (YouTube)", url: "https://www.youtube.com/@crashcourse" },
  ];

  // Science & Math
  const scienceMath: Array<{ text: string; url?: string }> = [
    { text: "🔢 Mathway - Problem Solver", url: "https://www.mathway.com/" },
    { text: "📐 GeoGebra - Math Tools", url: "https://www.geogebra.org/" },
    { text: "🧮 Symbolab - Step-by-Step", url: "https://www.symbolab.com/" },
    { text: "🔬 Labster - Virtual Labs", url: "https://www.labster.com/" },
    { text: "⚛️ Physics Classroom", url: "https://www.physicsclassroom.com/" },
    { text: "🧪 ChemLibreTexts", url: "https://chem.libretexts.org/" },
    { text: "📊 3Blue1Brown (YouTube)", url: "https://www.youtube.com/@3blue1brown" },
    { text: "🧬 Biology Online", url: "https://www.biologyonline.com/" },
    { text: "🌌 NASA Education", url: "https://www.nasa.gov/learning-resources/" },
  ];

  // Coding & Tech
  const codingTech: Array<{ text: string; url?: string }> = [
    { text: "💻 Codecademy - Learn to Code", url: "https://www.codecademy.com/" },
    { text: "🐙 GitHub - Code Hosting", url: "https://github.com/" },
    { text: "📋 W3Schools - Web Dev", url: "https://www.w3schools.com/" },
    { text: "🎮 Scratch - Visual Coding", url: "https://scratch.mit.edu/" },
    { text: "🐍 Replit - Online IDE", url: "https://replit.com/" },
    { text: "🎯 The Odin Project", url: "https://www.theodinproject.com/" },
    { text: "🚀 LeetCode - Coding Practice", url: "https://leetcode.com/" },
    { text: "📚 MDN Web Docs", url: "https://developer.mozilla.org/" },
    { text: "🎓 CS50 - Harvard CS Course", url: "https://cs50.harvard.edu/" },
    { text: "🔧 HackerRank - Challenges", url: "https://www.hackerrank.com/" },
  ];

  // Languages
  const languages: Array<{ text: string; url?: string }> = [
    { text: "🌍 Duolingo - Languages", url: "https://www.duolingo.com/" },
    { text: "🗣️ Busuu - Language Learning", url: "https://www.busuu.com/" },
    { text: "📖 LingoDeer - Asian Languages", url: "https://www.lingodeer.com/" },
    { text: "🎧 Pimsleur - Audio Lessons", url: "https://www.pimsleur.com/" },
    { text: "💬 Tandem - Language Exchange", url: "https://www.tandem.net/" },
    { text: "📚 Clozemaster - Context Learning", url: "https://www.clozemaster.com/" },
    { text: "🎵 LyricsTraining - Learn via Music", url: "https://lyricstraining.com/" },
  ];

  // Interactive Learning
  const interactiveLearning: Array<{ text: string; url?: string }> = [
    { text: "🎮 Kahoot - Learning Games", url: "https://kahoot.com/" },
    { text: "🧩 Seterra - Geography Quizzes", url: "https://www.seterra.com/" },
    { text: "🌍 GeoGuessr - Geography Game", url: "https://www.geoguessr.com/" },
    { text: "♟️ Chess.com - Learn Chess", url: "https://www.chess.com/learn" },
    { text: "🎹 Simply Piano - Learn Piano", url: "https://www.joytunes.com/simply-piano" },
    { text: "⌨️ TypingClub - Learn Typing", url: "https://www.typingclub.com/" },
    { text: "🧠 Lumosity - Brain Training", url: "https://www.lumosity.com/" },
    { text: "🔤 Vocabulary.com - Words", url: "https://www.vocabulary.com/" },
  ];

  return (
    <>
      <SEO 
        title="Education Resources & Study Tools | Tech Tips"
        description="Free educational resources including grade calculator, programming tutorials, math resources, study techniques, and learning guides for students."
        keywords="education resources, grade calculator, study tools, programming tutorials, math resources, study techniques, learning guides, student resources, online learning"
      />
      <div className={`min-h-screen ${isAuthenticated ? "bg-gamer-bg" : "bg-background"}`}>
        <ShareBanner />
        <Navbar />

        <TopBannerAd />

        {/* Learning Platforms */}
        <ContentSection
          id="learning"
          icon={GraduationCap}
          title="📚 Learning Platforms"
          description="Free courses and interactive learning"
          items={learningPlatforms}
        />

        <InContentAd />

        {/* Study Tools */}
        <ContentSection
          id="study-tools"
          icon={Calculator}
          title="🧮 Study Tools"
          description="Calculators, flashcards, and study aids"
          items={studyTools}
        />

        {/* Research & Reading */}
        <ContentSection
          id="research"
          icon={BookOpen}
          title="📖 Research & Reading"
          description="Academic resources and free textbooks"
          items={researchReading}
        />

        <InContentAd />

        {/* Science & Math */}
        <ContentSection
          id="science-math"
          icon={FlaskConical}
          title="🔬 Science & Math"
          description="Physics, chemistry, biology, and math resources"
          items={scienceMath}
        />

        {/* Coding & Tech */}
        <ContentSection
          id="coding"
          icon={Code}
          title="💻 Coding & Tech"
          description="Learn programming and development"
          items={codingTech}
        />

        <InContentAd />

        {/* Languages */}
        <ContentSection
          id="languages"
          icon={Languages}
          title="🌍 Languages"
          description="Learn new languages for free"
          items={languages}
        />

        {/* Documentaries */}
        <ContentSection
          id="documentaries"
          icon={Film}
          title="🎬 Documentaries & Lectures"
          description="Educational videos and documentaries"
          items={documentaries}
        />

        {/* Interactive Learning */}
        <ContentSection
          id="interactive"
          icon={Gamepad2}
          title="🎮 Interactive Learning"
          description="Learn through games and quizzes"
          items={interactiveLearning}
        />

        <BottomAd />

        <Footer />
      </div>
    </>
  );
};

export default EducationPage;
