import React from 'react';
import type { CountryCode } from '@emigrant/shared';
import { GlobalHeatMap } from './map/GlobalHeatMap';

interface WorldMapSectionProps {
  onOpenAssessment: (countryCode?: CountryCode) => void;
  onSelectCountry?: (countryCode: CountryCode) => void;
  onNavigateToTrack?: (trackId: string) => void;
}

export const WorldMapSection: React.FC<WorldMapSectionProps> = (props) => {
  return <GlobalHeatMap {...props} />;
};

export default WorldMapSection;
