import React, {useState} from 'react';
import Link from 'next/link';

interface BoardData {
    id: string;
    imageUrl: string | null;
    place: string | null;
    date: string | null;
}

const Board: React.FC<{Data: BoardData[]}> = ({Data}) => {
    return(
        <h1>전체</h1>
    );
};

export default Board;