import React from 'react';
import {View} from 'react-native';

import style from '../style';

function Separator({showCircles}) {
  return (
    <View style={style.separator}>
      {showCircles && (
        <>
          <View style={style.circle} />
          <View style={style.circle} />
        </>
      )}
    </View>
  );
}

export default Separator;
