module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@screens/*': ['./src/screens/*'],
          '@navigation/*': ['./src/navigation/*'],
          '@modules/*': ['./src/modules/*'],
          "@components/*": ["./src/components/*"],
          "@utils/*": ["./src/utils/*"],
          "@domain/*": ["./src/domain/*"],
        },
      },
    ],
  ],
};
