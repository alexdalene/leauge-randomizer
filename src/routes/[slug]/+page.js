import * as db from '$lib/db/champion.json';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const data = Object.values(db);

	if (params.slug === 'all') {
		return {
			champions: await data[0]
		};
	}

	const champions = await data[0].filter((champion) => champion.position.includes(params.slug));

	return {
		champions
	};
}
