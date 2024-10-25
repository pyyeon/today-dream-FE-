import React from 'react';
import '../styles/global.css';
import '../styles/getpicture.css';
import Button from '../components/Button.tsx';
import { Link } from 'react-router-dom';

function GetPicture() {
  return (
    <div className='background'>
      <img className='examplecat'></img>
      <div id='topblank' />
      <div className='bigbox'>
        <h3>축하드립니다 룰루를 획득하셨습니다..!!
          ㅊㅋㅊㅋ
        </h3>
      </div>
      <Link to={'/mycollection'}>
      <Button
      mode='gotarot'
      name='내 컬렉션 보러가기'
      />
      </Link>
      <div id='buttomblank'/>
    </div>
  );
}

export default GetPicture;