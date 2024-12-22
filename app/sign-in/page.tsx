"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInUser(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      setLoading(false);
      alert("Logged in Successfully");
      router.push("/");
    } catch (error) {
      setLoading(false);
      alert((error as Error).message);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      <div className="createBgMy h-40 md:h-auto md:w-3/5 bg-cover bg-center"></div>

      <div className="w-full md:w-2/5 flex justify-center items-center p-4 md:p-10">
        <div className="w-full max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Sign In</h1>
          <p className="text-sm md:text-base text-gray-600 mb-6">Enter your details below</p>

          <form onSubmit={signInUser} className="space-y-4">
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
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-sm text-gray-600">Don't have an account?</span>
            <Link href="/sign-up" className="text-red-600 text-sm ml-1 hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

