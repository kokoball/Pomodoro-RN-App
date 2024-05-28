import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Platform,
} from 'react-native';

import {Screen} from 'types';

import {useNavigation} from '@react-navigation/native';
import YouTubeStack from './YouTubeStack';

export const AnimationScreenNames = {
  YOUTUBE_STACK: 'YouTube Demos 🎥',
};

export const allScreens: Screen[] = [
  {
    name: 'YouTube Demos 🎥',
    component: YouTubeStack,
  },
];

export const Home = () => {
  const nav = useNavigation<any>();

  const goToScreen = (name: string) => {
    console.log(name, 123);
    nav.push(name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Object.values(AnimationScreenNames)}
        style={styles.flatListContainer}
        renderItem={({item}) => {
          return (
            <Pressable onPress={() => goToScreen(item)} style={styles.button}>
              <View style={styles.exampleCell}>
                <Text style={styles.cellText}>{item}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatListContainer: {
    marginTop: 70,
  },
  button: {
    height: 100,
    backgroundColor: 'white',
  },
  cellText: {
    color: 'black',
  },
  exampleCell: {
    borderRadius: 8,
    marginHorizontal: 30,
    marginVertical: 8,
    backgroundColor: 'white',
    flex: 1,
    shadowColor: Platform.OS === 'ios' ? 'darkgrey' : 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
