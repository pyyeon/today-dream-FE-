import React, { ReactNode, useEffect, useState } from "react";
import { GetDreamResponse } from '../interfaces/dream.ts';
import { getDream } from '../services/DreamService.ts';

type TotalDreams = {
  children:ReactNode;
}

const HotDream: React.FC<TotalDreams> = ({ children }) => {

  return (
    <div className='content-box-hotdream'>
      <div className='font-bold content-hotdream'>{children}</div>
      {/* API 요청해서 나온 Json 데이터를 배열에 저장해서 랜덤함수로 돌려서 사용하기*/}
    </div>
  );
}

export default HotDream;