import { Link, Outlet } from "react-router-dom"
const Layout = () => {
  return (
    <>
        <div className="navi">
                <Link to="/">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/form">PropertyForm</Link>
                <Link to="/list">PropertyList</Link>
        </div>

        <div>
            <Outlet/>
        </div>
        
    </>
  )
}

export default Layout
