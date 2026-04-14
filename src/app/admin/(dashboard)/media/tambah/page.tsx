import MediaCreateWizard from "../../../../../components/admin/MediaCreateWizard";

function resolveType(value: string | undefined) {
	if (value === "article" || value === "video" || value === "journal" || value === "bulletin" || value === "monograph") {
		return value;
	}

	return null;
}

export default async function AddMediaPage({
	searchParams,
}: {
	searchParams: Promise<{ type?: string }>;
}) {
	const { type } = await searchParams;
	return <MediaCreateWizard initialType={resolveType(type)} />;
}