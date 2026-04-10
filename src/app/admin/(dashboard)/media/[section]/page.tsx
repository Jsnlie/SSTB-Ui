import MediaSectionManager from "../../../../../components/admin/MediaSectionManager";

export default async function MediaSectionPage({
	params,
}: {
	params: Promise<{ section: string }>;
}) {
	const { section } = await params;
	return <MediaSectionManager section={section} mode="list" />;
}
