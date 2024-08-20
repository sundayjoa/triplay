import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface Option {
    value: string;
    label: string;
  }

  interface RegionSelectProps {
    className?: string;
    onChange: (value: string) => void;
    selectedAreaCode: string;
}
  
  const options: Option[] = [
    { value: '', label: '전체' },
    { value: '1', label: '서울' },
    { value: '6', label: '부산' },
    { value: '4', label: '대구' },
    { value: '2', label: '인천' },
    { value: '5', label: '광주' },
    { value: '3', label: '대전' },
    { value: '7', label: '울산' },
    { value: '8', label: '세종' },
    { value: '31', label: '경기' },
    { value: '32', label: '강원' },
    { value: '33', label: '충북' },
    { value: '34', label: '충남' },
    { value: '35', label: '경북' },
    { value: '36', label: '경남' },
    { value: '37', label: '전북' },
    { value: '38', label: '전남' },
    { value: '39', label: '제주' },
  ];
  
  const CustomDropdown: React.FC<RegionSelectProps> = ({ className, onChange, selectedAreaCode }) => {
    const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
    const [isOpen, setIsOpen] = useState(false);
  
    useEffect(() => {
        const initialOption = options.find(option => option.value === selectedAreaCode) || options[0];
        setSelectedOption(initialOption); // 선택한 지역 코드에 따라 드롭다운 초기화
    }, [selectedAreaCode]);

    const handleOptionClick = (option: Option) => {
      setSelectedOption(option);
      onChange(option.value);
      setIsOpen(false);
    };
  
    return (
      <div className={`regionSelectContainer ${className}`}>
          <FaMapMarkerAlt className='icon' />
          <div className='regionFilter' onClick={() => setIsOpen(!isOpen)}>
              {selectedOption.label}
          </div>
          {isOpen && (
              <div className='dropdownList'>
                  {options.map((option) => (
                      <div
                          key={option.value}
                          className='dropdownItem'
                          onClick={() => handleOptionClick(option)}
                      >
                          {option.label}
                      </div>
                  ))}
              </div>
          )}
      </div>
  );
};
  
  export default CustomDropdown;