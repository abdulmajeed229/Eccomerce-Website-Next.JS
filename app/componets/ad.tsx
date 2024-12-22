"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AdD() {
  const [imageIndex, setImageIndex] = useState(0);
  const images = ['/boy.png', '/lap.png', '/chair.jpeg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 py-10 h-screen">
      <div className="p-10 flex-1 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
        Shop the Best Deals  <br /> 
        </h1>
        <p className="text-lg text-gray-600 mb-6">
        where you can find everything you need to upgrade your home, gadgets, and wardrobe!
        </p>
        <button className="inline-block px-8 py-4 border-2 border-gray-800 text-gray-800 font-semibold rounded-lg shadow-lg hover:bg-gray-800 hover:text-white hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-800 transition-all duration-300 transform hover:scale-105">
 Explore Store  ➤ 
</button>
      </div>

      <div className="flex-1 flex justify-center">
        <Image
          src={images[imageIndex]}
          alt="Customized Printed Tees"
          width={600}
          height={700}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
