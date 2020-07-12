import React from "react";
import { observer } from 'mobx-react'
import { View, Text } from "react-native";
import WebView from "react-native-webview";
import YoutubeSearchStore from "../../stores/youtube/YouTubeSearchStore";
import { DefaultTheme } from 'react-native-paper';
import queryString from "query-string";

@observer
class YoutubeVideo extends React.Component {

    render() {
        const youtubeSearch = YoutubeSearchStore.currentYoutubeSearch;

        let placeholderText = "Search for a video";
        if (youtubeSearch && youtubeSearch.isLoading && !youtubeSearch.error) {
            placeholderText = "Loading..."
        }

        return (
            <View style={styles.videoContainer}>
                <View style={styles.placeholderTextContainer}>
                    <Text style={styles.placeholderText}>{placeholderText}</Text>
                </View>
                {this.getVideo()}
            </View>
        );
    }

    getVideo() {
        const youtubeSearch = YoutubeSearchStore.currentYoutubeSearch;
        if (!youtubeSearch) {
            return null;
        }

        if (youtubeSearch.error) {
            return (
                <View style={styles.placeholderTextContainer}>
                    <Text style={styles.errorText}>Error loading video</Text>
                </View>
            )
        }

        if (!youtubeSearch.isLoaded) {
            return null;
        }

        const videoId = youtubeSearch.videoId;

        const queryObj = {
            rel: 0,
            autoplay: 0,
            showInfo: 0,
            controls: 1,
        }

        return (
            <WebView
                key={videoId}
                style={{flex:1}}
                javaScriptEnabled={true}
                source={{uri: `https://www.youtube.com/embed/${videoId}?${queryString.stringify(queryObj)}`}}
            />
        )
    }

}

export default YoutubeVideo;

const styles = {
    videoContainer: {
        position: "relative",
        flex: 1,
        backgroundColor: DefaultTheme.colors.surface
    },
    placeholderTextContainer: {
        position: "absolute",
        flex: 1,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: DefaultTheme.colors.placeholder
    },
    errorText: {
        color: DefaultTheme.colors.accent
    }
}
