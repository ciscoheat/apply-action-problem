import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load = (async () => {
	return { message: 'Page loaded at ' + new Date().toISOString() };
}) satisfies PageServerLoad;

export const actions = {
	default: async () => {
		return { message: 'Posted at ' + new Date().toISOString() };
	}
} satisfies Actions;
