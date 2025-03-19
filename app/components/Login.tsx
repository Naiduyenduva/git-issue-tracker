"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if(email == "" && password == "") {
            toast("Enter credentials to login")
            return;
        }
        setLoading(true);
        const response = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        if (response?.error) {
            toast( "Invalid credentials. Please try again.");
        } else {
            toast("Login successful!");
            window.location.href = "/client/dashboard";
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                    <p className="text-gray-600">Log in to your IssueWatch account</p>
                </div>
                
                <form action={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/25 font-medium"
                        >
                           {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>

                    <div className="text-center text-sm">
                        <span className="text-gray-600">Don&apos;t have an account?</span>{" "}
                        <a href="/client/signup" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}