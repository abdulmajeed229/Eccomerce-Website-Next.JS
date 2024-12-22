"use client"; 
import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; 
import { db } from "@/app/lib/firebase"; 
import { doc, getDoc } from "firebase/firestore";
import Header from "../componets/header";
import { FaStar } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth } from "@/app/lib/firebase"; 

export default function ProductDetail() {
  const params = useParams();
  const { id } = params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  

  // Authentication state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });

    return () => unsub(); // Clean up subscription on unmount
  }, []);

  
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const router = useRouter();

  const addToCart = () => {
    if (user) {
      if (product) {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingProduct = cart.find(item => item.id === product.id);
        
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        router.push('/cart');
      }
    } else {
      setIsModalOpen(true); 
    }
  };

  
  function userAlert(){

    alert('Please Login First')
  }

  if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <>
      <Header/>
      <div className="font-sans bg-white">
        <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6 rounded-lg">
            <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
              <div className="px-4 py-10 rounded-lg shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                <img src={product.imageUrl} alt="Product" className="w-[350px] rounded object-cover mx-auto" />
              </div>
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-extrabold text-gray-800">{product.productName
              }</h2>
              <div className="flex space-x-2 mt-4">
                <FaStar color="blue" size={21} />
                <FaStar color="blue" size={21} />
                <FaStar color="blue" size={21} />
                <FaStar color="blue" size={21} />
                <FaStar color="grey" size={21} />
                <h4 className="text-gray-800 text-base">500 Reviews</h4>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <p className="text-gray-800 text-3xl font-bold">{`$${product.price}`}</p>
                <p className="text-gray-400 text-base"><strike>$1500</strike> <span className="text-sm ml-1">Tax included</span></p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                {user ? (
                  <button 
                    type="button" 
                    className="min-w-[200px] px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded"
                    onClick={addToCart}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button 
                    type="button" 
                    disabled 
                    className="min-w-[200px] px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded"
                   onMouseOver={userAlert}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
            <h3 className="text-xl font-bold text-gray-800">Product information</h3>
            <p className="mt-3">{product.description}</p>
          </div>
          {/* Reviews Section */}
          <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
           
            <div className="grid md:grid-cols-2 gap-12 mt-4">
              <div className="space-y-3">
                {/* Review ratings */}
              </div>
            </div>
          </div>
        </div>
      </div>

    
    </>
  );
}
