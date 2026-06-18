import Footer from "@/components/footer";
import Header from "@/components/header";
import { getFavorites } from "@/services/favoriteService";
import { TEST_USER_ID } from "@/lib/devUser";

type Favorite = {
  id: string;
  products?: {
    title?: string;
    description?: string;
    price?: number;
  } | null;
};

export default async function FavoritesPage() {
  const { data: favorites } = await getFavorites(TEST_USER_ID);

  return (
    <main>
      <Header />

      <section className="text-center py-16 px-6">
        <h2 className="text-5xl font-bold mb-6">Favorites</h2>
        <p className="text-lg max-w-4xl mx-auto">
          Your saved handcrafted items.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 py-10 px-6 gap-8 max-w-6xl mx-auto">
        {favorites?.length ? (
          (favorites as Favorite[]).map((favorite) => {
            const product = favorite.products;

            return (
              <article
                key={favorite.id}
                className="rounded-lg overflow-hidden"
              >
                <div className="h-[230px] bg-[#f5f1eb] flex items-center justify-center text-7xl text-[#53483c]">
                  :)
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">
                    {product?.title}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    {product?.description}
                  </p>

                  <p className="font-semibold">
                    ${product?.price}
                  </p>
                </div>
              </article>
            );
          })
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-600">
              You haven&apos;t added any favorites yet.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
