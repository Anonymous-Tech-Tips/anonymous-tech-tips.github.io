import { Apple, Camera, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function NutriSnapPromo() {
  return (
    <Card className="w-full overflow-hidden border-0 bg-gradient-to-br from-emerald-900 via-green-900 to-slate-900 text-white shadow-xl my-8">
      <CardContent className="p-0">
        <div className="grid gap-8 md:grid-cols-2 p-6 md:p-8 items-center">
          
          {/* Text Section */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="h-4 w-4" />
              <span>Eat confidently anywhere</span>
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              NutriSnap AI
            </h2>
            
            <p className="text-slate-300 text-lg leading-relaxed max-w-md">
              Choose safer, healthier meals with a single photo. Instantly analyze menus and nutrition labels for allergy warnings and macro tracking.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button 
                size="lg" 
                className="bg-white text-emerald-900 hover:bg-slate-100 font-bold gap-2"
                onClick={() => window.open("https://apps.apple.com/us/app/nutrisnap-ai-food-analyzer/id123456789", "_blank")}
              >
                <Apple className="h-5 w-5" />
                Download on iOS
              </Button>
              {/* Optional: Remove this button if iOS only */}
              <Button 
                variant="outline" 
                size="lg" 
                className="border-emerald-500/50 text-emerald-100 hover:bg-emerald-900/50 hover:text-white gap-2"
              >
                <Camera className="h-5 w-5" />
                Learn More
              </Button>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-400 pt-2">
              <div className="flex items-center gap-1">
                <Camera className="h-4 w-4 text-emerald-400" />
                <span>Instant Scan</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-600" />
              <div>Privacy First</div>
              <div className="w-1 h-1 rounded-full bg-slate-600" />
              <div>Works Offline</div>
            </div>
          </div>

          {/* Visual/Phone Section */}
          <div className="relative hidden md:flex items-center justify-center p-4">
            {/* Abstract Phone Mockup */}
            <div className="relative z-10 w-64 rounded-[2.5rem] border-[8px] border-slate-800 bg-slate-950 shadow-2xl">
              <div className="h-[32px] bg-slate-800 w-[50%] mx-auto rounded-b-xl absolute top-0 left-0 right-0 z-20"></div>
              <div className="aspect-[9/19] w-full overflow-hidden rounded-[2rem] bg-slate-900 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center mb-4 shadow-lg shadow-emerald-900/50">
                   <span className="text-3xl font-bold text-white">N</span>
                </div>
                <h3 className="text-emerald-400 font-bold mb-1">NutriSnap</h3>
                <div className="space-y-2 w-full mt-4">
                  <div className="h-2 w-3/4 bg-slate-800 rounded mx-auto animate-pulse"></div>
                  <div className="h-2 w-1/2 bg-slate-800 rounded mx-auto animate-pulse"></div>
                  <div className="h-20 w-full bg-slate-800/50 rounded-xl mt-4 border border-emerald-500/20 p-2 flex items-center justify-center">
                    <span className="text-xs text-emerald-200">Menu Analyzed ✅</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Background Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
