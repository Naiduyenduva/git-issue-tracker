import GetRepositories from "@/app/components/GetRepositories"; 

export default function Page () {
    const userId = "123"
    return (
        <div>
            <GetRepositories userId={userId}/>
        </div>
    )
}