const { DateTime } = require("luxon"); // Luxon is a JavaScript library for working with dates and times: https://moment.github.io/luxon/

module.exports = function (eleventyConfig) {
	// Copy through these files from src/ to public/ without modifying them.
	eleventyConfig.addPassthroughCopy("./src/css/");
	eleventyConfig.addPassthroughCopy("./src/*.txt");
	
	// Date formatting (human readable)
	// See: https://github.com/moment/luxon/blob/master/docs/formatting.md
  	eleventyConfig.addFilter("humanReadable", dateObj => {
		return DateTime.fromJSDate(dateObj).toFormat("d LLLL y h:mm a ZZZZ");
  	});

	// Date formatting (for URLs)
	// See: https://github.com/moment/luxon/blob/master/docs/formatting.md
  	eleventyConfig.addFilter("URLDate", dateObj => {
    	return DateTime.fromJSDate(dateObj).toFormat("y/LL/dd");
  	});

	// Date formatting (machine readable)
	// See: https://github.com/moment/luxon/blob/master/docs/formatting.md
  	eleventyConfig.addFilter("machineReadable", dateObj => {
    	return DateTime.fromJSDate(dateObj).toISO();
  	});

	// Sets up {% year %}, which returns the current year
	eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

	// COLLECTIONS
	// Creates the collection categorizedPages, which includes every page that has categorizedUnder in its frontmatter.
	eleventyConfig.addCollection("categorizedPages", function (collection) {
		return collection.getAll().filter((item) => item.data.categorizedUnder);
	});
	eleventyConfig.addCollection("taggedPages", function (collection) {
		return collection.getAll().filter((item) => item.data.taggedWith);
	});
	eleventyConfig.addCollection("categories", function (collection) {
		const categorizedPages = collection.getAll().filter((item) => item.data.categorizedUnder);
		const allCategories = [];
		categorizedPages.forEach((page) => {
			allCategories.push(...page.data.categorizedUnder);
		});
		let duplicatesRemoved = [...new Set(allCategories)];
		return duplicatesRemoved.sort();
	});

	eleventyConfig.addFilter("listCategories", function(categorizedPages) {
		// Given a collection where all items have item.data.categorizedUnder
		// This filter will return an array of all categories.
		// You likely want to use this filter like so: {% for item in collections.categorizedPages | listCategories %}
		// That will let you iterate through each category.
		const allCategories = [];
		categorizedPages.forEach((page) => {
			allCategories.push(...page.data.categorizedUnder);
		});
		let duplicatesRemoved = [...new Set(allCategories)];
		return duplicatesRemoved.sort();
		// To integrate capitals and lowercase, add (a, b) => a.localeCompare(b) within sort()
	});

	eleventyConfig.addFilter("listTags", function(taggedPages) {
		// Given a collection where all items have item.data.taggedWith
		// This filter will return an array of all tags.
		// You likely want to use this filter like so: {% for item in collections.taggedPages | listTags %}
		// That will let you iterate through each tag.
		const allTags = [];
		taggedPages.forEach((page) => {
			allTags.push(...page.data.taggedWith);
		});
		let duplicatesRemoved = [...new Set(allTags)];
		return duplicatesRemoved.sort();
		// To integrate capitals and lowercase, add (a, b) => a.localeCompare(b) within sort()
	});

	eleventyConfig.addFilter("categorizedUnder", function(categorizedPages, category) {
		// Given collections.categorizedPages & a category
		// This filter will return an array of all pages that are categorizedUnder that category.
		// Example usage: {% for item in collections.categorizedPages | categorizedUnder("web design") %}
		const relevantPages = [];
		categorizedPages.forEach((page) => {
			if ([...page.data.categorizedUnder].includes(category)) {
				relevantPages.push(page);
			}
		});
		return relevantPages;
	});

	eleventyConfig.addFilter("taggedWith", function(taggedPages, tag) {
		// Given collections.taggedPages & a tag
		// This filter will return an array of all pages that are taggedWith that tag.
		// Example usage: {% for item in collections.taggedPages | taggedWith("web design") %}
		const relevantPages = [];
		taggedPages.forEach((page) => {
			if ([...page.data.taggedWith].includes(tag)) {
				relevantPages.push(page);
			}
		});
		return relevantPages;
	});

	return {
		markdownTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		dir: {
			input: "src",
			output: "public",
		},
	};
	
};
