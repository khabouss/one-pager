import store from '../store/store.js';
import jsPDF from 'jspdf'
import generate from './turbo_gpt.js'

export default function genrate_pdf(list) {
    generate()
    // function generate_profile() {
    //     let prompt = `write a short description from the following data that has been scrapped from the company website: company_name="${store.state.companyName}" company_address="${store.state.companyAddress}" company_incorporation_date="${store.state.incorporationDate}" company_industry="${store.state.industry}"`
    //     fetch('https://api.openai.com/v1/engines/davinci/completions', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${process.env.VUE_APP_API_KEY}`
    //         },
    //         body: JSON.stringify({
    //             prompt: "im sexy and I know it",
    //             max_tokens: 100,
    //         })
    //     }).then(response => response.json()).then(data => console.log(data.choices[0].text));
    // }

    // generate_profile()

    // function renderPDF(data) {
    //     console.log(data);
    //     console.log(process.env.VUE_APP_API_KEY);
    //     let result = data.choices[0].text
    //     store.commit('changePopup', false)
    //     const doc = new jsPDF()

    //     let distance = 10
    //     let maxWidth = "150";

    //     doc.setFillColor("#088F8F")
    //     doc.rect(5, 5, 200, 20, "F")

    //     doc.setTextColor("#fff")
    //     doc.text(store.state.companyName, 10, 10 + distance * 1, { renderingMode: "fill" })

    //     let digest = [result, "\n\n", store.state.companySocialMedia, store.state.companyPhone, store.state.companyWebsite, store.state.companyAddress, store.state.companyRAndD]

    //     doc.setFillColor("#D1F2EB")
    //     doc.rect(5, 30, 200, 100, "F")

    //     doc.setTextColor("#000")
    //     doc.setFontSize(10)
    //     doc.text(digest, 20, 10 + distance * 3, { maxWidth: maxWidth })
    //     doc.save('my_data.pdf')
    // }

}