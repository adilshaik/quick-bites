import Image from 'next/image';
import { useState, useEffect } from 'react';

const Featured = () => {
  const [index, setIndex] = useState(0);
  const images = [
    'https://images.unsplash.com/photo-1642523238928-756a81578f57?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1642425149525-6db4d5305bd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
    'https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
  ];

  const handleArrow = (direction) => {
    if (direction === 'l') {
      setIndex(index !== 0 ? index - 1 : 2);
    }
    if (direction === 'r') {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };

  useEffect(() => {
    const lastIndex = images.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, images]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);

    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <div
      className='realtive overflow-hidden'
      style={{ height: 'calc(100vh - 100px)', backgroundColor: '#d1411e' }}
    >
      <div
        className='absolute w-20 h-20 top-0 bottom-0 m-auto cursor-pointer z-10'
        style={{ left: 0 }}
        onClick={() => handleArrow('l')}
      >
        <Image src='/arrowl.png' alt='' layout='fill' objectFit='contain' />
      </div>
      <div
        className='wrapper'
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((img, i) => (
          <div className='imgContainer' key={i}>
            <Image src={img} alt='' layout='fill' objectFit='contain' />
          </div>
        ))}
      </div>
      <div
        className='absolute w-20 h-20 top-0 bottom-0 m-auto cursor-pointer z-10'
        style={{ right: 0 }}
        onClick={() => handleArrow('r')}
      >
        <Image src='/arrowr.png' layout='fill' alt='' objectFit='contain' />
      </div>
      <style jsx>{`
        .wrapper {
          width: 300vw;
          height: 100%;
          display: flex;
          transition: all 1.5s ease-in-out;
        }

        .imgContainer {
          width: 100vw;
          height: 100%;
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default Featured;
