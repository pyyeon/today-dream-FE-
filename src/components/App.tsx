import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // react-router-dom@^6.3.0
import Home from '../pages/Home.tsx';
import Login from '../pages/Login.tsx';
import MyPage from '../pages/MyPage.tsx';
import Header from './Header.tsx';
import '../styles/global.css';
import Interpretation from '../pages/Interpretation.tsx';
import InterpretationResult from '../pages/InterpretationResult.tsx';
import Loading from '../pages/Loading.tsx';
import FindPassword from '../pages/FindPassword.tsx'
import PasswordReset from '../pages/PasswordReset.tsx';
import SignUp from '../pages/SignUp.tsx';
import MyCollection from '../pages/MyCollection.tsx';
import GetPicture from '../pages/GetPicture.tsx';
import Board from '../pages/Board.tsx';
import BoardDetail from '../pages/BoardDetails.tsx';
import { MemberManager } from '../hooks/MemberManager.tsx';
import { HeaderManager } from '../hooks/HeaderManager.tsx';
import MemberModification from '../pages/MemberModification.tsx';
import { ProfileProvider } from '../hooks/ProfileContext.tsx';
import Footer from './Footer.tsx';
// import TarotResult from '../components/TarotResult.tsx';
import TarotPage from '../pages/Tarot.tsx';
const App = () => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY);
    }
  }, []);

  return (
      <MemberManager>
        <ProfileProvider>
          <BrowserRouter>
            <div id='wrap'>
              <HeaderManager>
                <Header />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path="/interpretation" element={<Interpretation />} />
                  <Route path='/interpretation-result' element={<InterpretationResult />} />
                  <Route path='/login-home' element={<Login />} />
                  <Route path='/loading' element={<Loading />} />
                  <Route path='/mypage' element={<MyPage />} />
                  <Route path='/login-passwordfind' element={<FindPassword />} />
                  <Route path='/login-passwordreset' element={<PasswordReset />} />
                  <Route path='/signup' element={<SignUp />} />
                  <Route path='/mycollection' element={<MyCollection />} />
                  <Route path='/getpicture' element={<GetPicture />} />
                  <Route path='/member-modification' element={<MemberModification />} />
                  <Route path='/board' element={<Board />} />
                  <Route path='/board/:id' element={<BoardDetail />} />
                  <Route path='/preparing' element={<TarotPage />} />
                  {/* <Route path="/tarot-result" element={<TarotResult />} /> */}
                </Routes>
              </HeaderManager>
            </div>
          </BrowserRouter>
        </ProfileProvider>
      </MemberManager>
  );
}

export default App;
