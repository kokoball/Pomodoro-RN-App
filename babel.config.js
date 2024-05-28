module.exports = {
  presets: [
<<<<<<< HEAD
    'module:@react-native/babel-preset',
=======
    'module:metro-react-native-babel-preset',
>>>>>>> d2661918b230cf21da1d34d2c0ffca424acd60fc
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@': './src',
          '@assets': './src/assets',
          '@components': './src/components',
        },
      },
    ],
<<<<<<< HEAD
=======
    'react-native-reanimated/plugin',
>>>>>>> d2661918b230cf21da1d34d2c0ffca424acd60fc
  ],
};
