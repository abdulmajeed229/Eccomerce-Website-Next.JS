"use client";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { Heart, Star } from "lucide-react";


const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(shuffleArray(productsList)); // Shuffle the products before setting the state
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="font-[sans-serif] p-4 mx-auto lg:max-w-7xl sm:max-w-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-3 gap-4">
        {products.slice(0, 4).map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl p-3 cursor-pointer hover:-translate-y-2 transition-all relative"
          >
            <div className="absolute top-3 right-3 flex space-x-2">
              <Heart className="w-5 h-5 text-gray-500 hover:text-red-500 transition-colors cursor-pointer" />
            </div>

            <div className="w-5/6 h-[150px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-3">
              <img
                src={product.imageUrl || "https://via.placeholder.com/150"}
                alt={product.title || "Product Image"}
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <h3 className="text-md font-bold text-gray-800">
                {product.productName?.length > 25
                  ? `${product.productName.slice(0, 25)}...`
                  : product.productName || "Product Title"}
              </h3>

              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < (product.rating || 3)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <h4 className="text-sm text-gray-800 font-semibold mt-2">
                ${product.price || "N/A"}
              </h4>
              <Link
                href={`/${product.id}`}
                className="h-[35px] flex justify-center items-center mt-3  text-center text-white bg-blue-500 px-3 py-1  text-sm rounded hover:bg-blue-600 transition-all"
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
