import Footer from "@/components/footer";
import Header from "@/components/header";
import { updateSellerProfile } from "@/services/sellerService";
import { getAllSellers } from "@/services/sellerService";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SupplierDetailsPage({
  params,
}: Props) {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  

  const {id} = await params;
  const { data: sellers } = await getAllSellers();

  const supplier = sellers?.find(
    (seller) => seller.id === id
  );

  if (!supplier) {
    return (
      <main className="min-h-screen">
        <h1 className="text-3xl font-bold">
          Seller not found
        </h1>
      </main>
      );
  }
  async function updateSupplier(formData: FormData) {
    "use server";
    // await updateSellerProfile(id, {
    //   shop_name: formData.get("shop_name"),
    //   bio: formData.get("bio"),
    //   location: formData.get("location"),
    //   website: formData.get("website"),
    // });
    await updateSellerProfile(id, {
      shop_name: formData.get("shop_name"),
      bio: formData.get("bio"),
      location: formData.get("location"),
      website: formData.get("website"),
    });
    redirect("/suppliers");
  }

  return (
    <main className="min-h-screen">
      <Header />

      <h1 className="text-3xl font-bold">
        Edit Seller
      </h1>
      <form action={updateSupplier}
        className="flex flex-col gap-4 max-w-md">
          <div className="flex flex-col">
            <label htmlFor="Shop Name" className="mb-1 font-medium text-[#b89b72]">
              Shop Name
            </label>
            <input
              name="shop_name"
              type="text"
              defaultValue={supplier.shop_name}
              className="border p-2 rounded"
            />
          </div>
        
          <div className="flex flex-col">
            <label htmlFor="Bio" className="mb-1 font-medium text-[#b89b72]">
              Bio
            </label>

            <input
              name="bio"
              type="text"
              defaultValue={supplier.bio}
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="Location" className="mb-1 font-medium text-[#b89b72]">
              Location  
            </label>

            <input
              name="location"
              type="text"
              defaultValue={supplier.location}
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="Website" className="mb-1 font-medium text-[#b89b72]">
              Website
            </label>
            <input
              name="website"
              type="text"
              defaultValue={supplier.website ?? ""}
              className="border p-2 rounded"
            />
          </div>
          
        <button type="submit" className="bg-[#53483c] text-white px-4 py-2 rounded hover:bg-white hover:text-[#53483c]">
          Save Changes
        </button>
      </form>
       <Footer />
    </main>
  );
}
