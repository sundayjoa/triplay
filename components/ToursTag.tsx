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
};

const TagSelect: React.FC<TagSelectProps> = ({ className, onChange, selectedTag }) => {
    const [selectedMainTag, setSelectedMainTag] = useState<string>('');
    const [selectedSubTag, setSelectedSubTag] = useState<Option | null>(null);

    const handleTagClick = (tag: Option) => {
        if (selectedMainTag === tag.value.cat1){
            setSelectedMainTag(tag.value.cat1);
        } else {
            setSelectedMainTag(tag.value.cat1);
        }
    };

    const handleSubTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const subTag = subTags[selectedMainTag || ''].find(tag => tag.label === event.target.value);
        if (subTag) {
            setSelectedSubTag(subTag);
        }
    };

    return (
        <div className='tours-container'>
            {/* 메인 태그 */}
            <div style={{ display: 'flex', gap: '10px' }}>
                {mainTags.map((tag) => (
                    <button
                        key={tag.label}
                        onClick={() => handleTagClick(tag)}
                        className={`maintag-button ${selectedMainTag === tag.value.cat1 ? 'selected' : ''}`}
                    >
                        {tag.label}
                    </button>
                ))}
            </div>

            {/* 서브 태그 */}
            {selectedMainTag && selectedMainTag !== '' && subTags[selectedMainTag] && (
                <select>        
                    {subTags[selectedMainTag]?.map(tag => (
                        <option key={tag.label} value={tag.label}>
                            {tag.label}
                        </option>
                    ))}
                </select>
            )}

        </div>
    );
};

export default TagSelect;