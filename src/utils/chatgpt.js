import store from '../store/store.js';
import jsPDF from 'jspdf'

let api_key = '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';

export default function genrate_description(list) {
    function renderPDF(data) {
        console.log(store.state.companyName, "\n", list)
        let result = data.choices[0].text
        store.commit('changePopup', false)
        const doc = new jsPDF()

        let distance = 10
        let maxWidth = "150";

        doc.setFillColor("#088F8F")
        doc.rect(5, 5, 200, 20, "F")

        doc.setTextColor("#fff")
        doc.text(store.state.companyName, 10, 10 + distance * 1, {renderingMode: "fill"})

        let digest = [result, "\n\n", store.state.companySocialMedia, store.state.companyPhone, store.state.companyWebsite, store.state.companyAddress, store.state.companyRAndD]

        doc.setTextColor("#000")
        doc.setFontSize(10)
        doc.text(digest, 20, 10 + distance * 2.5, { maxWidth: maxWidth })
        doc.save('my_data.pdf')
    }

    fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${api_key}`
        },
        body: JSON.stringify({
            prompt: `Compose a very short, meaningful description of a company called "${store.state.companyName}" based on the following descriptions:\n${list}`,
            max_tokens: 100,
        })
    })
        .then(response => response.json())
        .then(data => renderPDF(data));

}