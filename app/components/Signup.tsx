"use client"
import { useState } from "react";
import { createUser } from "../api/user";

export default function Signup () {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit (formData: FormData) {
        const response = await createUser(formData);

        if(response.error) {
            setMessage(response.error)
            console.log(response.error)
        } else {
            setMessage(response.success as string);
            console.log(response.success)
        }
    }
    return (
        <form action={handleSubmit} className="grid gap-2 p-10 border border-white m-10">
            <input type="text" name="username" placeholder="Enter username" value={username} onChange={(e)=>setUsername(e.target.value)} />
            <input type="email" name="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" name="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button type="submit">Create Account</button>
            {message && <p>{message}</p>}
        </form>
    )
}