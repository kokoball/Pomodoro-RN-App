import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {Canvas, Rect, SweepGradient, vec} from '@shopify/react-native-skia';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {useRoute} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export const PomodoroClock = () => {
  const [second, setSecond] = useState(0);
  const rotation = useSharedValue(0);
  const route = useRoute();
  const {value} = route.params as {value: number};
  const [currentValue, setCurrentValue] = useState(value);

  const centerX = width / 2;
  const centerY = height / 2;
  const centerVec = vec(centerX, centerY);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(2, {
        duration: 245000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );

    const interval = setInterval(() => {
      setSecond(prev => {
        if (prev === 59) {
          setCurrentValue(prevValue => prevValue - 1);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [rotation]);

  const animatedRotation = useDerivedValue(() => {
    return [{rotate: Math.PI * 1.5 + Math.PI * 4 * rotation.value}];
  }, [rotation]);

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <Rect x={0} y={0} width={width} height={height}>
          <SweepGradient
            origin={centerVec}
            c={centerVec}
            colors={['white', 'grey']}
            start={0}
            end={360}
            transform={animatedRotation}
          />
        </Rect>
      </Canvas>
      <Text style={styles.dayText}>{currentValue}</Text>
      <Text style={styles.nightText}>{second}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dayText: {
    position: 'absolute',
    top: '20%',
    fontWeight: '400',
    letterSpacing: 8,
    fontSize: 90,
    color: 'black',
    textAlign: 'center',
  },
  nightText: {
    position: 'absolute',
    bottom: '20%',
    fontWeight: '400',
    letterSpacing: 8,
    fontSize: 90,
    color: 'white',
    textAlign: 'center',
  },
});
