"use client"
import { getRepositories } from "../api/repository";
import { useState } from "react";

export default function GetRepositories ({userId}:{userId:string}) {
    const [message, setMessage] = useState("");

        async function handleRepos () {
            try { 
                const response = await getRepositories(userId)
                console.log(response)
                setMessage("fetched successfully")
            } catch (error) {
                setMessage("Failed to fetch repositories."); 
                console.log(error) 
            }
        }
        return (
            <div>
                My repos
                <button onClick={handleRepos}>Click for me</button>
                {
                    message && <h1>{message}</h1>
                }
            </div>
        )
}