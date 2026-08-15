import type { CountryCode } from '../types/country';
import type { TrackId, TrackCountryDetail } from '../types/track';
import { TRACKS_DATA } from './tracks';

export interface CountryTrackScoreMatrix {
  countryCode: CountryCode;
  averageCompositeScore: number;
  trackBreakdown: Record<TrackId, TrackCountryDetail>;
}

export const COUNTRY_RANKINGS: Record<CountryCode, CountryTrackScoreMatrix> = ((): Record<
  CountryCode,
  CountryTrackScoreMatrix
> => {
  const result: Partial<Record<CountryCode, CountryTrackScoreMatrix>> = {};
  const countryCodes: CountryCode[] = [
    'NZ',
    'AU',
    'CA',
    'DE',
    'UK',
    'IE',
    'JP',
    'SG',
    'US',
    'NL',
    'FR',
    'SE',
    'DK',
    'FI',
  ];

  for (const ccode of countryCodes) {
    const trackBreakdown: Partial<Record<TrackId, TrackCountryDetail>> = {};
    let totalScore = 0;
    let count = 0;

    for (const [tId, tObj] of Object.entries(TRACKS_DATA)) {
      const detail = tObj.countryRankings[ccode];
      if (detail) {
        trackBreakdown[tId as TrackId] = detail;
        totalScore += detail.scores.compositeScore;
        count += 1;
      }
    }

    result[ccode] = {
      countryCode: ccode,
      averageCompositeScore: count > 0 ? Number((totalScore / count).toFixed(1)) : 7.5,
      trackBreakdown: trackBreakdown as Record<TrackId, TrackCountryDetail>,
    };
  }

  return result as Record<CountryCode, CountryTrackScoreMatrix>;
})();
