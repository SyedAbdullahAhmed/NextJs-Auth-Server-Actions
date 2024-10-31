// create a form using useActionState and on backend do save data in aaray form cookies
"use client"

import { useActionState, useState } from "react";
import handleLogin from "../login/actions";
import { useFormStatus } from "react-dom";

export default function Login() {
    const { pending } = useFormStatus()
    const [state , actionState] = useActionState(handleLogin,undefined)
  
  return (
    <div className="flex justify-center items-center h-screen">
      <form action={actionState} className="bg-gray-100 p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 1rounded hover:bg-blue-600"
        >
         { pending ? "..." : "Login" }
        </button>
      </form>
    </div>
  );
}
