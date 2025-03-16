import GetRepositories from "@/app/components/GetRepositories"; 

export default function Page () {
    const userId = "4712a51a-12a2-4fa5-951d-3e35b3b177c5"
    return (
        <div>
            <GetRepositories userId={userId}/>
        </div>
    )
}