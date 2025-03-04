import React from 'react';

interface VideoEmbedProps {
    link: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ link }) => {
    return (
        <div className="video-embed flex w-full justify-center">
            <iframe width="1120" height="630" src="https://www.youtube.com/embed/8nv1m-aTCZI?si=UC0tetQFbIYeSDEd?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
    );
};

export default VideoEmbed;