import React, { useState } from "react";
import FriendsGallery from "@/components/FriendsGallery";

export const GamerHome: React.FC = () => {
  const [hidden, setHidden] = useState(false);

  const handleHide = () => setHidden((v) => !v);
  const handleEscape = () => {
    // Panic switch: open a safe site in same tab
    window.location.assign("https://classroom.google.com/");
  };

  return (
    <main id="top" className="bg-gamer-bg">
      {/* Intro strip */}
      <section className="max-w-6xl mx-auto px-6 pt-6">
        <p className="text-gamer-text font-rowdies text-sm sm:text-base leading-relaxed text-center">
          What's up, guys! This is <span className="underline">Tech Tips</span>!
          This website is where I put <strong>Games</strong> and <strong>PC Optimizations</strong>!
          Here are some of my best friends and people who helped build this website.
        </p>
      </section>

      {/* Title */}
      <section className="max-w-6xl mx-auto px-6 py-8 sm:py-10">
        <h1 className="text-center font-rowdies text-3xl sm:text-4xl md:text-5xl text-gamer-text">
          The Tech Tips Team
        </h1>
      </section>

      {/* Friends grid (uses your /src/assets/friends images) */}
      {!hidden && <FriendsGallery />}

      {/* Buttons */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div className="flex gap-6 items-center justify-center">
          {/* Left button: HIDE */}
          <button
            onClick={handleHide}
            className="px-10 py-3 rounded-md bg-[#2b2b2b] text-gamer-text font-rowdies tracking-wide
                       border border-gamer-border hover:bg-gamer-border/40 transition"
          >
            {hidden ? "SHOW" : "HIDE"}
          </button>

          {/* Right button: ESCAPE */}
          <button
            onClick={handleEscape}
            className="px-10 py-3 rounded-md bg-[#2b2b2b] text-gamer-text font-rowdies tracking-wide
                       border border-gamer-border hover:bg-gamer-border/40 transition"
          >
            ESCAPE
          </button>
        </div>
      </section>

      {/* Big YouTube CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-8">
        <div className="w-full flex justify-center">
          <a
            href="https://www.youtube.com/@Subset4Life"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-6 sm:px-10 py-3 sm:py-4 rounded-xl
                       text-white font-rowdies text-base sm:text-lg
                       transition-transform hover:-translate-y-0.5"
            style={{
              background: "#ff2e2e",
              boxShadow: "0 10px 30px rgba(255,46,46,.35)",
            }}
          >
            <span>•</span> SUBSCRIBE ON YOUTUBE
          </a>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-6xl mx-auto px-6 pb-6">
        <p className="text-center text-gamer-text/90 font-rowdies text-sm leading-6">
          By using our site, you explicitly acknowledge and consent to the fact that Tech Tips
          assumes no responsibility or liability for any potential issues that may arise as a result of
          your use of our services. This may include: getting in trouble, the site being blocked in your
          school district, or your school policy being broken. Furthermore, it is essential to understand
          that using the platform may lead to unforeseen consequences, including academic repercussions
          or disciplinary actions from your educational institution. By utilizing our services, you
          acknowledge and accept this disclaimer, assuming full responsibility for any consequences that
          may surface as a result of using Tech Tips. Please ensure that you are familiar with
          your school's policies regarding online resources.
        </p>

        {/* TODO: Add your Google Form URL below to enable suggestions */}
        {/* 
        <div className="text-center mt-4">
          <a
            href="https://forms.gle/YOUR_GOOGLE_FORM"
            target="_blank"
            rel="noreferrer"
            className="underline text-gamer-text hover:text-gamer-accent"
          >
            Suggestions
          </a>
        </div>
        */}
      </section>
    </main>
  );
};
