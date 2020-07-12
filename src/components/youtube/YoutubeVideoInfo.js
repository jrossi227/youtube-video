import React from "react";
import { observer } from 'mobx-react'
import { View, Text, ScrollView } from "react-native";
import YoutubeSearchStore from "../../stores/YoutubeSearchStore";

@observer
class YoutubeVideoInfo extends React.Component {

    render() {

        const youtubeSearch = YoutubeSearchStore.currentYoutubeSearch;
        let textView;
        if (!youtubeSearch || !youtubeSearch.isLoaded) {
            return null
        } else {
            textView = this.getVideoSummary(youtubeSearch);
        }

        return (
            <View style={styles.searchInputContainer}>
                <ScrollView style={styles.scrollView}>
                    {textView}
                </ScrollView>
            </View>
        );
    }

    getVideoSummary(youtubeSearch) {

        const {title, description, channelTitle} = youtubeSearch;

        return (
            <>
                <View>
                    <Text>{title}</Text>
                </View>
                <View>
                    <Text>{description}</Text>
                </View>
                <View>
                    <Text>{channelTitle}</Text>
                </View>
            </>
        )
    }

}

export default YoutubeVideoInfo;

const styles = {
    searchInputContainer: {
        flex: 1
    },
    scrollView: {
    }
}
