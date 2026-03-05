export async function fetchRedditData(keyword: string) {
    try {
        const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(keyword)}&limit=50&sort=new`;

        const res = await fetch(url, {
            headers: {
                "User-Agent": "OpportunityOS Trend Radar"
            }
        });

        if (!res.ok) {
            console.log("[reddit] request failed for", keyword);
            return { mentions: 0 };
        }

        const json = await res.json();
        const posts = json?.data?.children || [];

        const subredditSet = new Set();
        posts.forEach((post: any) => {
            if (post?.data?.subreddit) {
                subredditSet.add(post.data.subreddit);
            }
        });

        const mentions = subredditSet.size;

        console.log("[reddit]", keyword, mentions);

        return { mentions };
    } catch (error: any) {
        console.log("[reddit] request failed for", keyword);
        return { mentions: 0 };
    }
}

