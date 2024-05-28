import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  SafeAreaView,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {useNavigation} from '@react-navigation/native';
import {AnimationScreenNames} from '@constants/NavigationHelpers';

export const YoutubeHome = () => {
  const nav = useNavigation<any>();

  const goToScreen = (name: string) => {
    nav.push(name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Object.values(AnimationScreenNames)}
        renderItem={({item}) => {
          return (
            <Pressable onPress={() => goToScreen(item)} style={styles.button}>
              <View style={styles.exampleCell}>
                <Text>{item}</Text>
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
  button: {
    height: 100,
    backgroundColor: 'white',
  },
  exampleCell: {
    borderRadius: 8,
    marginHorizontal: 30,
    marginVertical: 8,
    backgroundColor: 'white',
    flex: 1,
    shadowColor: Platform.OS === 'android' ? 'black' : 'lightgrey',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
