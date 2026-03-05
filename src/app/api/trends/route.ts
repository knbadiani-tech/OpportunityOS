import { NextResponse } from 'next/server';

// Legacy endpoint kept for compatibility. Since the backend is now fully
// stateless (no database), this simply returns an empty list and
// callers should use POST /api/run-radar instead.

export async function GET() {
    return NextResponse.json({ success: true, data: [] });
}

