import { useEffect, useState } from 'react';

type Season = 'christmas' | 'thanksgiving' | 'halloween' | 'valentines' | 'default';

interface SeasonConfig {
  name: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  theme: Season;
}

const SEASONS: SeasonConfig[] = [
  // Christmas: Dec 1 - Jan 6
  { name: 'Christmas', startMonth: 12, startDay: 1, endMonth: 1, endDay: 6, theme: 'christmas' },
  // Thanksgiving: Nov 15 - Nov 30
  { name: 'Thanksgiving', startMonth: 11, startDay: 15, endMonth: 11, endDay: 30, theme: 'thanksgiving' },
  // Halloween: Oct 15 - Oct 31
  { name: 'Halloween', startMonth: 10, startDay: 15, endMonth: 10, endDay: 31, theme: 'halloween' },
  // Valentine's Day: Feb 7 - Feb 14
  { name: "Valentine's Day", startMonth: 2, startDay: 7, endMonth: 2, endDay: 14, theme: 'valentines' },
];

const getCurrentSeason = (): Season => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  for (const season of SEASONS) {
    // Handle seasons that cross year boundary (like Christmas Dec-Jan)
    if (season.startMonth > season.endMonth) {
      if (
        (month === season.startMonth && day >= season.startDay) ||
        (month > season.startMonth) ||
        (month < season.endMonth) ||
        (month === season.endMonth && day <= season.endDay)
      ) {
        return season.theme;
      }
    } else {
      if (
        (month > season.startMonth || (month === season.startMonth && day >= season.startDay)) &&
        (month < season.endMonth || (month === season.endMonth && day <= season.endDay))
      ) {
        return season.theme;
      }
    }
  }

  return 'default';
};

export const useCurrentSeason = () => {
  const [season, setSeason] = useState<Season>(getCurrentSeason());

  useEffect(() => {
    // Check season every hour
    const interval = setInterval(() => {
      setSeason(getCurrentSeason());
    }, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return season;
};

export const SeasonalTheme = () => {
  const season = useCurrentSeason();

  useEffect(() => {
    // Remove all seasonal theme classes
    document.body.classList.remove(
      'thanksgiving-theme',
      'christmas-theme',
      'halloween-theme',
      'valentines-theme'
    );

    // Add current season theme class
    if (season !== 'default') {
      document.body.classList.add(`${season}-theme`);
    }

    return () => {
      document.body.classList.remove(
        'thanksgiving-theme',
        'christmas-theme',
        'halloween-theme',
        'valentines-theme'
      );
    };
  }, [season]);

  return null;
};

export default SeasonalTheme;
