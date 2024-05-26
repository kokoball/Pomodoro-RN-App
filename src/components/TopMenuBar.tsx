import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

interface TopMenuBarProps {
  // Define your props here
}

const TopMenuBar: React.FC<TopMenuBarProps> = ({}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.textContent}>
        <Text>POMODORO</Text>
        <Text>27 4월 2022</Text>
      </View>
      <View style={styles.imageContent}>
        <Image
          style={styles.menuIcon}
          source={require('@assets/icons/settings.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContent: {},
  imageContent: {},
  menuIcon: {
    width: 20,
    height: 20,
  },
});

export default TopMenuBar;
