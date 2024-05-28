import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {Canvas, Rect, SweepGradient, vec} from '@shopify/react-native-skia';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

export const App = () => {
  const rotation = useSharedValue(0);
  console.log(rotation, 123123);

  const centerX = width / 2;
  const centerY = height / 2;
  const centerVec = vec(centerX, centerY);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(2, {
        duration: 4000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
    console.log(rotation, 123123);
  }, [rotation]);

  const animatedRotation = useDerivedValue(() => {
    // console.log([{rotate: Math.PI * rotation.value}], 90);
    return [{rotate: Math.PI * rotation.value}];
  }, [rotation]);

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <Rect x={0} y={0} width={width} height={height}>
          <SweepGradient
            origin={centerVec}
            c={centerVec}
            colors={['white', 'grey', '#222222', 'black']}
            start={0}
            end={360}
            transform={animatedRotation.value}
          />
        </Rect>
      </Canvas>
      <Text style={styles.dayText}>DAY</Text>
      <Text style={styles.nightText}>NIGHT</Text>
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
    fontWeight: '100',
    letterSpacing: 8,
    fontSize: 90,
    color: 'black',
    textAlign: 'center',
  },
  nightText: {
    position: 'absolute',
    bottom: '20%',
    fontWeight: '100',
    letterSpacing: 8,
    fontSize: 90,
    color: 'white',
    textAlign: 'center',
  },
});

export default App;
