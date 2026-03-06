export async function fetchRedditData(keyword: string) {
    try {
        const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(keyword)}&sort=new&limit=25`
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 OpportunityOS Trend Radar"
            }
        })
        const data = await response.json()
        const mentions = data?.data?.children?.length || 0
        return { mentions }
    } catch (error) {
        console.error("Reddit fetch error:", error)
        return { mentions: 0 }
    }
}
