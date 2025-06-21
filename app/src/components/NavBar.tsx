import { Link } from "react-router"

function Navbar() {
    return (
        <>
            <Link className="text-blue-500 font-underline ms-2" to={"/"}>Home</Link>
            <Link className="text-blue-500 font-underline ms-2" to={"/bookmarks"}>Bookmarks</Link>
        </>

    )
}

export default Navbar