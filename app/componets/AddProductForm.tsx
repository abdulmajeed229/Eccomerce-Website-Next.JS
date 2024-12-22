"use client"
import React, { useState } from 'react';
import { db } from '@/app/lib/firebase'; // Make sure this points to your Firebase config
import { collection, addDoc } from 'firebase/firestore';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  
  // Example categories
  const categories = ['Electronics', 'Clothing', 'Furniture', ];

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    
    try {
      await addDoc(collection(db, 'products'), {
        productName,
        description,
        price,
        imageUrl,
        category,
      });
      alert('Product added successfully');
      
      setProductName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
      setCategory('');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white w-full p-6 shadow-md rounded-md space-y-4">
      <div>
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="mt-2 p-2 w-full border rounded"
          placeholder="Enter product name"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 p-2 w-full border rounded"
          placeholder="Enter product description"
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-2 p-2 w-full border rounded"
          placeholder="Enter product price"
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="mt-2 p-2 w-full border rounded"
          placeholder="Enter product image URL"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-2 p-2 w-full border rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">Add Product</button>
    </form>
  );
};

export default AddProductForm;
