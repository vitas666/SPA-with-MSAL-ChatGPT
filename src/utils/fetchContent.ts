export function isGetByIdRequest(request: any): request is { id: string } {
    return typeof request === 'object' && request !== null && 'id' in request;
}

export function isGetByFilterRequest(request: any): request is { filterBy: any[] } {
    return typeof request === 'object' && request !== null && Array.isArray((request as { filterBy?: any[] }).filterBy);
}

export async function fetchAmplienceContent(id: string): Promise<any | null> {
    const url = `https://giantuat.cdn.content.amplience.net/content/id/${id}?depth=all&format=inlined`;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error fetching Amplience content:", error);
        return null;
    }
}
