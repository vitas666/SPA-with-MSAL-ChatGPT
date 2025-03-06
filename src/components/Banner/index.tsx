import './style.css';
import React from 'react';

type ButtonLink = {
    internalLink: string;
    target?: string;
    linkText: string;
};

type Button = {
    link: ButtonLink;
};

type ImageObject = {
    diImage: {
        image: {
            defaultHost: string;
            endpoint: string;
            name: string;
        };
    };
    alt: string;
};

type Content = {
    imageObject?: ImageObject;
    title: string;
    heroText: string;
    buttonGroup?: Button[];
};

type BannerProps = {
    content?: Content;
};

const Banner: React.FC<BannerProps> = ({ content }) => {
    if (!content || !content.imageObject) return <div>Loading...</div>;

    // Extract image details
    const { defaultHost, endpoint, name } = content.imageObject.diImage.image;
    const imageUrl = `https://${defaultHost}/i/${endpoint}/${name}`;

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            {/* Display Image */}
            <img 
                src={imageUrl} 
                alt={content.imageObject.alt} 
            />

            {/* Title & Hero Text */}
            <h1>{content.title}</h1>
            <p style={{ whiteSpace: "pre-line" }}>{content.heroText}</p>

            {/* Render Buttons */}
            <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px" }}>
                {content.buttonGroup?.map((btn, index) => (
                    <a 
                        key={index}
                        href={btn.link.internalLink}
                        target={btn.link.target || "_self"}
                        style={{
                            padding: "12px 24px",
                            backgroundColor: "#007bff",
                            color: "white",
                            textDecoration: "none",
                            borderRadius: "5px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            display: "inline-block",
                            textAlign: "center",
                            transition: "background 0.3s",
                            minWidth: "180px"
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
                    >
                        {btn.link.linkText}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Banner;
