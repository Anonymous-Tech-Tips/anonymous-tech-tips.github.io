import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Gamepad2, Wrench, Command, X, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CoachMarksProps {}

const ONBOARDING_KEY = 'onboarding-completed';

export const CoachMarks: React.FC<CoachMarksProps> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  const steps = [
    {
      id: 'games',
      title: '🔬 Discover Modules',
      description: 'Browse our curated collection of interactive browser modules for your study breaks.',
      target: '[data-tour="games-hub"]',
      action: () => navigate('/games'),
      buttonText: 'Explore Modules'
    },
    {
      id: 'utilities',
      title: '🛠️ Essential Tools',
      description: 'Access password generators, QR codes, color pickers, and more useful utilities.',
      target: '[data-tour="utilities"]',
      action: () => navigate('/utilities'),
      buttonText: 'Try Utilities'
    },
    {
      id: 'command-palette',
      title: '⌨️ Quick Access',
      description: 'Press Ctrl+K (or Cmd+K) anywhere to instantly search and navigate.',
      target: 'body',
      action: () => {
        // Just show the command palette
        const event = new KeyboardEvent('keydown', {
          key: 'k',
          ctrlKey: true,
          metaKey: true
        });
        document.dispatchEvent(event);
      },
      buttonText: 'Try Ctrl+K'
    }
  ];

  useEffect(() => {
    // Check if user has completed onboarding
    const completed = localStorage.getItem(ONBOARDING_KEY);
    if (completed) {
      setIsComplete(true);
      return;
    }

    // Show onboarding after a short delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      steps[currentStep + 1].action();
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    setIsComplete(true);
    localStorage.setItem(ONBOARDING_KEY, 'true');
  };

  const handleComplete = () => {
    setIsVisible(false);
    setIsComplete(true);
    localStorage.setItem(ONBOARDING_KEY, 'true');
  };

  const handleRestart = () => {
    setIsComplete(false);
    setCurrentStep(0);
    setIsVisible(true);
    localStorage.removeItem(ONBOARDING_KEY);
  };

  if (isComplete) {
    return null; // Just dismiss completely, no "Welcome aboard" message
  }

  if (!isVisible) return null;

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md bg-slate-900 border-slate-700 shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <span className="text-2xl">
                {currentStep === 0 ? '🎮' : currentStep === 1 ? '🛠️' : '⌨️'}
              </span>
              {currentStepData.title}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-1 mt-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full ${
                  index <= currentStep ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <CardDescription className="text-gray-300">
            {currentStepData.description}
          </CardDescription>

          <div className="flex gap-2">
            <Button
              onClick={handleNext}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Tour
                </>
              ) : (
                <>
                  {currentStepData.buttonText}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={handleSkip}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Skip Tour
            </Button>
          </div>

          <div className="text-xs text-gray-400 text-center">
            Step {currentStep + 1} of {steps.length}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
