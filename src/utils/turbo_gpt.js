import { Configuration, OpenAIApi } from "openai"
import jsPDF from 'jspdf'
import store from '../store/store.js';

const configuration = new Configuration({
    apiKey: process.env.VUE_APP_API_KEY,
});

const openai = new OpenAIApi(configuration);

function renderPDF(profile, activity) {
    store.commit('changePopup', false)
    const doc = new jsPDF()

    let distance = 10
    let maxWidth = "150";

    doc.setFont("helvetica", "bold");
    doc.setFillColor("#088F8F")
    doc.rect(5, 5, 200, 20, "F")

    doc.setTextColor("#fff")
    doc.text(store.state.entries[store.state.ENTRIE].companyName, 10, 10 + distance * 1, { renderingMode: "fill" })

    let profile_digest = [profile, "\n\n"]
    let activity_digest = [activity, "\n\n"]

    doc.setFillColor("#D1F2EB")
    doc.rect(5, 30, 200, 60, "F")
    doc.setTextColor("#000")
    doc.setFontSize(10)
    doc.text("Company Profile:", 15, 40)
    doc.text(profile_digest, 20, 40, { maxWidth: maxWidth })

    doc.setFillColor("#FDEBD0")
    doc.rect(5, 100, 200, 70, "F")
    doc.text("Company Activity:", 15, 110)
    doc.text(activity_digest, 20, 110, { maxWidth: maxWidth })

    doc.save('my_data.pdf')
}

async function get_gpt_response(messages) {
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
        });
        const completion_text = completion.data.choices[0].message.content;
        return completion_text
    }
    catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        return ""
    }
}

export default async function generate() {

    let profile_prompt = `quickly write an informative description in english from the following data that has been scrapped from the company website: company_name="${store.state.entries[store.state.ENTRIE].companyName}" company_address="${store.state.entries[store.state.ENTRIE].companyAddress}" company_incorporation_date="${store.state.entries[store.state.ENTRIE].incorporationDate}" company_industry="${store.state.entries[store.state.ENTRIE].industry}" company_description="${store.state.entries[store.state.ENTRIE].companyDescription}"`
    const profile_messages = [{ role: 'user', content: profile_prompt }]
    let profile = await get_gpt_response(profile_messages)

    let activity_prompt = `using the following company description: "${profile.trim()}" and the following company keywors: "${store.state.entries[store.state.ENTRIE].keywords}" and the following company SIC: "${store.state.entries[store.state.ENTRIE].SIC}" give me quickly a short description of the company main activity`
    const activity_messages = [{ role: 'user', content: activity_prompt }]
    let activity = await get_gpt_response(activity_messages)

    renderPDF(profile, activity)
}