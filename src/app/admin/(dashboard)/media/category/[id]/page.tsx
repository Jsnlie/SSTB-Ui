import MediaCategoryManager from "../../../../../../components/admin/MediaCategoryManager";

export default async function EditMediaCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <MediaCategoryManager mode="edit" id={Number(id)} />;
}
