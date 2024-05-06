import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import FlipNumber from './flip-number';
import Separator from './flip-number/separator';

import TransformUtils from '../utils';

import style from './style';

const Timer = ({time, play = true, wrapperStyle, flipNumberProps}) => {
  const [timeState, setTimeState] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const {hours, minutes, seconds} = TransformUtils.formatNumberToTime(time);
    setTimeState({hours, minutes, seconds});
    if (play) {
      const timer = setInterval(() => updateTime(), 1000);
      return () => clearInterval(timer);
    }
  }, []);

  useEffect(() => {
    if (play) {
      const timer = setInterval(() => updateTime(), 1000);
      return () => clearInterval(timer);
    }
  }, [play]);

  const updateTime = () => {
    setTimeState(prevState => {
      const {hours, minutes, seconds} = prevState;
      const newState = TransformUtils.addTime(hours, minutes, seconds);
      return {...prevState, ...newState};
    });
  };

  const {hours, minutes, seconds} = timeState;

  return (
    <View style={[style.wrapper, wrapperStyle]}>
      {!!hours && (
        <FlipNumber number={hours} unit="hours" {...flipNumberProps} />
      )}
      <Separator />
      {!!minutes && (
        <FlipNumber number={minutes} unit="minutes" {...flipNumberProps} />
      )}
      <Separator />
      {!!seconds && (
        <FlipNumber number={seconds} unit="seconds" {...flipNumberProps} />
      )}
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
};

export default Timer;
