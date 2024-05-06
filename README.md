A Flip timer implementation in React Native.

Since MatrixMath is no longer supported on React Native, I attempted to address the issue in this repository.

## Show Cases

|                                IOS                                 |                                Android                                 |
| :----------------------------------------------------------------: | :--------------------------------------------------------------------: |
| ![IOS](https://media.giphy.com/media/BLs443ghS1AYHZwqc2/giphy.gif) | ![Android](https://media.giphy.com/media/vNpcUecdRzYazzhnK1/giphy.gif) |

## Getting Started

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Properties](#properties)
- [Defaults](#defaults)
- [Contribution](#contribution)
- [Questions](#questions)

### Installation

```bash
$ npm i react-native-flip-timer-fixed
```

### Basic Usage

```
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Timer} from 'react-native-flip-timer-fixed';

function App() {
  const [play, setPlay] = useState(true);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Timer time={500000} play={play} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;

```

### Properties

#### Timer Props

| Prop            |                       Default | Type              | Description           |
| :-------------- | ----------------------------: | :---------------- | :-------------------- |
| time            |                      required | `string / number` | Time (in seconds)     |
| play            |                          true | bool              | Play the timer        |
| wrapperStyle    |                          `{}` | object            | Wrapper for the Timer |
| showCircles     |                          true | bool              | display dots          |
| flipNumberProps | [`{...}`](#flip-number-props) | `defaults`        | Flip Number Props     |

#### Flip Number Props

| Prop               |   Default | Type                        | Description       |
| :----------------- | --------: | :-------------------------- | :---------------- |
| number             |  required | `string / number`           | Number Input      |
| unit               | `seconds` | `hours / minutes / seconds` | Number Input Unit |
| size               |  `number` | `deviceWidth / 6`           | Size of the card  |
| perspective        |     `250` | number                      | Perspective       |
| numberWrapperStyle |      `{}` | object                      | Wrapper Style     |
| cardStyle          |      `{}` | object                      | Card Style        |
| flipCardStyle      |      `{}` | object                      | Flip Card Style   |
| numberStyle        |      `{}` | object                      | Number Style      |

## Todos

- Full Coverage Tests for the Components
- Support for Labels

## Contribution

> thanks to - [@pritishvaidya](mailto:pritishvaidya94@gmail.com).

> https://github.com/pritishvaidya/react-native-flip-timer

- [@BasicHealin](mailto:hamidbounsir@gmail.com) The main author.

## Questions

Feel free to [contact me](mailto:hamidbounsir@gmail.com) or [create an issue](https://github.com/ayoubechc/react-native-flip-timer-fixed-matrixMath/issues)
