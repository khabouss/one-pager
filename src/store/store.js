import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            showPopup: false,
            companyID: '',
            companyName: '',
            companyDescription: ``,
            companySocialMedia: '',
            companyPhone: '',
            companyWebsite: '',
            companyAddress: '',
            companyRAndD: '',
            innovation_sentances: '',
            innovation_keywords: '',
            industry: '',
            incorporationDate: '',
            SIC: '',
            keywords: '',
        };
    },
    mutations: {
        changePopup(state, val) {
            state.showPopup = val;
        },
        change_companyName(state, val) {
            state.companyName = val;
        },
        change_companyDescription(state, val) {
            state.companyDescription = val;
        },
        change_companySocialMedia(state, val) {
            state.companySocialMedia = val;
        },
        change_companyPhone(state, val) {
            state.companyPhone = val;
        },
        change_companyWebsite(state, val) {
            state.companyWebsite = val;
        },
        change_companyAddress(state, val) {
            state.companyAddress = val;
        },
        change_companyRAndD(state, val) {
            state.companyRAndD = val;
        },
        change_innovation_sentances(state, val) {
            state.innovation_sentances = val;
        },
        change_innovation_keywords(state, val) {
            state.innovation_keywords = val;
        },
        change_industry(state, val) {
            state.industry = val;
        },
        change_incorporationDate(state, val) {
            state.incorporationDate = val;
        },
        change_SIC(state, val) {
            state.SIC = val;
        },
        change_keywords(state, val) {
            state.keywords = val;
        },
    },
    actions: {
    },
    getters: {
    }
});

export default store;
