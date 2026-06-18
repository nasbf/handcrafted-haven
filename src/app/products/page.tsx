import Footer from "@/components/footer";
import Header from "@/components/header";
import ProductBrowser from "@/components/ProductBrowser";

const products = [
  {
    id: 1,
    name: "Woven Market Basket",
    description:
      "A sturdy handwoven basket for shopping, storage, or display.",
    image: "/images/Woven-Market-Basket.png"
  },
  {
    id: 2,
    name: "Clay Flower Vase",
    description:
      "A simple ceramic vase shaped and finished by hand.",
    image: "/images/Clay-Flower-Vase.png"
  },
  {
    id: 3,
    name: "Carved Wooden Spoon",
    description:
      "A smooth kitchen spoon made from natural wood.",
    image: "/images/Carven-Wooden-Spoon.png"
  },
  {
    id: 4,
    name: "Embroidered Linen Towel",
    description:
      "A soft towel with colorful stitched details.",
    image: "/images/Embroidered-Linen-Towel.png"
  },
  {
    id: 5,
    name: "Beaded Bracelet",
    description:
      "A lightweight bracelet made with hand-selected beads.",
    image: "/images/Beaded-Bracelet.png"
  },
  {
    id: 6,
    name: "Painted Trinket Dish",
    description:
      "A small dish for jewelry, keys, or everyday keepsakes.",
    image: "/images/Painted-Trinket-Dish.png"
  },
];

export default function ProductsPage() {
  return (
    <main>
      <Header />

      <section className="text-center py-16 px-6">
        <h2 className="text-5xl font-bold mb-6">
          Products
        </h2>

        <p className="text-lg max-w-4xl mx-auto">
          Browse simple handcrafted items from local makers.
        </p>
      </section>

      <ProductBrowser products={products} />

      <Footer />
    </main>
  );
}
