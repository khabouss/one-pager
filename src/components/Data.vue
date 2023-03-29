<template>
    <div v-if="$store.state.showPopup" class="popup">
        <div class="popup-content">
            <div class="popup-text">Thinking...</div>
            <div class="popup-icon">[Waiting for ChatGPT to give us a good idea]</div>
        </div>
    </div>
    <div class="container">
        <h1 class="title">Company Information</h1>
        <div class="form">
            <div class="field">
                <label class="label">Company ID</label>
                <div class="control">
                    <input class="input" type="text" v-model="$store.state.companyID">
                </div>
            </div>

            <div class="field">
                <label class="label">Company Name</label>
                <div class="control">
                    <input class="input" type="text" v-model="$store.state.companyName">
                </div>
            </div>

            <div class="field">using jspdf how can i reduce the size of a text if it goes beyond the pgae


                <label class="label">Company list of descriptions (seprate by new line)</label>
                <div class="control">
                    <textarea class="textarea" v-model="$store.state.companyDescription"></textarea>
                </div>
            </div>

            <div class="field">
                <label class="label">Company Social Media</label>
                <div class="control">
                    <input class="input" type="text" v-model="$store.state.companySocialMedia">
                </div>
            </div>

            <div class="field">
                <label class="label">Company Phone</label>
                <div class="control">
                    <input class="input" type="tel" v-model="$store.state.companyPhone">
                </div>
            </div>

            <div class="field">
                <label class="label">Company Website</label>
                <div class="control">
                    <input class="input" type="url" v-model="$store.state.companyWebsite">
                </div>
            </div>

            <div class="field">
                <label class="label">Company Address</label>
                <div class="control">
                    <textarea class="textarea" v-model="$store.state.companyAddress"></textarea>
                </div>
            </div>

            <div class="field">
                <label class="label">Company R&amp;D</label>
                <div class="control">
                    <input class="input" type="text" v-model="$store.state.companyRAndD">
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <button @click="generatePDF" class="button is-primary" type="submit">Export</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import generate_pdf from '../utils/chatgpt'
import axios from 'axios'
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';
import { STOPWORDS } from '@/constants/stop-words';

export default {
    data() {
        return {}
    },
    methods: {
        getRdWords(sentences, country) {
            const SHOW_MAX = 100;
            const MIN_WORD_LENGTH = 4;
            const SIZE_COEFFICIENT = 15;

            let rdWords = [];
            if (sentences) {
                const allWords = sentences.map(item => item.sentence.replace(/[\p{P}$+<=>^`|~]/gu, ' ').toLowerCase()).join(' ').split(' ');
                rdWords = allWords.filter(item => !STOPWORDS[country].includes(item) && item.length > MIN_WORD_LENGTH);
                rdWords = map(groupBy(rdWords), val => ({ text: val[0], size: val.length * SIZE_COEFFICIENT })).slice(0, SHOW_MAX);
            }
            return rdWords;
        },
        format_sentances(sentences) {
            let result = ""
            for (let i = 0; i < sentences.length; i++) {
                result += sentences[i].sentence + "\n"
            }
            return result
        },
        generatePDF() {
            axios
                .post("http://localhost:3000/products/getall", { data: this.$store.state.companyID })
                .then((response) => {
                    let results = response.data.results

                    this.$store.commit('change_companyName', results.official_name)
                    this.$store.commit('change_ws_sm_status', results.ws_sm_status)
                    this.$store.commit('change_companyDescription', results.ws_description)
                    this.$store.commit('change_companySocialMedia', results.ws_sm)
                    this.$store.commit('change_companyPhone', results.ws_contact_phone)
                    this.$store.commit('change_companyWebsite', results.ws_url)
                    this.$store.commit('change_companyAddress', results.official_country + ", " + results.address_city)
                    this.$store.commit('change_companyRAndD', results.is_rd_score + "%")
                    this.$store.commit('change_innovation_sentances', this.format_sentances(results.is_rd_details.sentences))
                    this.$store.commit('change_sentences_count', results.is_rd_details.sentences_count)
                    this.$store.commit('change_high_scoring_sentences_count', results.is_rd_details.high_scoring_sentences_count)
                    this.$store.commit('change_innovation_keywords', this.getRdWords(results.is_rd_details.sentences, results.official_country))
                    this.$store.commit('change_industry', results.official_section)
                    this.$store.commit('change_incorporationDate', results.official_incorporation_date)
                    this.$store.commit('change_SIC', results.official_industry)
                    this.$store.commit('change_keywords', results.ws_significant_words)
                    this.$store.commit('change_country', results.official_country)
                    this.$store.commit('change_ws_contact_email', results.ws_contact_email)
                    
                    this.$store.commit('changePopup', true)
                    generate_pdf(this.$store.state.companyDescription)
                });
        }
    }
}
</script>
  
<style>
.container {
    max-width: 800px;
}

.form {
    margin-bottom: 100px;
}

.title {
    margin-top: 50px;
    margin-bottom: 30px;
}

.popup {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.popup-text {
    font-size: 20px;
    margin-bottom: 10px;
}
</style>
  