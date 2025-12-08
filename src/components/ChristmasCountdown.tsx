import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import christmasVillage from '@/assets/christmas-village.jpg';

export const ChristmasCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let christmas = new Date(currentYear, 11, 25); // Dec 25
      
      // If Christmas has passed this year, calculate for next year
      if (now > christmas) {
        christmas = new Date(currentYear + 1, 11, 25);
      }
      
      const difference = christmas.getTime() - now.getTime();
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="relative p-6 border-2 border-christmas-gold/50 shadow-xl overflow-hidden rounded-2xl">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${christmasVillage})` }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-christmas-darkRed/70 via-christmas-darkGreen/60 to-christmas-darkRed/70" />
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl font-rowdies text-center mb-4 text-christmas-cream flex items-center justify-center gap-2 drop-shadow-lg">
          🎄 Christmas Countdown 🎅
        </h3>
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center bg-christmas-cream/20 backdrop-blur-sm rounded-lg p-2">
            <div className="text-3xl md:text-4xl font-bold font-rowdies text-christmas-gold drop-shadow-lg">{timeLeft.days}</div>
            <div className="text-xs md:text-sm text-christmas-cream font-medium">Days</div>
          </div>
          <div className="text-center bg-christmas-cream/20 backdrop-blur-sm rounded-lg p-2">
            <div className="text-3xl md:text-4xl font-bold font-rowdies text-christmas-gold drop-shadow-lg">{timeLeft.hours}</div>
            <div className="text-xs md:text-sm text-christmas-cream font-medium">Hours</div>
          </div>
          <div className="text-center bg-christmas-cream/20 backdrop-blur-sm rounded-lg p-2">
            <div className="text-3xl md:text-4xl font-bold font-rowdies text-christmas-gold drop-shadow-lg">{timeLeft.minutes}</div>
            <div className="text-xs md:text-sm text-christmas-cream font-medium">Minutes</div>
          </div>
          <div className="text-center bg-christmas-cream/20 backdrop-blur-sm rounded-lg p-2">
            <div className="text-3xl md:text-4xl font-bold font-rowdies text-christmas-gold drop-shadow-lg">{timeLeft.seconds}</div>
            <div className="text-xs md:text-sm text-christmas-cream font-medium">Seconds</div>
          </div>
        </div>
        <p className="text-center mt-4 text-sm text-christmas-cream italic drop-shadow-md">
          The magic is coming! ✨🎁
        </p>
      </div>
    </Card>
  );
};

export default ChristmasCountdown;
