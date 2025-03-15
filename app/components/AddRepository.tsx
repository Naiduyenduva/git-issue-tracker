"use client"

import { useState } from "react"
import { addRepository } from "../api/repository"

export default function AddRepository ({userId}:{userId:string}) {
    const [repoUrl, setRepoUrl] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit (formData: FormData) {
        const response = await addRepository(formData);

        if(response.error) {
            setMessage(response.error)
            console.log(response.error)
        } else {
            setMessage(response.success as string);
            console.log(response.success)
            setRepoUrl("")
        }
    }
    return (
        <form action={handleSubmit} className="flex flex-col gap-3">
        <input
            type="text"
            name="repoUrl"
            placeholder="Enter GitHub repo URL"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            required
        />
        <input type="hidden" name="userId" value={userId} /> {/* Hidden userId field */}
        <button type="submit">Add Repository</button>
        {message && <p>{message}</p>}
        </form>
    );
}