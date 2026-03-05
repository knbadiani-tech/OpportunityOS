import React from 'react';
import { Search, MessageSquare, Youtube, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EvidencePanelProps {
    signals: {
        googleTrendsGrowth: number;
        redditMentions: number;
        youtubeUploads: number;
        amazonProducts: number;
    };
}

export function EvidencePanel({ signals }: EvidencePanelProps) {
    return (
        <div className="glass-panel p-6">
            <h3 className="text-xl font-bold text-white mb-6">Evidence Signals</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Google Trends */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-start gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg shrink-0">
                        <Search className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <p className="text-sm text-white/50 font-medium">Google Trends 90d</p>
                        <p className={cn("text-2xl font-bold mt-1", signals.googleTrendsGrowth >= 0 ? "text-emerald-400" : "text-rose-400")}>
                            {signals.googleTrendsGrowth >= 0 ? '+' : ''}{signals.googleTrendsGrowth}%
                        </p>
                        <p className="text-xs text-white/40 mt-1">Search volume velocity</p>
                    </div>
                </div>

                {/* Reddit */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-start gap-4">
                    <div className="p-3 bg-orange-500/10 rounded-lg shrink-0">
                        <MessageSquare className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                        <p className="text-sm text-white/50 font-medium">Reddit Mentions</p>
                        <p className="text-2xl font-bold text-white mt-1">{signals.redditMentions}</p>
                        <p className="text-xs text-white/40 mt-1">Discussions in last 30d</p>
                    </div>
                </div>

                {/* YouTube */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-start gap-4">
                    <div className="p-3 bg-red-500/10 rounded-lg shrink-0">
                        <Youtube className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                        <p className="text-sm text-white/50 font-medium">YouTube Uploads</p>
                        <p className="text-2xl font-bold text-white mt-1">{signals.youtubeUploads}</p>
                        <p className="text-xs text-white/40 mt-1">Related videos in 30d</p>
                    </div>
                </div>

                {/* Amazon */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-start gap-4">
                    <div className="p-3 bg-yellow-500/10 rounded-lg shrink-0">
                        <ShoppingBag className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                        <p className="text-sm text-white/50 font-medium">Amazon Listings</p>
                        <p className="text-2xl font-bold text-white mt-1">{signals.amazonProducts}</p>
                        <p className="text-xs text-white/40 mt-1">Active competitor products</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
