import React from "react";
import { observable, action } from "mobx";
import { observer } from 'mobx-react'
import { View } from "react-native";
import { Searchbar } from 'react-native-paper';
import YoutubeSearchStore from "../../stores/youtube/YouTubeSearchStore";

@observer
class YoutubeSearchInput extends React.Component {

    @observable
    searchQuery = "";

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Searchbar
                    placeholder="Search"
                    onChangeText={this.onChangeText}
                    onSubmitEditing={this.onSubmitEditing}
                    value={this.searchQuery}
                    autoCapitalize="none"
                />
            </View>
        );
    }

    onSubmitEditing = (event) => {
        const query = event.nativeEvent.text;

        YoutubeSearchStore.search(query);
    }

    @action
    onChangeText = (query) => {
        this.searchQuery = query;

        if (query === "") {
            YoutubeSearchStore.search(query);
        }
    };
}

export default YoutubeSearchInput;
