import React from "react";
import { observable, action } from "mobx";
import { observer } from 'mobx-react'
import { View } from "react-native";
import { Searchbar } from 'react-native-paper';
import YoutubeSearchStore from "../../stores/YoutubeSearchStore";
import {debounce} from "../../lib/debounce";

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
                    value={this.searchQuery}
                />
            </View>
        );
    }

    @action
    onChangeText = (query) => {
        console.log("onChangeText")
        this.searchQuery = query;

        this.onSearch(query);
    };

    @action
    onSearch = debounce((query) => {
        console.log("onSearch");
        YoutubeSearchStore.search(query);
    }, 250, false);

}

export default YoutubeSearchInput;
