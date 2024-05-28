const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
<<<<<<< HEAD
 * https://reactnative.dev/docs/metro
=======
 * https://facebook.github.io/metro/docs/configuration
>>>>>>> d2661918b230cf21da1d34d2c0ffca424acd60fc
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
