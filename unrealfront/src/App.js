import { Route ,Routes } from "react-router-dom"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Layout from "./components/Layout/Layout"
import PropertyForm from "./components/Properties/PropertyForm"
import PropertyList from "./components/Properties/PropertyList"
import "../src/Csss/index.css"
const App = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Layout/>}>
          <Route index element={<Register/>} />
          <Route path="/login" element={<Login/>}  />
          <Route path="/form" element={<PropertyForm/>}  />
          <Route path="/list" element={<PropertyList/>}  />
          </Route>
        </Routes>
    </div>
  )
}

export default App
