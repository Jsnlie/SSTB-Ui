import MediaSectionManager from "../../../../../../components/admin/MediaSectionManager";

export default async function EditMediaSectionPage({
	params,
}: {
	params: Promise<{ section: string; id: string }>;
}) {
	const { section, id } = await params;
	return <MediaSectionManager section={section} mode="edit" id={id} />;
}
