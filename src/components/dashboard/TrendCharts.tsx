'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TrendChartsProps {
    data: any[];
    dataKey: string;
    color: string;
}

export function TrendCharts({ data, dataKey, color }: TrendChartsProps) {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="date"
                        stroke="#ffffff40"
                        tick={{ fill: '#ffffff60', fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#ffffff40"
                        tick={{ fill: '#ffffff60', fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(5,5,5,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <Area
                        type="monotone"
                        dataKey={dataKey}
                        stroke={color}
                        fillOpacity={1}
                        fill={`url(#color${dataKey})`}
                        strokeWidth={3}
                        animationDuration={1500}
                        animationEasing="ease-out"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
