<template>
    <div class="container">
        <h1 class="title">Company Information</h1>
        <div class="form">
            <div class="field">
                <label class="label">Company Name</label>
                <div class="control">
                    <input class="input" type="text" v-model="companyName">
                </div>
            </div>

            <div class="field">
                <label class="label">Company Description</label>
                <div class="control">
                    <textarea class="textarea" v-model="companyDescription"></textarea>
                </div>
            </div>

            <div class="field">
                <label class="label">Company Social Media</label>
                <div class="control">
                    <input class="input" type="text" v-model="companySocialMedia">
                </div>
            </div>

            <div class="field">
                <label class="label">Company Phone</label>
                <div class="control">
                    <input class="input" type="tel" v-model="companyPhone">
                </div>
            </div>

            <div class="field">
                <label class="label">Company Website</label>
                <div class="control">
                    <input class="input" type="url" v-model="companyWebsite">
                </div>
            </div>

            <div class="field">
                <label class="label">Company Address</label>
                <div class="control">
                    <textarea class="textarea" v-model="companyAddress"></textarea>
                </div>
            </div>

            <div class="field">
                <label class="label">Company R&amp;D</label>
                <div class="control">
                    <input class="input" type="text" v-model="companyRAndD">
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
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'


export default {
    data() {
        return {
            companyName: 'PHARMACIE DES TROIS COMMUNES',
            companyDescription: `Places des Causses, 78180 Montigny-le-Bretonneux, France. Toutes les informations pratiques : adresse, tÃ©lÃ©phone, horaires d'ouverture de Pharmacie des 3 Communes Ã MONTIGNY LE BRETONNEUX sont sur le 118000.`,
            companySocialMedia: 'facebook',
            companyPhone: '+2126012345678',
            companyWebsite: 'https://appeler-tenemos.com/',
            companyAddress: 'MONTIGNY-LE-BRETONNEUX',
            companyRAndD: '0.33'
        }
    },
    methods: {
        generatePDF() {
            const doc = new jsPDF()

            let distance = 10
            let maxWidth = "150";
            doc.text('One-Pager', 10, 10 + distance * 1)

            let data = [this.companyName, this.companyDescription, this.companySocialMedia, this.companyPhone, this.companyWebsite, this.companyAddress, this.companyRAndD]

            doc.text(data, 10, 10 + distance * 2, {maxWidth:maxWidth})
            doc.save('my_data.pdf')
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
</style>
  