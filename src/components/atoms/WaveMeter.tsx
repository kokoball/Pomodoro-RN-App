import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  View,
  StyleSheet,
  Text as RNText,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {
  Skia,
  Canvas,
  Path,
  Vertices,
  vec,
  useComputedValue,
  useClockValue,
  useValue,
  useTouchHandler,
  LinearGradient,
  Text,
  useFont,
  SkiaMutableValue,
} from '@shopify/react-native-skia';

import {line, curveBasis} from 'd3';

const dimens = Dimensions.get('screen');
const width = 150;
const frequency = 2;
const initialAmplitude = 10;
const verticalShiftConst = 85;
const height = 380;
const horizontalShift = (dimens.width - width) / 2;
const indicatorArray = Array.from({length: 7}, (_, i) => i);

export const WaveMeter = () => {
  const [nowTime, setNowTime] = useState('60');
  const [isEditing, setIsEditing] = useState(false);
  const verticalShift = useValue(verticalShiftConst);
  const amplitude = useValue(initialAmplitude);
  const clock = useClockValue();
  const font = useFont(require('@assets/fonts/bruno.ttf'), 20);

  const touchHandler = useTouchHandler({
    onActive: ({y}) => {
      if (y > verticalShiftConst) {
        console.log(y, 9090);
        verticalShift.current = Math.min(height, y);
        amplitude.current = Math.max(
          0,
          (height - verticalShift.current) * 0.025,
        );
        const newTime = setTimeValue(verticalShiftConst, verticalShift, height);
        setNowTime(String(newTime));
      }
    },
  });

  const createWavePath = (phase = 20) => {
    let points = Array.from({length: width + horizontalShift}, (_, index) => {
      const angle =
        ((index - horizontalShift) / width) * (Math.PI * frequency) + phase;
      return [
        index,
        amplitude.current * Math.sin(angle) + verticalShift.current,
      ];
    });

    const shiftedPoints = points.slice(horizontalShift, 300) as [
      number,
      number,
    ][];
    const lineGenerator = line().curve(curveBasis);
    const waveLine = lineGenerator(shiftedPoints);
    const bottomLine = `L${
      width + horizontalShift
    },${height} L${horizontalShift},${height}`;
    const extendedWavePath = `${waveLine} ${bottomLine} Z`;
    return extendedWavePath;
  };

  const animatedPath = useComputedValue(() => {
    const current = (clock.current / 225) % 225;
    const start = Skia.Path.MakeFromSVGString(createWavePath(current))!;
    const end = Skia.Path.MakeFromSVGString(createWavePath(Math.PI * current))!;
    return start.interpolate(end, 0.5)!;
  }, [clock, verticalShift]);

  const trianglePath = useComputedValue(() => {
    return [
      vec(horizontalShift * 2.6, verticalShift.current - 20),
      vec(horizontalShift * 2.6, verticalShift.current + 20),
      vec(horizontalShift * 2.3, verticalShift.current),
    ];
  }, [verticalShift]);

  const gradientStart = useComputedValue(() => {
    return vec(50, verticalShift.current);
  }, [verticalShift]);

  const gradientEnd = useComputedValue(() => {
    return vec(0, verticalShift.current + 150);
  }, [verticalShift]);

  const getLabelYValueOffset = (position: number) => {
    return verticalShiftConst + 50 * position;
  };

  const getYLabelValue = (position: number) => {
    return `${60 - position * 10}`;
  };

  const setTimeValue = (
    shiftConst: number,
    shift: SkiaMutableValue<number>,
    nowHeight: number,
  ) => {
    const adjustedShift =
      (shiftConst - shift.current) / (nowHeight - shiftConst) + 1;

    return Math.round(adjustedShift * 60);
  };

  const alertValue = () => {
    const adjustedShift =
      (verticalShiftConst - verticalShift.current) /
        (height - verticalShiftConst) +
      1;

    Alert.alert('VALUE', `Your value is: ${Math.round(adjustedShift * 60)}`);
  };

  const updateGraphValues = (newTime: number) => {
    const adjustedShift = 380 - newTime * 4.85;
    verticalShift.current = adjustedShift;
  };

  if (!font) {
    return <View />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Canvas style={styles.canvas} onTouch={touchHandler}>
        {indicatorArray.map(val => {
          return (
            <Text
              key={val.toString()}
              x={50}
              y={getLabelYValueOffset(val)}
              text={getYLabelValue(val)}
              font={font}
              color={'white'}
            />
          );
        })}
        <Path path={animatedPath} style="fill">
          <LinearGradient
            start={gradientStart}
            end={gradientEnd}
            colors={['orange', 'red']}
          />
        </Path>
        <Vertices vertices={trianglePath} color={'red'} />
      </Canvas>
      <View style={styles.numContainer}>
        {isEditing ? (
          <TextInput
            style={styles.numInput}
            value={nowTime}
            onChangeText={text => {
              if (
                text === '' ||
                (/^\d+$/.test(text) &&
                  parseInt(text, 10) <= 60 &&
                  parseInt(text, 10) >= 0)
              ) {
                setNowTime(text);
                if (text !== '') {
                  updateGraphValues(parseInt(text, 10));
                }
              }
            }}
            onBlur={() => {
              if (nowTime === '' || parseInt(nowTime, 10) < 0) {
                setNowTime('0');
                updateGraphValues(0);
              }
              setIsEditing(false);
            }}
            keyboardType="numeric"
            autoFocus
          />
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <RNText style={styles.num}>{nowTime}</RNText>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={alertValue}>
        <RNText style={styles.buttonText}>시작하기</RNText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  canvas: {
    flex: 1,
  },
  numContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  num: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
  },
  numInput: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  buttonContainer: {
    height: 60,
    borderRadius: 8,
    backgroundColor: '#FF5349',
    marginHorizontal: 50,
    marginTop: 10,
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
