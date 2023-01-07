import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BackgroundAnimation from './animations/backgroundAnimation';
import SideMenu from './sideMenu';
import MainDisplay from './mainDisplay';
import LandingPage from "./landing";
import Recognition from './modes/recognition';
import Challenge from './modes/challenge';
import Pairings from './modes/pairings';
import Comprehension from './modes/comprehension';

function App() {

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/">
            <Route index element={<LandingPage/>}/>
            {/* add a side bar element for home so all child outlet routes have it too */}
            <Route path="home" element={<><SideMenu/><MainDisplay/></>}>
              <Route path="challenge" element={<Challenge/>}/>
              <Route path="recognition" element={<Recognition/>}/>
              <Route path="comprehension" element={<Comprehension/>}/>
              <Route path="pairings" element={<Pairings/>}/>
            </Route>
          </Route>
        </Routes>
      </main>
      <BackgroundAnimation/>
    </BrowserRouter>
  )
}

export default App;
