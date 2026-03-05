import React from 'react';
import { Target, Users, Zap, Briefcase, IndianRupee } from 'lucide-react';

interface OpportunityBriefProps {
    brief: {
        marketOpportunity: string;
        competition: string;
        consumerInsight: string;
        productIdea: string;
        timeToMainstream: string;
        tamCalculation: string;
    };
}

export function OpportunityBrief({ brief }: OpportunityBriefProps) {
    return (
        <div className="glass-panel p-8">
            <div className="flex items-center gap-3 mb-8">
                <Zap className="w-6 h-6 text-emerald-400" />
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
                    Founder Opportunity Brief
                </h2>
            </div>

            <div className="space-y-6">

                {/* TAM & Market Size */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <IndianRupee className="w-5 h-5 text-emerald-400" />
                        <h4 className="font-semibold text-white/90">Market Opportunity & TAM</h4>
                    </div>
                    <p className="text-white/70 leading-relaxed mb-3">{brief.marketOpportunity}</p>
                    <div className="bg-black/30 p-3 rounded-lg border border-white/5 font-mono text-sm text-emerald-300/80">
                        Formula: {brief.tamCalculation}
                    </div>
                </div>

                {/* Consumer Insight */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-blue-400" />
                        <h4 className="font-semibold text-white/90">Consumer Insight</h4>
                    </div>
                    <p className="text-white/70 leading-relaxed">{brief.consumerInsight}</p>
                </div>

                {/* Product Idea */}
                <div className="bg-white/5 border border-emerald-500/20 p-5 rounded-xl bg-gradient-to-br from-emerald-500/5 to-transparent relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl -z-10" />
                    <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-5 h-5 text-emerald-400" />
                        <h4 className="font-semibold text-white text-lg">Recommended Product Play</h4>
                    </div>
                    <p className="text-white/80 leading-relaxed font-medium">{brief.productIdea}</p>
                </div>

                {/* Competition & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                            <Target className="w-4 h-4 text-orange-400" />
                            <h4 className="font-semibold text-white/90 text-sm">Competition</h4>
                        </div>
                        <p className="text-white/60 text-sm">{brief.competition}</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-purple-400" />
                            <h4 className="font-semibold text-white/90 text-sm">Time to Mainstream</h4>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{brief.timeToMainstream}</div>
                        <p className="text-white/40 text-xs text-purple-400">Estimated window</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

// Separate component to prevent error from lucide
function Clock(props: any) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
}
