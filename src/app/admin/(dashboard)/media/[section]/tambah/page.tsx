import MediaSectionManager from "../../../../../../components/admin/MediaSectionManager";

export default async function AddMediaSectionPage({
	params,
}: {
	params: Promise<{ section: string }>;
}) {
	const { section } = await params;
	return <MediaSectionManager section={section} mode="create" />;
}
