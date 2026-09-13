// Hero Video Configuration
// This file centralizes all hero video/image configuration
// Making it easy to update the video source later

export const HERO_VIDEO_CONFIG = {
  // Video sources (add real video URL when available)
  video: {
    desktop: '/videos/hero-construction.mp4',
    mobile: '/videos/hero-construction-mobile.mp4',
  },
  
  // Poster/fallback images
  poster: {
    desktop: '/images/hero-poster.webp',
    mobile: '/images/hero-poster-mobile.webp',
  },
  
  // Video settings
  settings: {
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    preload: 'auto',
  },
};
