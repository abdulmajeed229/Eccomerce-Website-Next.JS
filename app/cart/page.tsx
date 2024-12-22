"use client"
import { useState, useEffect } from 'react';
import Header from '@/app/componets/header';
import Link from 'next/link';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { db } from '@/app/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

interface CartItem {
  id: string;
  productName: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: ''
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    const updatedCart = cartItems
      .map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
      .filter(item => item.quantity > 0);

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const deleteItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const placeOrder = async () => {
    if (!formData.name || !formData.address || !formData.phone) {
      alert('Please fill in all the details.');
      return;
    }

    const order = {
      items: cartItems,
      total: totalPrice,
      createdAt: new Date(),
      user: formData,
    };

    try {
      await addDoc(collection(db, 'orders'), order);
      alert('Order placed successfully!');
      localStorage.removeItem('cart');
      setCartItems([]);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place the order. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-lg">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center border-b py-4">
                <img src={item.imageUrl} alt={item.productName} className="w-24 h-24 object-cover mb-4 sm:mb-0 sm:mr-4" />
                <div className="flex-grow text-center sm:text-left mb-4 sm:mb-0">
                  <h2 className="text-lg sm:text-xl font-semibold">{item.productName}</h2>
                  <p className="text-gray-600">${(Number(item.price) || 0).toFixed(2)}</p>
                </div>
                <div className="flex items-center mb-4 sm:mb-0">
                  <button
                    className="p-2 bg-gray-200 rounded-full"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <FaMinus className="w-4 h-4" />
                  </button>
                  <span className="mx-3 text-lg">{item.quantity}</span>
                  <button
                    className="p-2 bg-gray-200 rounded-full"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <FaPlus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 p-2"
                  onClick={() => deleteItem(item.id)}
                  aria-label="Delete item"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            ))}
            <div className="mt-6">
              <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
              {isFormVisible ? (
                <div className="mt-4 space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Your Name"
                    className="p-3 border rounded w-full"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    placeholder="Your Address"
                    className="p-3 border rounded w-full"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="Your Phone Number"
                    className="p-3 border rounded w-full"
                  />
                  <button
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                    onClick={placeOrder}
                  >
                    Place Order
                  </button>
                </div>
              ) : (
                <button
                  className="mt-4 w-full px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                  onClick={() => setIsFormVisible(true)}
                >
                  Enter Shipping Information
                </button>
              )}
            </div>
          </>
        )}
        <Link href="/" className="mt-6 inline-block text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    </>
  );
}

