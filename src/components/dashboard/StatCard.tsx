import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    icon: LucideIcon;
    className?: string;
    glowColor?: 'green' | 'red' | 'yellow' | 'none';
}

export function StatCard({
    title,
    value,
    trend,
    trendUp,
    icon: Icon,
    className,
    glowColor = 'none',
}: StatCardProps) {
    return (
        <div
            className={cn(
                'glass-panel p-6 flex flex-col gap-4 relative overflow-hidden group',
                glowColor === 'green' && 'hover:neon-glow',
                glowColor === 'red' && 'hover:neon-glow-red',
                glowColor === 'yellow' && 'hover:neon-glow-yellow',
                className
            )}
        >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />

            <div className="flex items-center justify-between z-10">
                <h3 className="text-white/60 font-medium text-sm tracking-wide">{title}</h3>
                <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center border",
                    glowColor === 'green' ? "bg-emerald-500/10 border-emerald-500/20" :
                        glowColor === 'yellow' ? "bg-yellow-500/10 border-yellow-500/20" :
                            glowColor === 'red' ? "bg-rose-500/10 border-rose-500/20" :
                                "bg-white/5 border-white/5"
                )}>
                    <Icon className={cn(
                        "w-5 h-5",
                        glowColor === 'green' ? "text-emerald-400" :
                            glowColor === 'yellow' ? "text-yellow-400" :
                                glowColor === 'red' ? "text-rose-400" :
                                    "text-white/80"
                    )} />
                </div>
            </div>

            <div className="z-10 mt-2">
                <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
                {trend && (
                    <div className="flex items-center gap-2 mt-2">
                        <span
                            className={cn(
                                'text-xs font-medium px-2 py-1 rounded-md bg-white/5 border',
                                trendUp
                                    ? 'text-emerald-400 border-emerald-400/20'
                                    : 'text-rose-400 border-rose-400/20'
                            )}
                        >
                            {trendUp ? '+' : '-'}{trend}
                        </span>
                        <span className="text-xs text-white/40">vs last run</span>
                    </div>
                )}
            </div>
        </div>
    );
}
