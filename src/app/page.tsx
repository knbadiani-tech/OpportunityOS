'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Beaker, TrendingUp, Zap, Clock } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { TrendCard } from '@/components/dashboard/TrendCard';
import { TrendResult } from '@/lib/types';

export default function Dashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [trends, setTrends] = useState<TrendResult[]>([]);
  const [lastRunAt, setLastRunAt] = useState<Date | null>(null);
  const [loadingInitial, setLoadingInitial] = useState(false);

  const handleRunRadar = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/run-radar', { method: 'POST' });
      const data = await res.json();
      if (data.status === 'ok') {
        setTrends(data.trends || []);
        setLastRunAt(new Date());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRefreshing(false);
    }
  };

  const getStats = () => {
    let emerging = 0; let watchlist = 0; let fads = 0;
    trends.forEach(t => {
      if (t.classification === 'Emerging Trend') emerging++;
      if (t.classification === 'Watchlist') watchlist++;
      if (t.classification === 'Likely Fad') fads++;
    });
    return { emerging, watchlist, fads };
  };

  const stats = getStats();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

      {/* Header section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
            OpportunityOS
          </h1>
          <h2 className="text-xl text-emerald-400 font-medium mb-2">
            OpportunityOS – Founder Opportunity Discovery Engine
          </h2>
          <p className="text-white/50 text-base max-w-xl">
            Detect emerging startup opportunities in the Indian wellness market using real-time signals.
          </p>
        </div>

        <button
          onClick={handleRunRadar}
          disabled={isRefreshing}
          className="relative overflow-hidden group px-6 py-3 rounded-2xl glass-panel-hover flex items-center gap-3 disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Zap className={`w-5 h-5 ${isRefreshing ? 'animate-pulse text-emerald-400' : 'text-emerald-500'}`} />
          <span className="font-semibold tracking-wide flex items-center gap-2">
            {isRefreshing && <span className="w-4 h-4 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin inline-block" />}
            {isRefreshing ? 'Analyzing signals… gathering market intelligence.' : 'Run Radar'}
          </span>
        </button>
      </section>

      {/* Overview Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 flex-wrap lg:grid-cols-4 gap-6">
        <StatCard
          title="Emerging Trends"
          value={stats.emerging.toString()}
          icon={TrendingUp}
          glowColor="green"
        />
        <StatCard
          title="Watchlist Signals"
          value={stats.watchlist.toString()}
          icon={Activity}
          glowColor="yellow"
        />
        <StatCard
          title="Likely Fads"
          value={stats.fads.toString()}
          icon={Beaker}
          glowColor="red"
        />
        <StatCard
          title="Latest Run"
          value={lastRunAt ? lastRunAt.toLocaleTimeString() : 'Not run yet'}
          icon={Clock}
        />
      </section>

      {/* Run Summary Alert */}
      {lastRunAt && trends.length > 0 && (
        <section className="glass-panel p-4 flex items-center justify-between border-l-4 border-l-emerald-500 bg-emerald-500/5 transition-all duration-500 animate-in slide-in-from-top-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-white font-medium">Latest Run Complete</h4>
              <p className="text-white/50 text-sm">Detected {stats.emerging} Emerging Trends, {stats.watchlist} Watchlist Signals, and {stats.fads} Likely Fads.</p>
            </div>
          </div>
          <span className="text-xs text-white/30 hidden md:inline-block">Radar Engine v1.0</span>
        </section>
      )}

      {/* Detected Trends Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-white/90">Market Intelligence</h2>
          <select className="bg-transparent border border-white/10 rounded-xl px-4 py-2 text-sm text-white/70 focus:outline-none focus:ring-1 focus:ring-white/20">
            <option className="bg-background">All Categories</option>
            <option className="bg-background">Supplements</option>
            <option className="bg-background">Mental Wellness</option>
          </select>
        </div>

        {loadingInitial ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trends.length === 0 ? (
              <div className="col-span-full text-center text-white/40 py-12 glass-panel">
                <p>No trends detected yet. Click "Run Radar" to begin.</p>
              </div>
            ) : (
              trends.map((trend) => (
                <TrendCard
                  key={trend.keyword}
                  id={trend.keyword}
                  keyword={trend.keyword}
                  score={trend.trendScore}
                  classification={trend.classification}
                  velocity={trend.signals.googleTrendsScore}
                  redditMentions={trend.signals.redditMentions}
                  youtubeVideos={trend.signals.youtubeVideos}
                  founderProductIdea={trend.opportunityBrief?.founderProductIdea}
                  consumerInsight={trend.opportunityBrief?.consumerInsight}
                />
              ))
            )}
          </div>
        )}
      </section>

    </div>
  );
}
