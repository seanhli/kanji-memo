import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BackgroundAnimation from './animations/backgroundAnimation';
import SideMenu from './sideMenu';
import MainDisplay from './mainDisplay';
import LandingPage from "./landing";
import Recognition from './modes/recognition';
// import Challenge from './modes/challenge';
import Pairings from './modes/pairings';
import Comprehension from './modes/comprehension';
import { useGetGradeNKanjiQuery, useGetJoyoKanjiQuery } from './store/kanjiAPI';
import { useDispatch } from 'react-redux';
import { createKanjiLists } from './store/kanji/kanjiLists';

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false)
  const levels = [useGetGradeNKanjiQuery(1).data,
    useGetGradeNKanjiQuery(2).data,
    useGetGradeNKanjiQuery(3).data,
    useGetGradeNKanjiQuery(4).data,
    useGetGradeNKanjiQuery(5).data,
    useGetGradeNKanjiQuery(6).data,
    useGetJoyoKanjiQuery().data
  ]

  //create master kanji lists
  const beg_data = levels[0] && levels[1] ? [...levels[0]].concat([...levels[1]]) : ['loading']
  const int_data = levels[2] && levels[3] && levels[4] && levels[5] ? [...levels[2]].concat([...levels[3]]).concat([...levels[4]]).concat([...levels[5]]) : ['loading']
  const adv_data = levels[6] ? [...levels[6]] : ['loading']

  useEffect(()=> { // eslint-disable-line
    if (!levels.some((element) => {return element === undefined}) && !loaded) {
      const input = [beg_data,int_data,adv_data]
      const action = createKanjiLists(input)
      dispatch(action)
      setLoaded(true)
    }
  })

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/">
            <Route index element={<LandingPage/>}/>
            <Route path="home" element={<><SideMenu/><MainDisplay/></>}>
              {/* <Route path="challenge" element={loaded ? <Challenge/> : <></>}/> */}
              <Route path="recognition" element={loaded ? <Recognition/> : <></>}/>
              <Route path="comprehension" element={loaded ? <Comprehension/> : <></>}/>
              <Route path="pairings" element={loaded ? <Pairings/> : <></>}/>
            </Route>
          </Route>
        </Routes>
      </main>
      <BackgroundAnimation/>
    </BrowserRouter>
  )
}

export default App;
