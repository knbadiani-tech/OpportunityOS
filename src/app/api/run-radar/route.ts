import { NextResponse } from 'next/server';
import { fetchGoogleTrendsData } from '@/lib/fetchers/googleTrends';
import { fetchRedditData } from '@/lib/fetchers/reddit';
import { fetchYouTubeData } from '@/lib/fetchers/youtube';
import { calculateTrendScore } from '@/lib/scoring';
import { generateOpportunityBrief } from '@/lib/openai';
import { TrendResult, TrendSignals } from '@/lib/types';

// Curated list of ~20 wellness keywords to keep the run fast and stable
const KEYWORDS: string[] = [
    'ashwagandha',
    'shilajit',
    'moringa',
    'magnesium glycinate',
    'collagen peptides',
    'probiotics',
    'kombucha',
    'mushroom coffee',
    'sleep gummies',
    'hair growth supplements',
    'electrolyte drinks',
    'protein snacks',
    'nootropics',
    'gut health supplements',
    'adaptogens',
    'herbal supplements',
    'plant protein',
    'gut health powder',
    'electrolyte tablets',
    'sleep supplements',
];

const BATCH_SIZE = 5;
const MAX_RADAR_RUNTIME_MS = 15_000;

export async function GET() {
    const result = await runRadarPipeline();
    return NextResponse.json(result, { status: result.status === 'error' ? 500 : 200 });
}

export async function POST() {
    const result = await runRadarPipeline();
    return NextResponse.json(result, { status: result.status === 'error' ? 500 : 200 });
}

async function runRadarPipeline() {
    const startedAt = Date.now();
    console.log('[run-radar] Starting radar pipeline');

    try {
        const allResults: TrendResult[] = [];

        for (let i = 0; i < KEYWORDS.length; i += BATCH_SIZE) {
            if (Date.now() - startedAt > MAX_RADAR_RUNTIME_MS) {
                console.warn('[run-radar] Max runtime reached, stopping further keyword processing.');
                break;
            }

            const batch = KEYWORDS.slice(i, i + BATCH_SIZE);

            const batchResults = await Promise.all(
                batch.map(async (keyword): Promise<TrendResult | null> => {
                    console.log('[run-radar] Collecting signals for keyword:', keyword);
                    try {
                        return await analyzeKeyword(keyword);
                    } catch (error: any) {
                        console.warn(
                            '[run-radar] Keyword pipeline failed:',
                            keyword,
                            error?.message || error,
                        );
                        return null;
                    }
                }),
            );

            allResults.push(...batchResults.filter((r): r is TrendResult => r !== null));
        }

        // Sort by score (highest first)
        const sorted = allResults.sort((a, b) => b.trendScore - a.trendScore);

        // Ensure we always have at least 5 trends by re-using highest scoring
        const filled: TrendResult[] = [...sorted];
        if (filled.length > 0 && filled.length < 5) {
            let idx = 0;
            while (filled.length < 5) {
                filled.push(filled[idx % filled.length]);
                idx += 1;
            }
        }

        const top = filled.slice(0, 10);

        return {
            status: 'ok',
            trends: top,
        };
    } catch (error: any) {
        console.error('[run-radar] Radar run failed:', error);
        return {
            status: 'error',
            error: error?.message || 'Radar run failed unexpectedly',
            trends: [] as TrendResult[],
        };
    }
}

async function analyzeKeyword(keyword: string): Promise<TrendResult> {
    // Fetch external signals with per-source timeouts and error handling
    const [gt, reddit, yt] = await Promise.all([
        fetchGoogleTrendsData(keyword),
        fetchRedditData(keyword),
        fetchYouTubeData(keyword),
    ]);

    const signals: TrendSignals = {
        googleTrendsScore: gt.searchVelocity ?? 0,
        redditMentions: reddit.mentions ?? 0,
        youtubeVideos: yt.uploads ?? 0,
    };

    const { trendScore, classification } = calculateTrendScore({
        googleSearchVelocity: signals.googleTrendsScore,
        redditMentions: signals.redditMentions,
        youtubeActivity: signals.youtubeVideos,
    });

    console.log('Signals:', keyword, {
        googleTrendsScore: signals.googleTrendsScore,
        redditMentions: signals.redditMentions,
        youtubeVideos: signals.youtubeVideos
    });
    console.log('[run-radar] Trend score:', keyword, trendScore);

    const opportunityBrief = await generateOpportunityBrief(keyword, trendScore, signals);

    return {
        keyword,
        trendScore,
        classification,
        signals,
        opportunityBrief,
    };
}

