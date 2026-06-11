import React from "react";
import { Link } from "react-router-dom";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <Link to="/" className="font-black text-teal-700 text-lg">StudyHub</Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-10">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-slate-500 text-sm">Last updated: June 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-800">1. Overview</h2>
          <p className="text-slate-600 leading-relaxed">
            StudyHub ("we", "us", "our") operates <strong>anonymous-tech-tips.github.io</strong>. This Privacy Policy explains how we collect, use, and protect information when you visit our site. We are committed to protecting your privacy and handling your data responsibly.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-800">2. Information We Collect</h2>
          <p className="text-slate-600 leading-relaxed">
            We collect minimal information to provide our services:
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-1">
            <li><strong>Anonymous Authentication:</strong> If you sign in, we use Firebase Anonymous Authentication. No name, email, or password is required or collected.</li>
            <li><strong>Usage Preferences:</strong> Settings such as theme preferences and game history are stored in your browser's local storage only. This data never leaves your device.</li>
            <li><strong>Log Data:</strong> Standard server logs may include your IP address, browser type, and pages visited. This is used for security and performance monitoring only.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-800">3. Cookies & Advertising</h2>
          <p className="text-slate-600 leading-relaxed">
            This site uses <strong>Google AdSense</strong> to display advertisements. Google AdSense uses cookies to serve ads based on your prior visits to this website or other websites. You may opt out of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Google Ads Settings</a>.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site. For more information, visit{" "}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Google's advertising policies</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-800">4. Third-Party Services</h2>
          <p className="text-slate-600 leading-relaxed">We use the following third-party services:</p>
          <ul className="list-disc pl-6 text-slate-600 space-y-1">
            <li><strong>Firebase (Google):</strong> Anonymous authentication and optional data sync. <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Firebase Privacy</a></li>
            <li><strong>Google AdSense:</strong> Display advertising. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Google Privacy Policy</a></li>
            <li><strong>Google Analytics:</strong> Aggregate site usage statistics (no personally identifiable information).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-800">5. Children's Privacy</h2>
          <p className="text-slate-600 leading-relaxed">
            Our site is intended for students and does not knowingly collect personal information from children under 13. We do not require registration with personal details. Anonymous authentication does not collect any identifying information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-800">6. Data Security</h2>
          <p className="text-slate-600 leading-relaxed">
            All connections to this site are encrypted via HTTPS. User preferences stored in localStorage remain on your device and are not transmitted to our servers. Firebase data is encrypted in transit and at rest.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-800">7. Your Rights</h2>
          <p className="text-slate-600 leading-relaxed">
            You may clear all locally stored preferences at any time by clearing your browser's local storage or cookies. Since we do not collect personal information, there is no personal data to request, modify, or delete from our servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-800">8. Contact</h2>
          <p className="text-slate-600 leading-relaxed">
            For privacy-related questions, contact us via our{" "}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSceaVXrWwjj0zqMqdmPJTCxPQoq166Pe72I7pKjcChU-h1mRQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:underline"
            >
              feedback form
            </a>.
          </p>
        </section>

        <div className="pt-8 border-t border-slate-200">
          <Link to="/" className="text-teal-600 hover:underline text-sm">← Back to StudyHub</Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
