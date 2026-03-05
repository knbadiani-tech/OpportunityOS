import React from 'react';
import { ArrowLeft, Share2, Download } from 'lucide-react';
import Link from 'next/link';
import { TrendCharts } from '@/components/dashboard/TrendCharts';
import { EvidencePanel } from '@/components/dashboard/EvidencePanel';
import { OpportunityBrief } from '@/components/dashboard/OpportunityBrief';
import { TrendResult } from '@/lib/types';

export default async function TrendDetail({ params }: { params: { id: string } }) {
    const keyword = decodeURIComponent(params.id);

    // Since we no longer persist data, we recompute on demand and pick this trend
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/run-radar`, {
        method: 'POST',
        cache: 'no-store',
    });

    const data = await res.json();
    const trends: TrendResult[] = Array.isArray(data.trends) ? data.trends : [];
    const trend = trends.find((t) => t.keyword.toLowerCase() === keyword.toLowerCase());

    if (!trend) {
        return (
            <div className="flex h-screen items-center justify-center p-8">
                <div className="glass-panel p-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Trend Not Found</h2>
                    <p className="text-white/50 mb-6">The requested trend analysis could not be generated. Please try running the radar again.</p>
                    <Link href="/" className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors">
                        Return to Radar
                    </Link>
                </div>
            </div>
        );
    }

    // Google Trends API from the library doesn't easily return a consistent historical timeline in this structure so we mock a visual representation for the demo chart based on the velocity score.
    // In a real production setup, we would save the raw timelineData from the googleTrends fetcher to the document.
    const baseline = 20;
    const generateChartData = () => {
        return Array.from({ length: 90 }, (_, i) => ({
            date: `Day ${i + 1}`,
            interest: Math.max(0, baseline + (trend.signals.googleTrendsScore * (i / 90)) + (Math.random() * 10 - 5)),
            social: Math.max(0, (trend.signals.redditMentions / 30) * (i / 90) + (Math.random() * 5))
        }));
    };

    const chartData = generateChartData();

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-white/70" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-semibold px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                {trend.classification}
                            </span>
                            <span className="text-xs text-emerald-400 font-medium bg-white/5 px-2 py-1 rounded border border-white/5">
                                {trend.signals.googleTrendsScore >= 200 ? '🔥 Exploding' : trend.signals.googleTrendsScore >= 80 ? '📈 Rising' : '⚠️ Stable/Slow'} ({trend.signals.googleTrendsScore >= 0 ? '+' : ''}{trend.signals.googleTrendsScore}%)
                            </span>
                        </div>
                        <h1 className="text-4xl font-black capitalize tracking-tight text-white">{trend.keyword}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5">
                        <Share2 className="w-5 h-5 text-white/70" />
                    </button>
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5">
                        <Download className="w-5 h-5 text-white/70" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Charts and Evidence */}
                <div className="lg:col-span-2 space-y-8">

                    <div className="glass-panel p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Trend Momentum</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                    <span className="text-xs text-white/50">Simulated Search Interest</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-400" />
                                    <span className="text-xs text-white/50">Simulated Social Growth</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <TrendCharts data={chartData} dataKey="interest" color="#34d399" />
                            <TrendCharts data={chartData} dataKey="social" color="#60a5fa" />
                        </div>
                    </div>

                    <EvidencePanel signals={trend.signals} />

                </div>

                {/* Right Column: Brief */}
                <div className="space-y-8">

                    <div className="glass-panel p-6 bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20 flex flex-col items-center text-center">
                        <h3 className="text-white/50 text-sm font-medium uppercase tracking-wider mb-2">Trend Score</h3>
                        <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-4">
                            {trend.trendScore}
                        </div>
                        <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden mb-2">
                            <div className="bg-emerald-400 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${trend.trendScore}%` }} />
                        </div>
                        <p className="text-xs text-emerald-400/80 mt-2">Quantitative momentum analysis</p>
                    </div>

                    <OpportunityBrief brief={trend.brief} />

                </div>
            </div>
        </div>
    );
}
