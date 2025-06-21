import Dictionary from "./components/Dictionary";
import { HashRouter as Router, Route, Routes } from 'react-router'
import Navbar from "./components/NavBar";
import Bookmarks from "./components/Bookmarks";

function App() {

  return (
    <Router>
    <Routes>
      <Route path='/bookmarks' element={<> <Navbar /> <Bookmarks /> </>} />
      <Route path='/*' element={<> <Navbar /> <Dictionary /> </>} />
    </Routes>

  </Router>
  )
}

export default App
