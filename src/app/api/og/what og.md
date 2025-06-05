# OpenGraph Image Generator API

## Overview
 `/api/og/route.tsx` is a **dynamic OpenGraph image generator** that creates custom 1200x630px social media preview images on-demand using Next.js Edge Runtime.

## Functionality
- **Accepts dynamic parameters** via URL search params (`title`, `description`)
- **Falls back** to config values when no params provided
- **Generates** professional black gradient design with white title, gray description, and domain branding

## Usage Examples
```
https://your-domain.com/api/og                                    // Default homepage
https://your-domain.com/api/og?title=Blog%20Post&description=...  // Custom content
```

## Where It's Used
- **Social Media**: Twitter, LinkedIn, Facebook previews
- **Messaging**: Slack, Discord, WhatsApp link previews  
- **SEO**: Enhanced search results and discovery

its  for social sharing! 🌟