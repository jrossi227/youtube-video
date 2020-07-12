import YouTubeSearch from "../../models/youtube/YouTubeSearch";
import { observable, action, computed } from "mobx";

class YouTubeSearchStore {

    youtubeSearchByQuery = new Map();

    @observable
    searchQuery = "";

    @action
    search(query) {

        this.searchQuery = query;

        // don't search empty string
        if (query === "") {
            return;
        }

        let youtubeSearch;
        if (this.youtubeSearchByQuery.has(query)) {
            youtubeSearch = this.youtubeSearchByQuery.get(query)
        } else {
            youtubeSearch = new YouTubeSearch(query);
            this.youtubeSearchByQuery.set(query, youtubeSearch);
        }

        return youtubeSearch.load();
    }

    @computed
    get currentYoutubeSearch() {
        return this.youtubeSearchByQuery.get(this.searchQuery);
    }

}

export default new YouTubeSearchStore();
