import { OpportunityBrief, TrendSignals } from './types';

export async function generateOpportunityBrief(
    keyword: string,
    trendScore: number,
    signals: TrendSignals,
): Promise<OpportunityBrief> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        console.warn('[OpenAI] No OPENAI_API_KEY set — using fallback brief for', keyword);
        return fallbackBrief(keyword);
    }

    try {
        const systemPrompt = `You are a founder-intelligence copilot for Indian D2C wellness brands.
Given a wellness trend keyword, a trend score (0-100), and quantitative signals, generate a short, punchy opportunity insight for founders in India.
Return ONLY a valid JSON object with the following keys:
- signalSummary (string, 1-2 sentences)
- consumerInsight (string, 1-2 sentences)
- founderProductIdea (string, 1 highly specific product concept)
- timeToMainstream (string like "3-6 months").`;

        const userPrompt = `Trend keyword: ${keyword}
Trend score: ${trendScore}

Signals:
- Google Trends search velocity score: ${signals.googleTrendsScore}
- Reddit mentions (recent): ${signals.redditMentions}
- YouTube videos (recent): ${signals.youtubeVideos}

Respond ONLY with a JSON object with the exact keys described above.`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt },
                ],
                temperature: 0.5,
            }),
        });

        if (!response.ok) {
            const text = await response.text();
            console.warn('[OpenAI] API error, using fallback brief:', response.status, text);
            return fallbackBrief(keyword);
        }

        const json = (await response.json()) as any;
        const content: string | undefined = json?.choices?.[0]?.message?.content;

        let parsed: any = {};
        if (content) {
            try {
                parsed = JSON.parse(content);
            } catch (e) {
                console.warn(
                    '[OpenAI] Failed to parse JSON from model, using raw text as signalSummary',
                );
                parsed.signalSummary = content;
            }
        }

        return {
            signalSummary:
                parsed.signalSummary ||
                `Rising interest in ${keyword} across Indian wellness consumers.`,
            consumerInsight:
                parsed.consumerInsight ||
                'Urban consumers are actively searching and talking about this need-state before large FMCG brands have moved in.',
            founderProductIdea:
                parsed.founderProductIdea ||
                `Launch a focused ${keyword} product tailored for working professionals in tier-1 cities.`,
            timeToMainstream: parsed.timeToMainstream || '3-6 months',
        };
    } catch (error: any) {
        console.warn('[OpenAI] Generation failed, using fallback brief:', error?.message || error);
        return fallbackBrief(keyword);
    }
}

function fallbackBrief(keyword: string): OpportunityBrief {
    return {
        signalSummary: 'Trend signals detected across search and social channels.',
        consumerInsight: 'Growing consumer curiosity around wellness and supplements.',
        founderProductIdea: `Launch a ${keyword} based wellness product targeting early adopters.`,
        timeToMainstream: '3-6 months',
    };
}

