import React, { useState } from 'react';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';

/* 데이터 패칭기능이 없이 임시로 만든 버튼입니다. Todo : fetch here  */
const FavoriteButton: React.FC = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prevState) => !prevState);
  };

  return (
    <button onClick={toggleFavorite}>
      {isFavorite ? (
        <StarFilledIcon className='w-5 h-5' />
      ) : (
        <StarIcon  className='w-5 h-5' />
      )}
    </button>
  );
};

export default FavoriteButton;