"use client";
import { onAuthStateChanged, User } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { FaShoppingCart, FaSearch, FaBars, FaTimes } from 'react-icons/fa';

interface Product {
  id: string;
  name: string;
}

export default function Header() {
    const [user, setUser] = useState<null | User>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const fetchUserProfile = async () => {
                    try {
                        const docRef = doc(db, "users", currentUser.uid);
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            const userData = docSnap.data();
                            setProfileImage(userData?.profileImage || null);
                        }
                    } catch (error) {
                        console.error("Error fetching user profile: ", error);
                    }
                };

                fetchUserProfile();
            } else {
                setUser(null);
                setProfileImage(null);
            }
        });

        // Fetch products
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(db, "products");
                const productsSnapshot = await getDocs(productsCollection);
                const productsList = productsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Product));
                setProducts(productsList);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();

        return () => unsub();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);

        const filtered = products.filter(product =>
            product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <header className='sticky top-0 bg-white border-b py-3 px-4 sm:px-6 font-[sans-serif] min-h-[75px] tracking-wide z-50'>
            <div className='max-w-screen-xl mx-auto'>
                <div className='flex items-center justify-between'>
                    <Link href={'/'}>
                        <img src="https://th.bing.com/th/id/OIF.gBuXHVEejaXA1Lzg1fbxsA?rs=1&pid=ImgDetMain" alt="logo" className='w-28 sm:w-36' />
                    </Link>

                    <div className="flex items-center space-x-4">
                        <div className='hidden sm:flex bg-gray-50 border border-gray-300 focus-within:bg-transparent focus-within:border-gray-400 rounded-full px-4 py-2.5 overflow-hidden max-w-52 relative'>
                            <input 
                                type='text' 
                                placeholder='Search...' 
                                className='w-full text-sm bg-transparent outline-none pr-2'
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <FaSearch />
                            {searchTerm && filteredProducts.length > 0 && (
                                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-60 overflow-y-auto">
                                    {filteredProducts.map(product => (
                                        <Link href={`/product/${product.id}`} key={product.id}>
                                            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                {product.name}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link href={'/cart'}>
                            <FaShoppingCart size={22} className="text-blue-900 hover:text-[#007bff]" />
                        </Link>

                        {user ? (
                            <Link href={'/profile'}>
                                <img
                                    src={profileImage || "/default-avatar.png"}
                                    className="w-[40px] h-[40px] rounded-full border border-gray-200 object-cover"
                                    alt="User Profile"
                                />
                            </Link>
                        ) : (
                            <Link href={'/sign-in'} className="hidden sm:block">
                                <button className='px-4 py-2 text-sm rounded-full text-white border-2 border-[#007bff] bg-[#007bff] hover:bg-[#004bff]'>
                                    Sign In
                                </button>
                            </Link>
                        )}

                        <button onClick={toggleMenu} className='sm:hidden text-gray-600 hover:text-[#007bff]'>
                            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
                    <nav className="flex flex-col space-y-4">
                        <div className='flex bg-gray-50 border focus-within:bg-transparent focus-within:border-gray-400 rounded-full px-4 py-2.5 overflow-hidden relative'>
                            <input 
                                type='text' 
                                placeholder='Search...' 
                                className='w-full text-sm bg-transparent outline-none pr-2'
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <FaSearch />
                            {searchTerm && filteredProducts.length > 0 && (
                                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-60 overflow-y-auto">
                                    {filteredProducts.map(product => (
                                        <Link href={`/product/${product.id}`} key={product.id}>
                                            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                {product.name}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {!user && (
                            <Link href={'/sign-in'}>
                                <button className='w-full px-4 py-2 text-sm rounded-full text-white border-2 border-[#007bff] bg-[#007bff] hover:bg-[#004bff]'>
                                    Sign In
                                </button>
                            </Link>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
