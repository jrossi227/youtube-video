import React from "react";
import { observer } from 'mobx-react'
import { View, Text } from "react-native";
import WebView from "react-native-webview";
import YoutubeSearchStore from "../../stores/YoutubeSearchStore";

@observer
class YoutubeVideo extends React.Component {

    render() {

        const youtubeSearch = YoutubeSearchStore.currentYoutubeSearch;

        let placeholderText = "Search for a video"
        if (youtubeSearch && youtubeSearch.isLoading) {
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

        console.log("getVideo");

        const youtubeSearch = YoutubeSearchStore.currentYoutubeSearch;
        if (!youtubeSearch) {
            return null;
        }

        console.log("getVideo");
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

        return (
            <WebView
                key={videoId}
                style={{flex:1}}
                javaScriptEnabled={true}
                source={{uri: `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=0&showinfo=0&controls=1`}}
            />
        )
    }

}

export default YoutubeVideo;

const styles = {
    videoContainer: {
        position: "relative",
        flex: 1,
        backgroundColor: "#DCDCDC"
    },
    placeholderTextContainer: {
        position: "absolute",
        flex: 1,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    placeholderText: {
        color: "#808080"
    },
    errorText: {
        color: "#ff0000"
    }
}
