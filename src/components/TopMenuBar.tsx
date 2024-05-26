import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import useCurrentTime from 'hooks/useCurrentDate';

interface TopMenuBarProps {
  // Define your props here
}

const TopMenuBar: React.FC<TopMenuBarProps> = ({}) => {
  const currentTime = useCurrentTime();
  console.log(currentTime, 90);

  return (
    <View style={styles.wrapper}>
      <View style={styles.textContent}>
        <Text>POMODORO</Text>
        <Text>{currentTime}</Text>
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
    alignItems: 'center',
  },
  textContent: {
    display: 'flex',
    gap: 5,
  },
  imageContent: {},
  menuIcon: {
    width: 25,
    height: 25,
  },
});

export default TopMenuBar;
