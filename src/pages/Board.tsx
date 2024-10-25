import React, { useEffect, useState } from 'react';
import { useHeaderMode } from '../hooks/HeaderManager.tsx';
import '../styles/board.css';
import SearchBar from '../components/SearchBar.tsx';
import Button from '../components/Button.tsx';
import BoardIndex from '../components/BoardIndex.tsx';
import BoardList from '../components/BoardList.tsx';
import { GetsApiResponse } from '../interfaces/dream.ts';
import { getDreams } from '../services/DreamService.ts';
import Footer from '../components/Footer.tsx';

const Board = () => {
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(10);
    const [keyword, setKeyword] = useState<string | null>(null);
    const { setHeaderMode } = useHeaderMode();
    const [responseDreams, setResponseDreams] = useState<GetsApiResponse | null>(null);

    useEffect(() => {
        setHeaderMode('board');
    }, [])

    // 안에 타입지정 

    const getDreamsAsync = async (page: number, size: number, keyword?: string) => {
        // 비동기는 다 asynic붙여줘야함
        const response = await getDreams(page, size, keyword);
        setResponseDreams(response.data);
    }

    useEffect(() => {
        getDreamsAsync(page, size);
    }, [])

    const searchBtnClickHandler = (page: number, size: number, keyword: string) => {
        getDreamsAsync(page, size, keyword as string);
    }

    const searchOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }

    const datas: any[] = responseDreams?.data || [];
    const boards = datas.map((data) => (<BoardList contentData={data}></BoardList>))

    return (
        <React.Fragment>
            <div className='background-night'>
                <div id='board-main'>
                    <div id='board-searchzone'>
                        <SearchBar
                            value={keyword as string}
                            onChange={searchOnChangeHandler}
                        />
                        <div id='board-searchbtn'>
                            <Button
                                mode='search'
                                name='검색'
                                onClick={() => searchBtnClickHandler(page, size, keyword as string)}
                            >
                            </Button>
                        </div>
                    </div>
                    <BoardIndex />
                    {boards}
                    <div className='board-footer'>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default Board;