"use client"

import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "@/app/lib/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import Link from "next/link"
import Header from "../componets/header"
import { FaEdit } from "react-icons/fa"

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingName, setEditingName] = useState(false)
  const [editingAddress, setEditingAddress] = useState(false)
  const [newName, setNewName] = useState("")
  const [newAddress, setNewAddress] = useState("")

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            setUser({
              displayName: userData.name || "Guest",
              email: userData.email,
              uid: currentUser.uid,
              photoURL: userData.profileImage || "/default-avatar.png",
              orders: userData.orders || [],
              address: userData.address || "Not specified",
              joinDate: userData.joinDate ? new Date(userData.joinDate.toDate()).toLocaleDateString() : "Unknown",
            })
          } else {
            console.error("No such document!")
            setError("User data not found.")
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
          setError("Error fetching user data.")
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsub()
  }, [])

  const handleLogout = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error("Error signing out:", error)
      setError("Error signing out.")
    }
  }

  const handleSaveChanges = async () => {
    if (newName) {
      await updateDoc(doc(db, "users", user.uid), {
        name: newName,
      })
      setUser((prev) => ({ ...prev, displayName: newName }))
      setEditingName(false)
    }
    if (newAddress) {
      await updateDoc(doc(db, "users", user.uid), {
        address: newAddress,
      })
      setUser((prev) => ({ ...prev, address: newAddress }))
      setEditingAddress(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">My Profile</h1>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
              <p>{error}</p>
            </div>
          )}
          {user ? (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 flex items-center">
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="h-16 w-16 rounded-full mr-4 object-cover"
                />


                <div>
                  <h2 className="text-2xl font-bold">
                  {
                    editingName ? (
                      <input
                        type="text"
                        value={newName || user.displayName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="border rounded p-1"
                      />
                    ) : (
                      <>
                        {user.displayName}
                        <FaEdit
                          onClick={() => setEditingName(true)}
                          className="inline-block ml-2 text-blue-500 cursor-pointer"
                        />
                      </>
                    )}
                  </h2>
                  <p className="text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {editingAddress ? (
                        <input
                          type="text"
                          value={newAddress || user.address}
                          onChange={(e) => setNewAddress(e.target.value)}
                          className="border rounded p-1"
                        />
                      ) : (
                        <>
                          {user.address}
                          <FaEdit
                            onClick={() => setEditingAddress(true)}
                            className="inline-block ml-2 text-blue-500 cursor-pointer"
                          />
                        </>
                      )}
                    </dd>
                  </div>
                
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Recent Orders</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.orders.length > 0 ? (
                        <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                          {user.orders.slice(0, 3).map((order, index) => (
                            <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                              <div className="w-0 flex-1 flex items-center">
                                <span className="ml-2 flex-1 w-0 truncate">Order #{order.id}</span>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <span className="font-medium text-indigo-600 hover:text-indigo-500">
                                  ${order.total.toFixed(2)}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No recent orders</p>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
              {editingName || editingAddress ? (
                <div className="px-4 py-5 sm:px-6">
                  <button
                    onClick={handleSaveChanges}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              ) : null}
              <div className="px-4 py-5 sm:px-6">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <h2 className="text-xl font-bold mb-4">Please log in to view your profile</h2>
              <Link
                href="/sign-in"
                className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                Go to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
