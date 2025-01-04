import Fetch from "@11ty/eleventy-fetch";

export default async function () {
	let url = "https://axcora.my.id/wordpress/wp-json/wp/v2/posts";

	let json = await Fetch(url, {
		duration: "1d", // save for 1 day
		type: "json", // we’ll parse JSON for you
	});

	return json;
};
