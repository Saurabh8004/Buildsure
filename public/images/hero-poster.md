# Hero Poster Images

This directory contains the hero poster images for the homepage hero section.

## Files

- `hero-poster.webp` - Desktop poster/fallback image (1920x1080)
- `hero-poster-mobile.webp` - Mobile poster/fallback image (to be added)

## Usage

These images are used as fallbacks when:
- Video is not available
- `prefers-reduced-motion` is enabled
- Video fails to load

The images are referenced in `src/config/heroVideo.ts`.

## Adding Mobile Poster

Add a mobile-optimized poster image (smaller file size) as `hero-poster-mobile.webp`.
