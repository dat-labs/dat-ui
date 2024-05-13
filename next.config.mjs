import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    // Configure `pageExtensions` to include markdown and MDX files
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    // Optionally, add any other Next.js config below
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: [{loader: '@svgr/webpack', options: {icon: true}}],
        });
        return config;
    },
};

const withMDX = createMDX({
    // Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
