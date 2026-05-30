import { CollectionsClient } from "./CollectionsClient";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const firstValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const filter = firstValue(params.filter) ?? null;
  const metal = firstValue(params.metal) ?? null;
  const collection = firstValue(params.collection) ?? null;
  const category = firstValue(params.category) ?? null;
  const occasion = firstValue(params.occasion) ?? null;
  const query = firstValue(params.q) ?? null;

  return (
    <CollectionsClient
      key={[filter, metal, collection, category, occasion, query].join("|")}
      filter={filter}
      metalParam={metal}
      collectionParam={collection}
      categoryParam={category}
      occasionParam={occasion}
      queryParam={query}
    />
  );
}
