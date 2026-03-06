export type TrendClassification = 'Emerging Trend' | 'Watchlist Signal' | 'Likely Fad';

export interface TrendSignals {
    /**
     * Google Trends search velocity or growth signal (e.g. 0–100+%).
     */
    googleTrendsScore: number;
    /**
     * Number of recent Reddit posts / mentions.
     */
    redditMentions: number;
    /**
     * Number of recent YouTube videos for this keyword.
     */
    youtubeVideos: number;
}

export interface OpportunityBrief {
    signalSummary: string;
    consumerInsight: string;
    founderProductIdea: string;
    timeToMainstream: string;
}

export interface TrendResult {
    keyword: string;
    trendScore: number;
    classification: TrendClassification;
    signals: TrendSignals;
    opportunityBrief: OpportunityBrief;
}

