import React, {useState, useEffect} from 'react';
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

  useEffect(() => {
    const {hours, minutes, seconds} = TransformUtils.formatNumberToTime(time);
    setTimeState({hours, minutes, seconds});
  }, [time]);

  useEffect(() => {
    let timer;
    if (play) {
      timer = setInterval(() => updateTime(), 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [play, timeState]);

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
        clearInterval(timer);
        if (onComplete) onComplete();
        return prevState; // Keep state the same when time is up
      }

      return {hours, minutes, seconds};
    });
  };

  const {hours, minutes, seconds} = timeState;

  return (
    <View style={[style.wrapper, wrapperStyle]}>
      {!!hours && (
        <FlipNumber number={hours} unit="hours" {...flipNumberProps} />
      )}
      <Separator showCircles={showCircles} />
      {!!minutes && (
        <FlipNumber number={minutes} unit="minutes" {...flipNumberProps} />
      )}
      <Separator showCircles={showCircles} />
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
  onComplete: PropTypes.func,
  showCircles: PropTypes.bool,
};

export default Timer;
