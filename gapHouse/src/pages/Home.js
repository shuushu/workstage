import { useEffect } from "react"
import getData from '../components/Map'
export default function Home() {
    useEffect(() => {
        getData();
    }, [])
    return (
        <div>321</div>
    )
}