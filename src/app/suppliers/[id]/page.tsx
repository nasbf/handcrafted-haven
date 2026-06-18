import Footer from "@/components/footer";
import Header from "@/components/header";
import { getAllSellers } from "@/services/sellerService";


type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SupplierDetailsPage({
  params,
}: Props) {

  const {id} = await params;
  const { data: sellers } = await getAllSellers();

  const supplier = sellers?.find(
    (seller) => seller.id === id
  );
  if (!supplier) {
    return (
      <main className="p-10">
        <h1 className="text-3xl font-bold">
          Seller not found
        </h1>
      </main>
      );
  }

  return (
    <main className="min-h-screen">
      <Header />

      <h1 className="text-3xl font-bold">
        Seller Details
      </h1>
      
      <div className="mt-6 border rounded-lg p-6 max-w-md">
      <h2 className="text-2xl font-bold mb-4">
        {supplier.shop_name}
      </h2>

      <p>
        <strong>Bio:</strong> {supplier.bio}
      </p>

      <p>
        <strong>Location:</strong> {supplier.location}
      </p>

      <p>
        <strong>Website:</strong> {supplier.website}
      </p>
    </div>
    <Footer />
    </main>
  );
}
