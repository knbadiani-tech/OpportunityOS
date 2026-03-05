import React from 'react';
import { ArrowUpRight, TrendingUp, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface TrendCardProps {
    id?: string;
    keyword: string;
    score: number;
    classification: 'Emerging Trend' | 'Watchlist' | 'Likely Fad';
    velocity: number; // e.g., 250 for +250%
    redditMentions?: number;
    youtubeVideos?: number;
    founderProductIdea?: string;
    consumerInsight?: string;
}

export function TrendCard({ keyword, score, classification, velocity, redditMentions, youtubeVideos, founderProductIdea, consumerInsight }: TrendCardProps) {
    // Determine gradient, glow, and icon based on classification
    const isEmerging = classification === 'Emerging Trend';
    const isWatch = classification === 'Watchlist';

    const getVelocityIndicator = () => {
        if (velocity > 200) return { icon: '🔥', label: 'Exploding', color: 'text-orange-400' };
        if (velocity > 100) return { icon: '📈', label: 'Rising', color: 'text-emerald-400' };
        return { icon: '⚠️', label: 'Early Signal', color: 'text-yellow-400' };
    };

    const velocityData = getVelocityIndicator();

    return (
        <Link href={`/trend/${encodeURIComponent(keyword)}`} className="block">
            <div
                className={cn(
                    "glass-panel p-6 relative overflow-hidden group transition-all duration-300 cursor-pointer hover:-translate-y-1.5 hover:shadow-xl",
                    isEmerging && "hover:shadow-emerald-500/10 hover:neon-glow border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent",
                    isWatch && "hover:shadow-yellow-500/10 hover:neon-glow-yellow border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-transparent",
                    !isEmerging && !isWatch && "hover:shadow-rose-500/10 hover:neon-glow-red border-rose-500/20 bg-gradient-to-br from-rose-500/5 to-transparent opacity-80 hover:opacity-100"
                )}
            >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-5 h-5 text-white/50" />
                </div>

                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2 capitalize">{keyword}</h3>
                        <div className="flex items-center gap-3">
                            <span className={cn(
                                "text-xs font-semibold px-2 py-1 rounded border",
                                isEmerging ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                    isWatch ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                                        "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            )}>
                                {classification}
                            </span>
                            <span className={cn("text-xs font-medium flex items-center gap-1", velocityData.color)}>
                                {velocityData.icon} {velocityData.label} ({velocity > 0 ? '+' : ''}{velocity}%)
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50">
                            {score}
                        </span>
                        <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Score</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-black/40 rounded-full h-1.5 mt-6 mb-5 overflow-hidden">
                    <div
                        className={cn(
                            "h-full rounded-full transition-all duration-1000 ease-out",
                            isEmerging ? "bg-gradient-to-r from-emerald-600 to-emerald-400" :
                                isWatch ? "bg-gradient-to-r from-yellow-600 to-yellow-400" :
                                    "bg-gradient-to-r from-rose-600 to-rose-400"
                        )}
                        style={{ width: `${score}%` }}
                    />
                </div>

                {/* Signals Evidence */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-medium text-white/70 shadow-sm backdrop-blur-sm">
                        <span>📈</span>
                        <span>Google Trends +{velocity}</span>
                    </div>
                    {typeof redditMentions === 'number' && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-medium text-white/70 shadow-sm backdrop-blur-sm">
                            <span>💬</span>
                            <span>Reddit Mentions {redditMentions}</span>
                        </div>
                    )}
                    {typeof youtubeVideos === 'number' && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-medium text-white/70 shadow-sm backdrop-blur-sm">
                            <span>🎥</span>
                            <span>YouTube Videos {youtubeVideos}</span>
                        </div>
                    )}
                </div>

                {(founderProductIdea || consumerInsight) && (
                    <div className="space-y-4 pt-4 border-t border-white/10">
                        {founderProductIdea && (
                            <div>
                                <h4 className="text-[10px] text-white/50 font-bold mb-1.5 uppercase tracking-widest flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                    Product Idea
                                </h4>
                                <p className="text-sm text-white/80 leading-relaxed max-w-[95%]">
                                    {founderProductIdea}
                                </p>
                            </div>
                        )}
                        {consumerInsight && (
                            <div>
                                <h4 className="text-[10px] text-white/50 font-bold mb-1.5 uppercase tracking-widest flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                                    Consumer Insight
                                </h4>
                                <p className="text-sm text-white/80 leading-relaxed max-w-[95%]">
                                    {consumerInsight}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Link>
    );
}
