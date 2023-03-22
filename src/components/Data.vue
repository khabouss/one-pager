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
                <label class="label">Company Name</label>
                <div class="control">
                    <input class="input" type="text" v-model="$store.state.companyName">
                </div>
            </div>

            <div class="field">
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
import generate_description from '../utils/chatgpt'


export default {
    data() {
        return {
        }
    },
    methods: {
        generatePDF() {
            this.$store.commit('changePopup', true)
            generate_description(this.companyDescription)
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
  