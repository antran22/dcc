import React, { useEffect, useState } from 'react';
import { DCCColors } from '../../../shared/types';
import { c } from '../../../shared/utils/classNameParser';
import styles from './LandingSquares.module.scss';

interface LandingSquareData {
  id: number;
  // In vw
  width: number;
  height: number;
  translateX: number;
  translateY: number;

  color: DCCColors;
  isCenter: boolean;
}
const LandingSquares: React.FC = () => {
  const [squares, setSquares] = useState<LandingSquareData[]>([]);
  useEffect(() => {
    const MAX_WIDTH = 25;
    const MAX_HEIGHT = 25;
    const MIN_WIDTH = 15;
    const MIN_HEIGHT = 15;

    const MAX_TRANSLATE_X = 35;
    const MIN_TRANSLATE_X = 5;

    const MAX_TRANSLATE_Y = 2;
    const MIN_TRANSLATE_Y = 0;

    const getMultiplier = (i: number) => {
      return i % 2 === 0 ? 1 : -1;
    };

    const getRandomColor = () => {
      const colors: DCCColors[] = ['dark-green', 'grey', 'red-soil', 'nude'];
      return colors[Math.floor(Math.random() * 4)];
    };

    const generateSquares = () => {
      const centerSquare: LandingSquareData = {
        id: 0,
        width: 15,
        height: 25,
        translateX: 0,
        translateY: 0,

        color: getRandomColor(),
        isCenter: true,
      };

      const squareArr: LandingSquareData[] = [...Array(4)].map((_, i) => ({
        id: i + 1,
        width: Math.max(Math.random() * MAX_WIDTH, MIN_WIDTH),
        height: Math.max(Math.random() * MAX_HEIGHT, MIN_HEIGHT),

        translateX:
          Math.max(Math.random() * MAX_TRANSLATE_X, MIN_TRANSLATE_X) *
            getMultiplier(i) -
          10,
        translateY:
          Math.max(Math.random() * MAX_TRANSLATE_Y, MIN_TRANSLATE_Y) *
            getMultiplier(i) -
          10,

        color: getRandomColor(),
        isCenter: false,
      }));
      squareArr.push(centerSquare);
      setSquares(squareArr);
    };
    generateSquares();
    const interval = setInterval(() => {
      generateSquares();
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles['landing-squares']}>
      {squares.map(
        ({ id, width, height, translateY, translateX, isCenter, color }) => (
          <div
            key={id}
            className={c([
              styles['landing-squares-center'],
              styles['landing-squares-block'],
              styles[`landing-squares-${color}`],
            ])}
            style={{
              width: `${width}vw`,
              height: `${height}vw`,
              transform: isCenter
                ? 'translate(-50%, -50%)'
                : `translate(${translateX}vw, ${translateY}vw)`,
            }}
          ></div>
        )
      )}
    </div>
  );
};

export default LandingSquares;
