import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import YoutubeSearchInput from './src/components/youtube/YoutubeSearchInput';
import YoutubeVideo from './src/components/youtube/YoutubeVideo';
import YoutubeVideoInfo from './src/components/youtube/YoutubeVideoInfo';

// or any pure javascript modules available in npm
import { Provider as PaperProvider } from 'react-native-paper';

import { registerRootComponent } from 'expo';

const App = () => (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <YoutubeSearchInput />
      </View>
      <View style={styles.contentContainer}>
        <YoutubeVideo />
      </View>
      <View style={{ ...styles.contentContainer, padding: containerPadding }}>
        <YoutubeVideoInfo />
      </View>
    </View>
);

export default function Main() {
  return (
      <PaperProvider>
        <App />
      </PaperProvider>
  );
}

registerRootComponent(App);

const containerPadding = 16;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  searchInputContainer: {
    padding: containerPadding,
  },
  contentContainer: {
    flex: 1,
  },
});
