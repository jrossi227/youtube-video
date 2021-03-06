
/**
 * https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=skateboarding%20dog&type=video&videoDefinition=high&key=[YOUR_API_KEY]' \
 --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
 --header 'Accept: application/json' \
 --compressed
 */

import queryString from "query-string";
import {observable, runInAction, computed} from "mobx";

const API_KEY = "AIzaSyAhqJrf7PgBvOAFp2Ifp4vbv-eKgYtPqcM";

class YouTubeSearch {

    loadPromise = null;

    @observable
    isLoaded = false;

    data = null;

    @observable
    error = null;

    videoId = null;
    title = null;
    description = null;
    channelTitle = null;

    constructor(query) {
        this.query = query;
    }

    load() {

        //already loaded
        if (this.isLoaded && this.data) {
            return Promise.resolve(this.data);
        }

        //already loading
        if (this.loadPromise) {
            return this.loadPromise;
        }

        const queryObj = {
            part: "snippet",
            order: "viewCount",
            q: this.query,
            type: "video",
            videoDefinition: "high",
            key: API_KEY,
            maxResults: 1
        }

        const url = `https://www.googleapis.com/youtube/v3/search?${queryString.stringify(queryObj)}`;

        this.loadPromise = fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        })
            .then((response) => response.json())
            .then((json) => {
                runInAction(() => {
                    this.data = json;
                    this.isLoaded = true;

                    if (this.data && this.data.items && this.data.items.length > 0) {
                        const [item] = this.data.items;

                        if (item.id) {
                            this.videoId = item.id.videoId;
                        }

                        if (item.snippet) {
                            const {channelTitle, title, description} = item.snippet;
                            this.title = title;
                            this.description = description;
                            this.channelTitle = channelTitle;
                        }

                    }

                    if (!this.videoId) {
                        this.error = "Unable to find a matching video";
                    }
                })

            })
            .catch((error) => {
                runInAction(() => {
                    this.error = error;
                    this.isLoaded = true;
                })

            });

        return this.loadPromise;
    }

    @computed
    get isLoading() {
        return !this.isLoaded;
    }

}

export default YouTubeSearch;
