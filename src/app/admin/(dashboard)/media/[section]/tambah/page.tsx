import { redirect } from "next/navigation";

export default async function AddMediaSectionPage({
	params,
}: {
	params: Promise<{ section: string }>;
}) {
	const { section } = await params;
	redirect(`/admin/media/tambah?type=${section}`);
}
