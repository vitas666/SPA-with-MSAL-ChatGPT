import React, { useEffect, useState } from "react";
import { ContentClient } from "dc-delivery-sdk-js";
import Banner from "../components/Banner/index.tsx";
import { fetchAmplienceContent } from "../utils/fetchContent.ts";

type ContentType = {
    body: any;
};

const responseData = await fetchAmplienceContent('1e473c1d-bd68-402f-bdaa-46296bff95e0');
const deliveryKey: string = responseData.content._meta.deliveryKey;

const client = new ContentClient({
    hubName: 'giantuat',
});

// Hero Component that applies all visualization settings
const HeroWithImage: React.FC = () => {
    const [content, setContent] = useState<any>(null);

    useEffect(() => {
        async function fetchBanner() {
            const banner: ContentType = await client.getContentItemByKey(deliveryKey);
            setContent(banner.body);
        }
        fetchBanner();
    }, []);
    
    return content ? <Banner content={content} /> : <div>Loading...</div>;
};

export default HeroWithImage;