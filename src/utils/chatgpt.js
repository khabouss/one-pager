import store from '../store/store.js';
import jsPDF from 'jspdf'

let api_key = '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';

export default function genrate_description(list) {

    fetch('https://api.openai.com/v1/engines/curie/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${api_key}`
        },
        body: JSON.stringify({
            prompt: `Compose a very short, meaningful description of ${"INVESTORS IN SCHOOLS LIMITED"} based on the following descriptions:\n\n${list}`,
            max_tokens: 100,
        })
    })
        .then(response => response.json())
        .then(data => {
            let result = data.choices[0].text
            store.commit('changePopup', false)
            const doc = new jsPDF()

            let distance = 10
            let maxWidth = "150";
            doc.setTextColor("#f00")
            doc.text(store.state.companyName, 10, 10 + distance * 1, {})

            let digest = [store.state.companyDescription, store.state.companySocialMedia, store.state.companyPhone, store.state.companyWebsite, store.state.companyAddress, store.state.companyRAndD]
            
            doc.setTextColor("#000")
            doc.text(digest, 10, 10 + distance * 2, {maxWidth:maxWidth})
            doc.save('my_data.pdf')
        }
        );

}