import React from 'react'

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  alt?: string
  width?: number | string
  height?: number | string
}

/**
 * Simple optimized image component with:
 * - Lazy loading
 * - Responsive image support
 * - Aspect ratio to prevent layout shift
 */
export function ImageWithFallback({ 
  src, 
  alt, 
  width,
  height,
  className,
  style,
  ...rest 
}: ImageWithFallbackProps) {
  return (
    <img
      src={src}
      alt={alt || 'Image'}
      className={className}
      style={{
        ...style,
        width: width ? (typeof width === 'string' ? width : `${width}px`) : '100%',
        height: height ? (typeof height === 'string' ? height : `${height}px`) : 'auto',
        aspectRatio: width && height ? `${width} / ${height}` : undefined,
      }}
      loading="lazy"
      decoding="async"
      {...rest}
    />
  )
}
