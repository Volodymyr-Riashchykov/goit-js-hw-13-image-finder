export default class ApiService {
    constructor() {
        this.keyword = '';
        this.page = 1;
    }

    async searchImages() {
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.keyword}&page=${this.page}&per_page=12&key=23111484-b23ce212a3b9e3a1a0d03b7eb`;
        this.page += 1;

        return (await (await fetch(url)).json()).hits;
    }
    get keywords() {
        return this.keyword;
    }
    set keywords(newKeyword) {
        this.keyword = newKeyword;
    }

    resPage() {
        this.page = 1;
    }
    
}