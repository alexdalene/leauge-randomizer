import * as db from '$lib/db/champion.json';

/** @type {import('./$types').PageLoad} */
export function load() {
	const data = Object.values(db);

	const champions = data[0];

	return {
		champions
	};
}
