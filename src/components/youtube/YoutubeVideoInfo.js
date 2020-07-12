import React from "react";
import { observer } from 'mobx-react'
import { View, ScrollView } from "react-native";
import YoutubeSearchStore from "../../stores/youtube/YouTubeSearchStore";
import { Title, Paragraph, Caption, Card } from 'react-native-paper';

@observer
class YoutubeVideoInfo extends React.Component {

    render() {

        const youtubeSearch = YoutubeSearchStore.currentYoutubeSearch;
        let textView;
        if (!youtubeSearch || !youtubeSearch.isLoaded || youtubeSearch.error) {
            return null;
        } else {
            textView = this.getVideoSummary(youtubeSearch);
        }

        return (
            <View style={styles.videoInfoContainer}>
                <ScrollView>
                    {textView}
                </ScrollView>
            </View>
        );
    }

    getVideoSummary(youtubeSearch) {

        const {title, description, channelTitle} = youtubeSearch;

        return (
            <Card>
                <Card.Content>
                    <Title>{title}</Title>
                    <Paragraph>{description}</Paragraph>
                    <Caption>{channelTitle}</Caption>
                </Card.Content>
            </Card>
        )
    }

}

export default YoutubeVideoInfo;

const styles = {
    videoInfoContainer: {
        flex: 1
    }
}
