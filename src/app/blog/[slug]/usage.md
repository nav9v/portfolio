## Blog Structure OverviewYour blog system uses a **file-based approach** where blog posts are stored as Markdown/MDX files in the blog directory and automatically processed into web pages.

## Frontmatter (The YAML Header)

The section you mentioned at the top of each blog post is called **frontmatter**:

```yaml
---
title: "My Awesome First Post"
publishedAt: "2025-06-05" 
summary: "A brief summary of this fantastic first post."
---
```

This is **YAML metadata** that defines:
- `title`: The blog post title
- `publishedAt`: Publication date (used for sorting)
- `summary`: Brief description (shown on blog listing page)
- `image` (optional): Featured image for the post

## How the Blog System Works

### 1. **File Processing** (src/lib/blog.ts)

The `blog.ts` file contains the core logic:

- **`getPostFilePaths()`**: Scans the blog directory for `.md` and `.mdx` files
- **`getPostBySlug()`**: Reads a specific blog post file, extracts frontmatter using `gray-matter`, and converts Markdown to HTML
- **`getAllPosts()`**: Gets all blog posts, validates metadata, and sorts by publication date
- **`markdownToHTML()`**: Converts Markdown content to HTML using unified/remark/rehype processors

### 2. **Blog Listing Page** (src/app/blog/page.tsx)

This page:
- Calls `getAllPosts()` to get all blog posts
- Displays them in a grid with title, date, and summary
- Each post links to `/blog/[slug]`

### 3. **Individual Blog Post Page** ([src/app/blog/[slug]/page.tsx](src/app/blog/[slug]/page.tsx))

This dynamic route:
- Uses `getPostBySlug()` to fetch the specific post
- Generates SEO metadata using `generateMetadata()`
- Renders the post with table of contents sidebar

### 4. **Blog Components**

- **`BlogPostContent`**: Renders the HTML content with prose styling
- **`BlogPostTocSidebar`**: Shows table of contents sidebar (only if multiple headings exist)
- **`ScrollSpyToc`**: Handles scroll-spy functionality for active heading highlighting

## Data Flow

```
content/blog/my-first-post.mdx
         ↓
    gray-matter extracts frontmatter + content
         ↓
    unified/remark converts Markdown → HTML
         ↓
    BlogPost interface with metadata + contentHtml
         ↓
    Rendered on blog pages
```

## Key Features

1. **Static Generation**: Uses `generateStaticParams()` for pre-rendering blog posts
2. **SEO Optimization**: Automatic meta tags, Open Graph, and JSON-LD structured data
3. **Table of Contents**: Auto-generated from headings with scroll-spy
4. **Responsive Design**: Works on desktop and mobile
5. **Error Handling**: Graceful fallbacks for missing posts or invalid metadata

## File Naming Convention

- Blog post files: `content/blog/my-post-slug.mdx`
- URL becomes: `/blog/my-post-slug`
- The filename (without extension) becomes the slug

This system provides a complete blog solution with modern features like static generation, SEO optimization, and interactive navigation!