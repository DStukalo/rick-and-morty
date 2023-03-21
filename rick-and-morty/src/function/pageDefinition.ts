export function pageDefinition(params: {
	linkToNext: string | null;
	linkToPrev: string | null;
}): number {
	const { linkToPrev, linkToNext } = params;
	const regEx = '=([^=?]+)&';
	const regEx2 = '=([^=?]+)';
	const prevValue = linkToPrev?.match(regEx) ?? linkToPrev?.match(regEx2);
	const nextValue = linkToNext?.match(regEx) ?? linkToNext?.match(regEx2);
	if (prevValue) return (Number(prevValue[1]) + 1);
	if (nextValue) return (Number(nextValue[1]) - 1);
	return 0;
}
