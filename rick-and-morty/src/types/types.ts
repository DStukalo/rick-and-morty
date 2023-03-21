export type DetailsData = {
	id: number,
	name: string,
	status:	string,
	species:	string,
	type:	string,
	gender:	string,
	origin: {
		name: string
	},
	location:	object,
	image:	string,
	episode:	string[],
	url:	string,
	created:	string,
};

export type CharacterData = {
	info: {
		count: number;
		next: string | null;
		pages: number;
		prev: string | null
	},
	results: DetailsData[]
}
