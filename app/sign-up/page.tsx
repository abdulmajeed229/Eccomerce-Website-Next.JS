"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";

function SignUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  async function CreateMy(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        profileImage: profileImage,
        authProvider: "local",
        email: email,
      });

      setLoading(false);
      alert("Account Created Successfully");
      router.push("/");
    } catch (error) {
      setLoading(false);
      alert((error as Error).message);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      <div className="createBgMy h-40 md:h-auto md:w-1/2 bg-cover bg-center"></div>

      <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-10">
        <div className="w-full max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Create an account</h1>
          <p className="text-sm md:text-base text-gray-600 mb-6">Enter your details below</p>

          <form onSubmit={CreateMy} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Enter Profile Img Url"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setProfileImage(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? "Loading..." : "Create Account"}
            </button>
          </form>

          {/* <button className="w-full mt-4 py-2 px-4 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition duration-300 ease-in-out flex items-center justify-center">
            <img src="https://th.bing.com/th/id/R.96c1a6566397efcf7de758fd2a6f116a?rik=LwK4OM1JQPW06A&pid=ImgRaw&r=0" alt="Google Icon" width={28} height={28} className="mr-2" />
            Sign in with Google
          </button> */}

          <div className="text-center mt-6">
            <span className="text-sm text-gray-600">Already have an account?</span>
            <Link href="/sign-in" className="text-red-600 text-sm ml-1 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

