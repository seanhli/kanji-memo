import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BackgroundAnimation from './animations/backgroundAnimation';
import SideMenu from './sideMenu';
import MainDisplay from './mainDisplay';
import LandingPage from "./landing";
import Recognition from './modes/recognition';
import Challenge from './modes/challenge';
import Pairings from './modes/pairings';
import Comprehension from './modes/comprehension';
import { useGetGradeNKajiQuery, useGetJoyoKanjiQuery } from './store/kanjiAPI';
import { useDispatch } from 'react-redux';
import { createKanjiLists } from './store/kanji/kanjiLists';

function App() {
  const dispatch = useDispatch();
  const levels = [useGetGradeNKajiQuery(1).data,
    useGetGradeNKajiQuery(2).data,
    useGetGradeNKajiQuery(3).data,
    useGetGradeNKajiQuery(4).data,
    useGetGradeNKajiQuery(5).data,
    useGetGradeNKajiQuery(6).data,
    useGetJoyoKanjiQuery().data
  ]

  const beg_data = levels[0] && levels[1] && levels[2] ? levels[0].concat(levels[1]).concat(levels[2]) : ['loading']
  const int_data = levels[3] && levels[4] && levels[5] ? levels[3].concat(levels[4]).concat(levels[5]) : ['loading']
  const adv_data = levels[6] ? levels[6] : ['loading']

  useEffect(()=> {
    const input = [beg_data,int_data,adv_data]
    const action = createKanjiLists(input)
    dispatch(action)
  })

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
