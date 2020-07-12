import YoutubeSearch from "../models/YoutubeSearch";
import { observable, action, computed } from "mobx";

class YoutubeSearchStore {

    youtubeSearchByQuery = new Map();

    @observable
    searchQuery = "";

    @action
    search(query) {

        console.log(query);
        this.searchQuery = query;

        // don't search empty string
        if (query === "") {
            return;
        }

        let youtubeSearch;
        if (this.youtubeSearchByQuery.has(query)) {
            youtubeSearch = this.youtubeSearchByQuery.get(query)
        } else {
            youtubeSearch = new YoutubeSearch(query);
            this.youtubeSearchByQuery.set(query, youtubeSearch);
        }

        return youtubeSearch.load();
    }

    @computed
    get currentYoutubeSearch() {
        return this.youtubeSearchByQuery.get(this.searchQuery);
    }

}

export default new YoutubeSearchStore();
