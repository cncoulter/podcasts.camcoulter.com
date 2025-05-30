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

	// Date formatting (machine readable)
	// See: https://github.com/moment/luxon/blob/master/docs/formatting.md
  	eleventyConfig.addFilter("machineReadable", dateObj => {
    	return DateTime.fromJSDate(dateObj).toISO();
  	});

	// Sets up {% year %}, which returns the current year
	eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

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
