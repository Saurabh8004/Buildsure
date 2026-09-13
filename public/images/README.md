# Hero Video and Poster Images

This directory contains the hero video and poster images for the homepage hero section.

## Files

- `hero-construction.mp4` - Desktop hero video (to be added)
- `hero-construction-mobile.mp4` - Mobile hero video (to be added)
- `hero-poster.webp` - Desktop poster/fallback image
- `hero-poster-mobile.webp` - Mobile poster/fallback image

## Usage

These images are referenced in `src/config/heroVideo.ts` and used as fallbacks when the video is not available or when `prefers-reduced-motion` is enabled.

## Adding Video

When you have a real construction video, add it to this directory and update the configuration in `src/config/heroVideo.ts`.
