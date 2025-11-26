import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Calculator, BookOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const SafeModePage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"notes" | "calculator" | "docs">("notes");
  const [notesText, setNotesText] = useState("Meeting Notes - November 26, 2025\n\n");
  const [calcDisplay, setCalcDisplay] = useState("0");

  const exitSafeMode = () => {
    navigate("/games");
  };

  const handleCalcClick = (value: string) => {
    if (value === "C") {
      setCalcDisplay("0");
    } else if (value === "=") {
      try {
        setCalcDisplay(eval(calcDisplay).toString());
      } catch {
        setCalcDisplay("Error");
      }
    } else {
      setCalcDisplay(calcDisplay === "0" ? value : calcDisplay + value);
    }
  };

  return (
    <>
      <SEO
        title="Notes - Tech Tips"
        description="Digital notes and study tools"
        keywords="notes app, study tools, calculator, documents"
      />
      
      {/* Exit button (subtle, top-right corner) */}
      <Button
        onClick={exitSafeMode}
        variant="ghost"
        size="sm"
        className="fixed top-2 right-2 z-50 opacity-30 hover:opacity-100 transition-opacity"
        title="Exit Safe Mode"
      >
        <X size={20} />
      </Button>

      <div className="min-h-screen bg-white text-gray-900">
        {/* Simple header that looks like a study app */}
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">Study Tools</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setMode("notes")}
                className={`p-2 rounded ${mode === "notes" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
                title="Notes"
              >
                <FileText size={20} />
              </button>
              <button
                onClick={() => setMode("calculator")}
                className={`p-2 rounded ${mode === "calculator" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
                title="Calculator"
              >
                <Calculator size={20} />
              </button>
              <button
                onClick={() => setMode("docs")}
                className={`p-2 rounded ${mode === "docs" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
                title="Document"
              >
                <BookOpen size={20} />
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-6">
          {/* Notes Mode */}
          {mode === "notes" && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Notes</h2>
                <span className="text-sm text-gray-500">Last edited: Nov 26, 2025</span>
              </div>
              <textarea
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                className="w-full h-[calc(100vh-200px)] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
                placeholder="Start typing your notes..."
              />
            </div>
          )}

          {/* Calculator Mode */}
          {mode === "calculator" && (
            <div className="flex justify-center items-start pt-8">
              <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 w-80">
                <h2 className="text-xl font-semibold mb-4 text-center">Calculator</h2>
                <div className="bg-white border-2 border-gray-300 rounded p-4 mb-4 text-right text-2xl font-mono h-16 flex items-center justify-end overflow-hidden">
                  {calcDisplay}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "C", "0", "=", "+"].map((btn) => (
                    <button
                      key={btn}
                      onClick={() => handleCalcClick(btn)}
                      className={`p-4 rounded font-semibold ${
                        btn === "=" 
                          ? "bg-blue-500 text-white hover:bg-blue-600" 
                          : btn === "C"
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-white border border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Document Viewer Mode */}
          {mode === "docs" && (
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-2">Study Guide - Mathematics</h2>
                <p className="text-sm text-gray-500">Chapter 5: Algebra Fundamentals</p>
              </div>
              <div className="bg-white border border-gray-300 rounded-lg p-8 prose max-w-none">
                <h3 className="text-xl font-semibold mb-3">Linear Equations</h3>
                <p className="mb-4 text-gray-700">
                  A linear equation is an equation that makes a straight line when it is graphed. 
                  The general form is: <strong>y = mx + b</strong>
                </p>
                
                <h4 className="text-lg font-semibold mb-2 mt-6">Key Concepts:</h4>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li><strong>Slope (m):</strong> The rate of change of the line</li>
                  <li><strong>Y-intercept (b):</strong> Where the line crosses the y-axis</li>
                  <li><strong>X-intercept:</strong> Where the line crosses the x-axis</li>
                </ul>

                <h4 className="text-lg font-semibold mb-2 mt-6">Example Problems:</h4>
                <div className="bg-gray-50 p-4 rounded border border-gray-200 mb-4">
                  <p className="mb-2"><strong>Problem 1:</strong> Find the slope of the line passing through (2, 3) and (4, 7)</p>
                  <p className="text-gray-700">Solution: m = (y₂ - y₁) / (x₂ - x₁) = (7 - 3) / (4 - 2) = 4 / 2 = 2</p>
                </div>

                <h4 className="text-lg font-semibold mb-2 mt-6">Practice Exercises:</h4>
                <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                  <li>Graph the equation y = 2x + 3</li>
                  <li>Find the slope of y = -3x + 5</li>
                  <li>Solve for x: 2x + 7 = 15</li>
                </ol>
              </div>
            </div>
          )}
        </main>

        {/* Footer that looks legitimate */}
        <footer className="border-t border-gray-200 mt-12 py-4 text-center text-sm text-gray-500">
          <p>Study Tools © 2025 • Educational Resources</p>
        </footer>
      </div>
    </>
  );
};

export default SafeModePage;
