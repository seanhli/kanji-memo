import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BackgroundAnimation from './animations/backgroundAnimation';
import LandingPage from "./landing";

function App() {

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/">
            <Route index element={<LandingPage/>}/>
          </Route>
        </Routes>
      </main>
      <BackgroundAnimation/>
    </BrowserRouter>
  )
}

export default App;
