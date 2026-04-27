import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: { unoptimized: true },
  output: process.env.STATIC_EXPORT === '1' ? 'export' : undefined,
  basePath: process.env.STATIC_EXPORT === '1' ? '/ai-tianjin-station' : '',
  assetPrefix: process.env.STATIC_EXPORT === '1' ? '/ai-tianjin-station/' : '',
  trailingSlash: true,
};

export default withMDX(nextConfig);
