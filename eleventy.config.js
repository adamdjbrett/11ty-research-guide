import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import markdownIt from 'markdown-it';
import markdownItAnchor from "markdown-it-anchor";
import markdownItFootnote from "markdown-it-footnote";
import markdownItAttrs from 'markdown-it-attrs';
import markdownItTableOfContents from "markdown-it-table-of-contents";
import pluginTOC from 'eleventy-plugin-toc';
import PurgeCSS from 'purgecss'; // Import PurgeCSS
import pluginPWA from "eleventy-plugin-pwa-v2";
import yaml from "js-yaml";
import CleanCSS from "clean-css";
import { execSync } from 'child_process';
import pluginFilters from "./_config/filters.js";

export default async function(eleventyConfig) {
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});

	eleventyConfig
		.addPassthroughCopy({
			"./public/": "/"
		})
		.addPassthroughCopy("./content/feed/pretty-atom-feed.xsl");

	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");
	eleventyConfig.addBundle("css", {
		toFileDirectory: "dist",
	});
	eleventyConfig.addBundle("js", {
		toFileDirectory: "dist",
	});
	eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
	});

 
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed/feed.xml",
		stylesheet: "pretty-atom-feed.xsl",
		templateData: {
			eleventyNavigation: {
				key: "Feed",
				order: 4
			}
		},
		collection: {
			name: "texts",
			limit: 10,
		},
		metadata: {
			language: "en",
			title: "Title",
			subtitle: "Sub title",
			base: "https://example.com/",
			author: {
				name: "Your Name"
			}
		}
	});


	  eleventyConfig.on('eleventy.after', () => {
		execSync(`npx pagefind --site _site --glob \"**/*.html\"`, { encoding: 'utf-8' })
	  })

	eleventyConfig.addBundle("css", {
		toFileDirectory: "dist",
	});
	eleventyConfig.addBundle("js", {
		toFileDirectory: "dist",
	});
//	  eleventyConfig.amendLibrary("md", mdLib => {
//		mdLib.use(markdownItAnchor, {
//			permalink: markdownItAnchor.permalink.ariaHidden({
//				placement: "after",
//				class: "header-anchor",
//				symbol: "",
//				ariaHidden: false,
//			}),
//			level: [1,2,3,4],
//			slugify: eleventyConfig.getFilter("slugify")
//		});
//	});
	  eleventyConfig.addPlugin(pluginTOC, {
		tags: ['h2', 'h3', 'h4', 'h5'],
		  id: 'toci', 
		  class: 'sidebar-nav-item',
		ul: true,
		flat: false,
		wrapper: 'div'
	  })
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
    eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
	eleventyConfig.addPlugin(pluginFilters);
	eleventyConfig.addPlugin(IdAttributePlugin, {
	});

	eleventyConfig.addShortcode("currentBuildDate", () => {
		return (new Date()).toISOString();
	});
};

export const config = {
	templateFormats: [
		"md",
		"njk",
		"html",
		"liquid",
		"11ty.js",
	],
	markdownTemplateEngine: "njk",
	htmlTemplateEngine: "njk",
	dir: {
		input: "content",          // default: "."
		includes: "../_includes",  // default: "_includes" (`input` relative)
		data: "../_data",          // default: "_data" (`input` relative)
		output: "_site"
	},
};

