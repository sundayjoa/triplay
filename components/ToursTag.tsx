import React, { useState, useEffect } from 'react';
import '@/app/styles/tourstag.css';

interface Option {
    value: {cat1: string; cat2: string; cat3: string};
    label: string;
}

interface TagSelectProps {
    className?: string;
    onChange: (value: {cat1: string; cat2: string; cat3: string}) => void;
    selectedTag: { cat1: string; cat2: string; cat3: string };
}

//메인 태그
const mainTags: Option[] = [
    { value: {cat1: '', cat2: '', cat3:''}, label:'전체' },
    { value: {cat1: 'A01', cat2: '', cat3:''}, label:'자연'},
    { value: {cat1: 'A02', cat2: 'A0201', cat3:''}, label: '역사'},
    { value: {cat1: 'A02', cat2: 'A0202', cat3:''}, label: '휴양'},
    { value: {cat1: 'A02', cat2: 'A0203', cat3:''}, label: '체험'},
    { value: {cat1: 'A02', cat2: 'A0205', cat3:''}, label: '건축/조형물'},
];

//상세 태그
const subTags: { [key: string]: Option[] } = {
    //자연 상세 태그
    'A01':[
        { value: {cat1: 'A01', cat2: '', cat3:''}, label:'#전체' },
        { value: {cat1: 'A01', cat2: 'A0101', cat3:'A01010400'}, label:'#산' },
        { value: {cat1: 'A01', cat2: 'A0101', cat3:'A01010500'}, label:'#생태관광지' },
        { value: {cat1: 'A01', cat2: 'A0101', cat3:'A01010600'}, label:'#휴양림' },
        { value: {cat1: 'A01', cat2: 'A0101', cat3:'A01010700'}, label:'#수목원' },
        { value: {cat1: 'A01', cat2: 'A0101', cat3:'A01010800'}, label:'#폭포' },
        { value: {cat1: 'A01', cat2: 'A0101', cat3:'A01010900'}, label:'#계곡' },
    ],
    //역사 상세 태그
    'A02_A0201':[
        { value: {cat1: 'A01', cat2: 'A0201', cat3:''}, label:'#전체' },
        { value: {cat1: 'A01', cat2: 'A0201', cat3:'A02010100'}, label:'#고궁' },
        { value: {cat1: 'A01', cat2: 'A0201', cat3:'A02010200'}, label:'#성' },
        { value: {cat1: 'A01', cat2: 'A0201', cat3:'A02010300'}, label:'#문' },
        { value: {cat1: 'A01', cat2: 'A0201', cat3:'A02010400'}, label:'#고택' },
        { value: {cat1: 'A01', cat2: 'A0201', cat3:'A02010500'}, label:'#생가' },
        { value: {cat1: 'A01', cat2: 'A0201', cat3:'A02010600'}, label:'#민속마을' },
        { value: {cat1: 'A01', cat2: 'A0201', cat3:'A02010700'}, label:'#유적지/사적지' },
        { value: {cat1: 'A01', cat2: 'A0201', cat3:'A02010800'}, label:'#사찰' },
        { value: {cat1: 'A01', cat2: 'A0201', cat3:'A02010900'}, label:'#종교성지' },
    ],
    //휴양 상세 태그
    'A02_A0202': [
        { value: {cat1: 'A01', cat2: 'A0202', cat3:''}, label:'#전체' },
        { value: {cat1: 'A01', cat2: 'A0202', cat3:'A02020200'}, label:'#관광단지' },
        { value: {cat1: 'A01', cat2: 'A0202', cat3:'A02020300'}, label:'#온천/욕장/스파' },
        { value: {cat1: 'A01', cat2: 'A0202', cat3:'A02020400'}, label:'#이색찜질방' },
        { value: {cat1: 'A01', cat2: 'A0202', cat3:'A02020600'}, label:'#테마공원' },
        { value: {cat1: 'A01', cat2: 'A0202', cat3:'A02020700'}, label:'#공원' },
        { value: {cat1: 'A01', cat2: 'A0202', cat3:'A02020800'}, label:'#유람선' },
    ],
    //체험 상세 태그
    'A02_A0203': [
        { value: {cat1: 'A01', cat2: 'A0203', cat3:''}, label:'#전체' },
        { value: {cat1: 'A01', cat2: 'A0203', cat3:'A02030100'}, label:'#농·어촌 체험' },
        { value: {cat1: 'A01', cat2: 'A0203', cat3:'A02030200'}, label:'#전통체험' },
        { value: {cat1: 'A01', cat2: 'A0203', cat3:'A02030300'}, label:'#산사체험' },
        { value: {cat1: 'A01', cat2: 'A0203', cat3:'A02030400'}, label:'#이색체험' },
        { value: {cat1: 'A01', cat2: 'A0203', cat3:'A02030600'}, label:'#이색거리' },
    ],
    //건축/조형물 상세 태그
    'A02_A0205': [
        { value: {cat1: 'A01', cat2: 'A0205', cat3:''}, label:'#전체' },
        { value: {cat1: 'A01', cat2: 'A0205', cat3:'A02050100'}, label:'#다리' },
        { value: {cat1: 'A01', cat2: 'A0205', cat3:'A02050200'}, label:'#기념탑/전망대' },
        { value: {cat1: 'A01', cat2: 'A0205', cat3:'A02050300'}, label:'#분수' },
        { value: {cat1: 'A01', cat2: 'A0205', cat3:'A02050400'}, label:'#동상' },
        { value: {cat1: 'A01', cat2: 'A0205', cat3:'A02050500'}, label:'#터널' },
        { value: {cat1: 'A01', cat2: 'A0205', cat3:'A02050600'}, label:'#유명건물' },
    ],
};

const TagSelect: React.FC<TagSelectProps> = ({ className, onChange, selectedTag }) => {
    const [selectedMainTag, setSelectedMainTag] = useState<string>('');
    const [selectedSubTag, setSelectedSubTag] = useState<string | null>(null);

    const handleTagClick = (tag: Option) => {
        const selectedKey = tag.value.cat1 + (tag.value.cat2 ? '_' + tag.value.cat2 : '');

        if (selectedMainTag !== selectedKey) {
            setSelectedMainTag(selectedKey);
            setSelectedSubTag(null);
        }

    };

    const handleSubTagClick = (subTag: Option) => {
        setSelectedSubTag(subTag.value.cat3);
    };

    useEffect(() => {
        if(!selectedSubTag && selectedMainTag){
            const initialSubTags = subTags[selectedMainTag];
            if(initialSubTags && initialSubTags.length > 0) {
                setSelectedSubTag(initialSubTags[0].value.cat3);
            }
        }
    }, [selectedMainTag])

    return (
        <div className='tours-container'>
            {/* 메인 태그 */}
            <div className='maintag-button-container'>
                {mainTags.map((tag) => {
                    const selectedKey = tag.value.cat1 + (tag.value.cat2 ? '_' + tag.value.cat2 : '');
                    return (
                        <button
                            key={tag.label}
                            onClick={() => handleTagClick(tag)}
                            className={`maintag-button ${selectedMainTag === selectedKey ? 'selected' : ''}`}
                        >
                            {tag.label}
                        </button>
                    );
                })}
            </div>

            {/* 서브 태그 */}
            {selectedMainTag && selectedMainTag !== '' && subTags[selectedMainTag] && (
                <div className="subtag-button-container">        
                    {subTags[selectedMainTag]?.map(subTag => (
                        <button key={subTag.label} 
                        onClick={() => handleSubTagClick(subTag)}
                        className={`subtag-button ${selectedSubTag === subTag.value.cat3 ? 'selected' : ''}`}>
                            {subTag.label}
                        </button>
                    ))}
                </div>
            )}

        </div>
    );
};

export default TagSelect;