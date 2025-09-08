export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return <div>Product Detail Page for ID: {params.id}</div>;
}