import React from 'react';
import Link from 'next/link';
import { Activity, BarChart2, Compass, Settings } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 glass-panel m-4 flex-shrink-0 flex flex-col items-center py-8 z-10 border-r border-white/10 relative overflow-hidden hidden md:flex">
                {/* Subtle glow behind sidebar */}
                <div className="absolute top-0 left-0 w-full h-32 bg-primary/10 blur-3xl -z-10 rounded-full" />

                <div className="mb-12 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white to-white/30 flex items-center justify-center p-[1px]">
                        <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 bg-white rounded-full mix-blend-screen opacity-80" />
                        </div>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-white/90">OpportunityOS</h1>
                </div>

                <nav className="flex-1 w-full px-4 space-y-2">
                    {[
                        { name: 'Radar', icon: Compass, active: true },
                        { name: 'Analytics', icon: BarChart2, active: false },
                        { name: 'Activity', icon: Activity, active: false },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href="#"
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${item.active
                                    ? 'bg-white/10 text-white shadow-sm border border-white/5'
                                    : 'text-white/50 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium text-sm">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="w-full px-4 mt-auto">
                    <Link
                        href="#"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300"
                    >
                        <Settings className="w-5 h-5" />
                        <span className="font-medium text-sm">Settings</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-full overflow-y-auto overflow-x-hidden relative">
                {children}
            </main>
        </div>
    );
}
