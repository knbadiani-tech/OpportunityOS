export async function fetchRedditData(keyword: string) {
    try {
        const response = await fetch(
            `https://api.reddit.com/search?q=${encodeURIComponent(keyword)}&limit=25`,
            {
                headers: {
                    "User-Agent": "Mozilla/5.0 OpportunityOS Trend Radar"
                }
            }
        );

        const json = await response.json();

        if (!json?.data?.children) {
            return { mentions: 0 };
        }

        return { mentions: json.data.children.length };

    } catch (error) {
        console.error("Reddit fetch failed:", error);
        return { mentions: 0 };
    }
}
