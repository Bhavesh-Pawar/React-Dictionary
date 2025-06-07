import Dictionary from "./components/Dictionary";
import { BrowserRouter, Route, Routes } from 'react-router'
import Navbar from "./components/NavBar";
import Bookmarks from "./components/Bookmarks";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/bookmarks' element={<> <Navbar /> <Bookmarks /> </>} />
      <Route path='/*' element={<> <Navbar /> <Dictionary /> </>} />
    </Routes>

  </BrowserRouter>
  )
}

export default App
