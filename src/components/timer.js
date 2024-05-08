import React, {useState, useEffect, useRef} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import FlipNumber from './flip-number';
import Separator from './flip-number/separator';

import TransformUtils from '../utils';
import style from './style';

const Timer = ({
  time,
  play,
  wrapperStyle,
  flipNumberProps,
  onComplete,
  showCircles,
}) => {
  const [timeState, setTimeState] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const timerRef = useRef(null); // Use a ref to keep track of the timer

  useEffect(() => {
    const {hours, minutes, seconds} = TransformUtils.formatNumberToTime(time);
    setTimeState({hours, minutes, seconds});
  }, [time]);

  useEffect(() => {
    if (play) {
      timerRef.current = setInterval(updateTime, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [play]);

  const updateTime = () => {
    setTimeState(prevState => {
      let {hours, minutes, seconds} = prevState;

      if (seconds > 0) {
        seconds -= 1;
      } else if (minutes > 0) {
        minutes -= 1;
        seconds = 59;
      } else if (hours > 0) {
        hours -= 1;
        minutes = 59;
        seconds = 59;
      } else {
        clearInterval(timerRef.current);
        if (onComplete) onComplete();
        return prevState;
      }

      return {hours, minutes, seconds};
    });
  };

  const {hours, minutes, seconds} = timeState;

  return (
    <View style={[style.wrapper, wrapperStyle]}>
      <FlipNumber number={hours} unit="hours" {...flipNumberProps} />
      <Separator showCircles={showCircles} />
      <FlipNumber number={minutes} unit="minutes" {...flipNumberProps} />
      <Separator showCircles={showCircles} />
      <FlipNumber number={seconds} unit="seconds" {...flipNumberProps} />
    </View>
  );
};

Timer.propTypes = {
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  play: PropTypes.bool,
  wrapperStyle: PropTypes.object,
  flipNumberProps: PropTypes.shape({
    size: PropTypes.number,
    perspective: PropTypes.number,
    numberWrapperStyle: PropTypes.object,
    cardStyle: PropTypes.object,
    flipCardStyle: PropTypes.object,
    numberStyle: PropTypes.object,
  }),
  onComplete: PropTypes.func,
  showCircles: PropTypes.bool,
};

export default Timer;
