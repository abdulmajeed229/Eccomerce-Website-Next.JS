"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaHome, FaPlus, FaUser, FaSignOutAlt } from "react-icons/fa";
import AddProductForm from "@/app/componets/AddProductForm"; 
import User from "@/app/componets/users";
import FetchOrders from "@/app/componets/orders";
import Image from "next/image"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

export default function AdminPage() {
  const router = useRouter();
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        if (currentUser.uid === "14TdBRbtjAOuSTwNQxcvQ521eFn1") {
          setUser(currentUser);
          setLoading(false); // Authentication check complete, stop loading
        } else {
          router.push("/"); 
        }
      } else {
        router.push("/"); 
      }
    });
  
    return () => unsubscribe();
  }, [router]);

  const logout = async () => {
    try {
      await signOut(auth);
      router.push("/admin-login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const toggleAddProductForm = () => {
    setShowAddProductForm(!showAddProductForm);
  };

  const toggleUser = () => {
    setShowUser(!showUser);
  };

  const toggleOrder = () => {
    setShowOrder(!showOrder);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="spinner-border animate-spin border-t-4 border-blue-500 w-16 h-16 border-8 rounded-full">
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#f7f6f9] h-full min-h-screen font-[sans-serif]">
      <div className="flex items-start">
        <nav id="sidebar" className="lg:min-w-[250px] w-max max-lg:min-w-8">
          <div
            id="sidebar-collapse-menu"
            className="bg-white shadow-lg h-screen fixed top-0 left-0 overflow-auto z-[99] lg:min-w-[250px] lg:w-max max-lg:w-0 max-lg:invisible transition-all duration-500"
          >
            <div className="flex items-center gap-2 pt-6 pb-2 px-4 sticky top-0 bg-white min-h-[64px] z-[100]">
              <a>
                <img
                  src="https://www.logolynx.com/images/logolynx/53/53a96b267e91940d1bdb7ed5c7a5461e.png"
                  alt="logo"
                  width={140}
                  height={40}
                  className="w-[140px]"
                />
              </a>
            </div>
            <div className="py-4 px-4">
              <ul className="space-y-2">
                <li>
                  <button className="text-gray-800 text-sm flex items-center hover:bg-gray-100 rounded-md px-3 py-2.5 transition-all duration-300">
                    <FaHome size={20} color="black" className="mr-3" />
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                      Dashboard
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={toggleAddProductForm}
                    className="text-gray-800 text-sm flex items-center hover:bg-gray-100 rounded-md px-3 py-2.5 transition-all duration-300"
                  >
                    <FaPlus size={20} color="black" className="mr-3" />
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                      Add Product
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={toggleUser}
                    className="text-gray-800 text-sm flex items-center hover:bg-gray-100 rounded-md px-3 py-2.5 transition-all duration-300"
                  >
                    <FaUser size={20} color="black" className="mr-3" />
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                      Users
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={toggleOrder}
                    className="text-gray-800 text-sm flex items-center hover:bg-gray-100 rounded-md px-3 py-2.5 transition-all duration-300"
                  >
                    <FaUser size={20} color="black" className="mr-3" />
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                      Orders
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="text-gray-800 text-sm flex items-center hover:bg-gray-100 rounded-md px-3 py-2.5 transition-all duration-300"
                  >
                    <FaSignOutAlt size={20} color="black" className="mr-3" />
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                      Logout
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <section className="main-content w-full px-6">
          <header className="z-50 bg-[#f7f6f9] sticky top-0 pt-4">
            <div className="flex flex-wrap items-center px-6 py-2 bg-white shadow-md min-h-[56px] rounded-md w-full relative tracking-wide">
              <div className="flex items-center gap-4 py-1 outline-none border-none">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search something..."
                  className="w-full text-sm bg-transparent rounded outline-none"
                />
              </div>
            </div>
          </header>

          <div className="my-6 px-2">
            <div className="flex items-start gap-6 flex-wrap">
              {showAddProductForm && (
                <AddProductForm toggleForm={toggleAddProductForm} />
              )}
              {showUser && <User toggleForm={toggleUser} />}
              {showOrder && <FetchOrders toggleForm={toggleOrder} />}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
