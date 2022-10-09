/** @type {import('next').NextConfig} */
const withImages = require("next-images");
const { withSentryConfig } = require('@sentry/nextjs');
const moduleExports = {
  webpack5: true,
	reactStrictMode: true,
	distDir: "build",
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
	images: {
		domains: ['s2.coinmarketcap.com'],
	},
};

const sentryWebpackPluginOptions = {
  silent: true, 
};
module.exports = withImages();
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
