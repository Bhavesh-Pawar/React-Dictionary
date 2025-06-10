import Dictionary from "./components/Dictionary";
import { BrowserRouter, Route, Routes } from 'react-router'
import Navbar from "./components/NavBar";
import Bookmarks from "./components/Bookmarks";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/React-Dictionary/bookmarks' element={<> <Navbar /> <Bookmarks /> </>} />
      <Route path='/React-Dictionary/*' element={<> <Navbar /> <Dictionary /> </>} />
    </Routes>

  </BrowserRouter>
  )
}

export default App
