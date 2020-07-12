import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { DefaultTheme } from 'react-native-paper';

// You can import from local files
import YoutubeSearchInput from './components/youtube/YoutubeSearchInput';
import YoutubeVideo from './components/youtube/YoutubeVideo';
import YoutubeVideoInfo from './components/youtube/YoutubeVideoInfo';

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
    backgroundColor: DefaultTheme.colors.background,
  },
  searchInputContainer: {
    padding: containerPadding,
  },
  contentContainer: {
    flex: 1,
  },
});
