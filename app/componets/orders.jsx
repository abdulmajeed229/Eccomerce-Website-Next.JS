'use client'

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Loader2 } from 'lucide-react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersCollection);
        const ordersList = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersList);
      } catch (error) {
        setError("Failed to fetch orders: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-4 bg-red-100 text-red-700 rounded-lg shadow">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Orders</h1>
        {orders.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No orders found.</p>
        ) : (
          <>
            {/* Desktop view */}
            <div className="hidden md:block overflow-x-auto rounded-lg shadow">
              <table className="w-full bg-white divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.user?.name || "N/A"}</div>
                        <div className="text-sm text-gray-500">{order.user?.address || "N/A"}</div>
                        <div className="text-sm text-gray-500">{order.user?.phone || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {order.items?.[0]?.imageUrl ? (
                            <img src={order.items[0].imageUrl} alt={order.items[0].productName} className="w-10 h-10 rounded-full mr-3 object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-gray-500">N/A</div>
                          )}
                          <div className="text-sm font-medium text-gray-900">{order.items?.[0]?.productName || "N/A"}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.items?.[0]?.price || "0"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${order.total || "0"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile view */}
            <div className="md:hidden space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Order ID:</span>
                    <span className="text-sm text-gray-900">{order.id}</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-600">Customer:</span>
                    <div className="text-sm text-gray-900">{order.user?.name || "N/A"}</div>
                    <div className="text-xs text-gray-500">{order.user?.address || "N/A"}</div>
                    <div className="text-xs text-gray-500">{order.user?.phone || "N/A"}</div>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-gray-600 mr-2">Product:</span>
                    {order.items?.[0]?.imageUrl ? (
                      <img src={order.items[0].imageUrl} alt={order.items[0].productName} className="w-8 h-8 rounded-full mr-2 object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-gray-500 text-xs">N/A</div>
                    )}
                    <span className="text-sm text-gray-900">{order.items?.[0]?.productName || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Price:</span>
                    <span className="text-sm text-gray-900">${order.items?.[0]?.price || "0"}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                    <span className="text-sm font-medium text-gray-600">Total:</span>
                    <span className="text-sm font-bold text-gray-900">${order.total || "0"}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

