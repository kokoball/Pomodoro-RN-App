import {GradientClock, WaveMeter} from '@components/atoms';
import {Screen} from 'types';

export const AnimationScreenNames = {
  FOCUS_ANIMATION: 'Focus Animation 🔎',
  GRADIENT_CLOCK: 'Gradient Clock 🕗',
  BENDING_CIRCLE: 'Bending Circle 🛟',
  CHASING_BUBBLES: 'Chasing Bubbles 🫧',
  WAVE_METER: 'Wave Meter 🌊',
  NEUMORPHIC_BUTTON: 'Neumorphic Button 🟢',
  LINE_CHART: 'Line Chart 📈',
  BAR_CHART: 'Bar Chart 📊',
  DONUT_CHART: 'Donut Chart 🍩',
  MORPHING_CIRCLE: 'Morphing Circle ⭕️',
  CONFETTI: 'Confetti 🎊',
  TOUCH_INTERACTIONS: 'Touch Interactions 👍',
  EXPO_PULSE: 'Expo Pulse 💙',
  VITAL_SIGN_MONITOR: 'Vital Sign Monitor ❤️',
};

export const allScreens: Screen[] = [
  {
    name: AnimationScreenNames.GRADIENT_CLOCK,
    component: GradientClock,
  },
  {
    name: AnimationScreenNames.WAVE_METER,
    component: WaveMeter,
  },
];
