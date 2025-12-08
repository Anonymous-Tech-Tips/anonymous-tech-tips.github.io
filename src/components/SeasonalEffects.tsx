import { useCurrentSeason } from './SeasonalTheme';
import { FallingLeaves } from './FallingLeaves';
import { FallingSnow } from './FallingSnow';

export const SeasonalEffects = () => {
  const season = useCurrentSeason();

  switch (season) {
    case 'christmas':
      return <FallingSnow />;
    case 'thanksgiving':
      return <FallingLeaves />;
    case 'halloween':
      // Could add falling bats or pumpkins later
      return <FallingLeaves />;
    default:
      return null;
  }
};

export default SeasonalEffects;
