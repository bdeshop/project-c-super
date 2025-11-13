import bgImage from "../../../assets/video_background_banner.jpg";
import api from "../../../config/api";
import { useEffect, useState } from "react";

const HomeVideo = () => {
    const [promoData, setPromoData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPromoData = async () => {
            try {
                const response = await api.get("/api/promo-section");
                console.log("Promo section data:", response.data);
                setPromoData(response.data.data.promoSection);
            } catch (error) {
                console.error("Error fetching promo section data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPromoData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Extract video ID from YouTube URL if available
    const getYoutubeEmbedUrl = (youtubeUrl) => {
        if (!youtubeUrl) return "https://www.youtube.com/embed/SQ8WLYSwfRQ";
        
        const videoId = youtubeUrl.split('v=')[1];
        const ampersandPosition = videoId?.indexOf('&');
        if (ampersandPosition !== -1) {
            return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}` : "https://www.youtube.com/embed/SQ8WLYSwfRQ";
    };

    const videoUrl = promoData?.video?.youtubeUrl ? getYoutubeEmbedUrl(promoData.video.youtubeUrl) : "https://www.youtube.com/embed/SQ8WLYSwfRQ";
    const bannerImageUrl = promoData?.banner?.image || "";

    return (
        <div className="mx-auto max-w-[750px] lg:max-w-6xl px-4 py-6">
            <div
                className="flex lg:flex-row flex-col items-center px-4 gap-6 py-3 bg-cover bg-no-repeat bg-center w-full rounded-md"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="lg:w-1/2">
                    {bannerImageUrl ? (
                        <img src={bannerImageUrl} alt={promoData?.banner?.title || "Banner"} />
                    ) : (
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
                            <span>Banner Image</span>
                        </div>
                    )}
                </div>
                <div className="lg:w-1/2 w-full aspect-video">
                    <iframe
                        className="w-full h-full rounded-xl shadow-lg border-0"
                        src={videoUrl}
                        title={promoData?.video?.title || "YouTube video"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default HomeVideo;