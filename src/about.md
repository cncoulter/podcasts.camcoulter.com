---
layout: layouts/page.njk
title: About
---

Dozen is a simple starter website for the [Eleventy](https://www.11ty.dev/) (11ty) static site generator. It is my great hope that this site gets used to spin off at least a dozen other websites.

Dozen is bare-bones and unembellished. It only incorporates one plugin (the one for [images](https://www.11ty.dev/docs/plugins/image/)) and it doesn't include any other frameworks. The CSS styling is minimal. It is meant to be a lightweight and accessible foundation upon which to jumpstart your site, and it assumes you will want to style the site yourself and that you're comfortable working in vanilla HTML, CSS, JavaScript, and Nunjucks.

The most complicated part of Dozen is the blog, but it should be simple enough to peel away any functionality you don't need. The idea here is that you shouldn't have to spend any time thinking, "How do I set up this totally normal routine thing?" because it's already set up for you. For example:

* The blog homepage only shows the 2 most recent posts.
* There are two different versions of the blog archive: a paginated one and a single-page version.
* The blog has support for both tags and categories. Again, each of these are set up with both a paginated index as well as a single-page one.
* The blog also supports designating individual authors for different posts. Each author has their own page that lists their bio and posts they've written.

## How it's structured

The config file is `.eleventy.js`. I've commented it up so it should be reasonably clear to understand. Here are some of the key ideas:

* To categorize a post under a particular category, add "categorizedUnder" to the post's front matter.
* To tag a post with a particular tag, add "taggedWith" to the post's front matter.
* The config file sets up the following collections:
	* categorizedPages: every page that has categorizedUnder in its front matter.
	* taggedPages: every page that has taggedWith in its front matter.
	* categories: an array of every category.
	* tags: an array of every tag.
* The categorizedUnder filter will tell you all pages that are categorizedUnder a particular category.
* The taggedWith filter will tell you all pages that are taggedWith a particular tag.
* There are a variety of filters for time that you can adjust (such as humanReadableDateTime, humanReadableDate, and machineReadable).
* Here's how authors are handled:
	* Each author should have a unique code_name, like "cam" for example.
	* Specify the author using their code_name in the post's front matter — for example: `author: cam`.
	* Make an entry for each author in the `people` folder. Set "title" to their name as you want it displayed on the site and "code_name" to their code_name — for example: `code_name: cam`.
	* The authorIs filter will tell you all pages authored by a given author.
	* The personIs filter will help you point to the author's bio and other information.

Here are some other notes about how Dozen is structured:

* Source files live in `src/` and Eleventy builds your project to `public/`.
* The `src/_data/` folder includes
	* `meta.json` which has metadata about the site.
	* `navigation.json` which has the header and footer links.
* The `src/_includes` folder includes
	* `layouts` for page layout options.
	* `partials` for reusable components like the header and footer.
* Photos are kept in the `src/assets/images/` folder.
* Blog posts are kept in the `src/posts` folder.
* Author bios and information are kept in the `src/people` folder.

Dozen includes an Atom feed for the blog, a human readable site map, and an XML site map. The Atom feed and XML site map are templated using Nunjucks and you can adjust those to your liking.

## How to spin off another site

[Fork Dozen on GitHub](https://github.com/cncoulter/dozen) and get hacking! You will probably want to start by:

1. Updating `ReadMe.md`, `package.json`, and `src/_data/meta.json`.
2. Reviewing and possibly editing `.eleventy.js`.
3. Updating `src/index.html`, `src/about.md`, `src/posts`, `src/people/`, and `src/about-this-site.md` with your content.
4. Updating your favicon (see `src/_includes/partials/head.njk`).

If you use Dozen to spin off another site or just find Dozen helpful as a recipe for how to do things in Eleventy, please let me know!