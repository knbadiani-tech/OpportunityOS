export async function fetchYouTubeData(keyword: string) {
    try {
        const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(keyword)}`;
        const res = await fetch(url, {
            headers: {
                "User-Agent": "OpportunityOS Trend Radar"
            }
        });

        if (!res.ok) {
            console.log("[youtube] request failed for", keyword);
            return { uploads: 0 };
        }

        const text = await res.text();
        const matches = text.match(/videoRenderer/g);

        const videoCount = matches ? matches.length : 0;
        let youtubeVideos = Math.floor(videoCount / 10);
        if (youtubeVideos > 10) youtubeVideos = 10;

        console.log("[youtube]", keyword, youtubeVideos);

        return { uploads: youtubeVideos };
    } catch (error: any) {
        console.log("[youtube] request failed for", keyword);
        return { uploads: 0 };
    }
}

