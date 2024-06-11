import {PomodoroClock, WaveMeter} from '@components/atoms';
import {Screen} from 'types';

export const AnimationScreenNames = {
  POMODORO_TIMER: 'Gradient Clock 🕗',
  WAVE_METER: 'Time Setting',
};

export const allScreens: Screen[] = [
  {
    name: AnimationScreenNames.POMODORO_TIMER,
    component: PomodoroClock,
  },
  {
    name: AnimationScreenNames.WAVE_METER,
    component: WaveMeter,
  },
];
