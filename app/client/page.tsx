"use client"
import AddRepository from "../components/AddRepository";
import { checkForNewIssues } from "../api/issues";

export default function Home () {
    const userId = "4712a51a-12a2-4fa5-951d-3e35b3b177c5";

    const handlefunction = async () => {
        const response = await checkForNewIssues();
        console.log(response)
    }
    return (
        <div>
            Add Repo
            <AddRepository userId={userId}/>
            <button onClick={handlefunction}>Get issues</button>
        </div>
    )
}