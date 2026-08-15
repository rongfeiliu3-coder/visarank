import React from 'react';
import type { CountryCode } from '@emigrant/shared';
import { GlobalHeatMap } from './map/GlobalHeatMap';

interface GlobalDecisionMapProps {
  onOpenAssessment: (countryCode?: CountryCode) => void;
  onSelectCountry?: (countryCode: CountryCode) => void;
  onNavigateToTrack?: (trackId: string) => void;
  onOpenConsultation?: (visaName?: string) => void;
}

export const GlobalDecisionMap: React.FC<GlobalDecisionMapProps> = (props) => {
  return <GlobalHeatMap {...props} />;
};

export default GlobalDecisionMap;
