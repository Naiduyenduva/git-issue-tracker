import AddRepository from "../components/AddRepository";

export default function Home () {
    const userId = "123";

    return (
        <div>
            Add Repo
            <AddRepository userId={userId}/>
        </div>
    )
}