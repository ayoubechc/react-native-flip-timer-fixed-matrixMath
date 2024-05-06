import React, {useRef, useEffect} from 'react';
import {View, Animated, Dimensions} from 'react-native';
import PropTypes from 'prop-types';

import style from '../style';

import TransformUtil from '../../utils';
import FlipCard from './flip-card';
import Card from './card';

const {width} = Dimensions.get('window');

const NumberCard = ({
  number,
  previousNumber,
  size = width / 6,
  perspective = 250,
  numberWrapperStyle,
  cardStyle,
  flipCardStyle,
  numberStyle,
}) => {
  const rotateFront = useRef(new Animated.Value(0)).current;
  const rotateBack = useRef(new Animated.Value(-180)).current;

  const frontRef = useRef(null);
  const backRef = useRef(null);

  useEffect(() => {
    animateTick();
    rotateFront.addListener(({value}) => {
      transformRef(frontRef.current, value, size * 0.3);
    });

    rotateBack.addListener(({value}) => {
      transformRef(backRef.current, value, -size * 0.3);
    });
  }, [number]);

  const animateTick = () => {
    rotateFront.setValue(0);
    rotateBack.setValue(-180);
    Animated.parallel([
      Animated.timing(rotateFront, {
        toValue: 180,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(rotateBack, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const transformRef = (ref, deg, y) => {
    const matrix = TransformUtil.createIdentityMatrix();
    TransformUtil.translateMatrix(matrix, {x: 0, y, z: 0});
    TransformUtil.perspectiveMatrix(matrix, perspective);
    TransformUtil.rotateXMatrix(matrix, deg);
    TransformUtil.untranslateMatrix(matrix, {x: 0, y, z: 0});
    if (ref) {
      ref.setNativeProps({style: {transform: [{matrix}]}});
    }
  };

  return (
    <View
      style={[
        style.numberWrapper,
        {width: size * 0.8, height: size * 1.2, borderRadius: size / 10},
        numberWrapperStyle,
      ]}>
      <Card
        type="upper"
        size={size}
        number={number}
        cardStyle={cardStyle}
        numberStyle={numberStyle}
      />
      <Card
        type="lower"
        size={size}
        number={previousNumber}
        cardStyle={cardStyle}
        numberStyle={numberStyle}
      />
      <FlipCard
        setRef={ref => (frontRef.current = ref)}
        type="front"
        size={size}
        number={previousNumber}
        flipCardStyle={flipCardStyle}
        numberStyle={numberStyle}
      />
      <FlipCard
        setRef={ref => (backRef.current = ref)}
        type="back"
        size={size}
        number={number}
        flipCardStyle={flipCardStyle}
        numberStyle={numberStyle}
      />
    </View>
  );
};

NumberCard.propTypes = {
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  previousNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  perspective: PropTypes.number,
  size: PropTypes.number,
  numberWrapperStyle: PropTypes.object,
  cardStyle: PropTypes.object,
  flipCardStyle: PropTypes.object,
  numberStyle: PropTypes.object,
};

export default NumberCard;
