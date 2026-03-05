import { TrendClassification } from './types';

interface RawSignals {
    googleSearchVelocity: number;
    redditMentions: number;
    youtubeActivity: number;
}

export function calculateTrendScore(signals: RawSignals) {
    let gsVelocity = signals.googleSearchVelocity;

    // 1. If googleTrendsScore is 0 or missing, apply a fallback estimation using Reddit and YouTube signals.
    if (!gsVelocity || gsVelocity === 0) {
        gsVelocity = (signals.redditMentions * 1.5) + (signals.youtubeActivity * 2);
    }

    // Normalize signals first
    const normalizedTrends = gsVelocity;
    const normalizedReddit = Math.min(10, Math.floor(signals.redditMentions / 5));
    const normalizedYoutube = Math.min(10, signals.youtubeActivity);

    // Compute score:
    const scoreFloat =
        (normalizedTrends * 0.5) +
        (normalizedReddit * 4) +
        (normalizedYoutube * 3);

    // 3. Clamp the score between 0 and 100 and add randomness.
    let trendScore = clamp(Math.round(scoreFloat), 0, 100);
    trendScore = trendScore + Math.floor(Math.random() * 5);
    trendScore = clamp(trendScore, 0, 100);

    // 4. Ensure that typical runs produce scores between:
    let classification: TrendClassification = 'Likely Fad';
    if (trendScore >= 70) {
        classification = 'Emerging Trend';
    } else if (trendScore >= 40) {
        classification = 'Watchlist';
    }

    return {
        trendScore,
        classification,
    };
}

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

