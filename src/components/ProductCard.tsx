"use client";

import { useState } from "react";
import { reviews } from "@/data/review";
import ReviewForm from "./ReviewForm";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface Review {
  name: string;
  rating: number;
  comment: string;
}

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const defaultReview =
    reviews[product.id as keyof typeof reviews];

  const [userReviews, setUserReviews] = useState<Review[]>(
    () => {
      if (typeof window === "undefined") {
        return [];
      }

      return JSON.parse(
        localStorage.getItem(`reviews-${product.id}`) || "[]"
      ) as Review[];
    }
  );
  const [showReviewForm, setShowReviewForm] =
    useState(false);

  return (
    <article className="rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition">
      <div className="relative h-[230px] w-full">
        <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
        />
        </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">
          {product.name}
        </h3>

        <p className="text-gray-600 mb-4">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-500">
            ★★★★★
          </span>

          <span className="text-sm text-gray-600">
            {defaultReview?.rating ?? "New"} (
            {(defaultReview?.reviewCount ?? 0) +
              userReviews.length}{" "}
            reviews)
          </span>
        </div>

        {/* Default Reviews */}
        {defaultReview?.comments.map(
          (review, index) => (
            <div
              key={index}
              className="border-t pt-3 mt-3"
            >
              <p className="font-medium text-sm">
                {review.name}
              </p>

              <p className="text-yellow-500 text-sm">
                {"★".repeat(review.rating)}
              </p>

              <p className="text-sm text-gray-600 italic">
                &quot;{review.comment}&quot;
              </p>
            </div>
          )
        )}

        {/* User Reviews */}
        {userReviews.map((review, index) => (
          <div
            key={`user-${index}`}
            className="border-t pt-3 mt-3"
          >
            <p className="font-medium text-sm">
              {review.name}
            </p>

            <p className="text-yellow-500 text-sm">
              {"★".repeat(review.rating)}
            </p>

            <p className="text-sm text-gray-600 italic">
              &quot;{review.comment}&quot;
            </p>
          </div>
        ))}

        <button
          onClick={() =>
            setShowReviewForm(!showReviewForm)
          }
          className="mt-4 bg-[#53483c] text-white px-4 py-2 rounded hover:opacity-90"
        >
          {showReviewForm
            ? "Go Back"
            : "Leave a Review"}
        </button>

        {showReviewForm && (
          <ReviewForm
            productId={product.id}
            onReviewAdded={(review) => {
              setUserReviews((prev) => [
                ...prev,
                review,
              ]);

              setShowReviewForm(false);
            }}
          />
        )}
      </div>
    </article>
  );
}
