import React, { useState, useEffect } from "react";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
}

const toWebp = (src: string) => src.replace(/\.(png|jpg|jpeg|JPG)$/i, ".webp");

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  fallbackSrc,
  className,
  loading = "lazy",
  ...props
}) => {
  const hasWebpCandidate = /\.(png|jpg|jpeg|JPG)$/.test(src);
  const [currentSrc, setCurrentSrc] = useState(hasWebpCandidate ? toWebp(src) : src);
  const [triedWebp, setTriedWebp] = useState(hasWebpCandidate);
  const [isLoaded, setIsLoaded] = useState(false);

  // Request the WebP directly on first paint instead of fetching the heavy
  // original and swapping later — avoids downloading both files.
  useEffect(() => {
    const candidate = /\.(png|jpg|jpeg|JPG)$/.test(src);
    setCurrentSrc(candidate ? toWebp(src) : src);
    setTriedWebp(candidate);
    setIsLoaded(false);
  }, [src]);

  return (
    <img
      src={currentSrc}
      className={`${className} transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      loading={loading}
      onLoad={() => setIsLoaded(true)}
      onError={() => {
        if (triedWebp) {
          // WebP doesn't exist on the server — fall back to the original.
          setTriedWebp(false);
          setCurrentSrc(src);
        } else if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
      {...props}
    />
  );
};

export default OptimizedImage;
