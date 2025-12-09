// Keep this file to prevent errors if ImageWithFallback was imported in previous turns, 
// though we aren't using it explicitly in the new code, the system prompt mentions it as protected.
import React, { useState } from 'react';
import { cn } from '../../lib/utils';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const ImageWithFallback = React.forwardRef<HTMLImageElement, ImageWithFallbackProps>(
  ({ className, src, alt, fallbackSrc = "https://via.placeholder.com/400", ...props }, ref) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [errored, setErrored] = useState(false);

    const handleError = () => {
      if (!errored) {
        setImgSrc(fallbackSrc);
        setErrored(true);
      }
    };

    return (
      <img
        ref={ref}
        src={imgSrc}
        alt={alt}
        className={cn("", className)}
        onError={handleError}
        {...props}
      />
    );
  }
);

ImageWithFallback.displayName = "ImageWithFallback";
