import { Configuration, OpenAIApi } from "openai"
import jsPDF from 'jspdf'
import store from '../store/store.js';

const configuration = new Configuration({
    apiKey: process.env.VUE_APP_API_KEY,
});

const openai = new OpenAIApi(configuration);
const doc = new jsPDF()

function renderPDF(profile, innovation) {
    store.commit('changePopup', false)

    let distance = 10
    let maxWidth = "90";

    doc.setFont("helvetica", "bold");
    doc.setFillColor("#088F8F")
    doc.rect(5, 5, 200, 20, "F")

    doc.setTextColor("#fff")
    doc.text(store.state.companyName, 10, 10 + distance * 1, { renderingMode: "fill" })

    let profile_digest = [profile, "\n\n"]
    // let activity_digest = [activity, "\n\n"]
    let innovation_digest = [innovation, "\n\n"]

    doc.setFillColor("#D1F2EB")
    doc.rect(5, 30, 200, 90, "F")
    doc.setTextColor("#000")
    doc.setFontSize(10)
    doc.text("Profile:", 15, 40)
    doc.text(profile_digest, 20, 45, { maxWidth: maxWidth })

    // doc.setFillColor("#FDEBD0")
    // doc.rect(5, 100, 200, 70, "F")
    // doc.text("Activity:", 15, 110)
    // doc.text(activity_digest, 20, 120, { maxWidth: maxWidth })

    doc.setFillColor("#F7DC6F")
    // doc.rect(5, 140, 200, 20, "F")
    doc.text("Innovation:", 15, 130)
    doc.text(innovation_digest, 20, 140, { maxWidth: maxWidth })
    drawChart()

    doc.save('my_data.pdf')
}

function drawChart() {
    // Create a new PDF document
    let keyword = store.state.innovation_keywords
    keyword.sort((a, b) => b.size - a.size);
    const topFive = keyword.slice(0, 5);
    // Define the data for the bar chart
    var data2 = [topFive[0].text,topFive[1].text,topFive[2].text,topFive[3].text,topFive[4].text];
    var data = [topFive[0].size,topFive[1].size,topFive[2].size,topFive[3].size,topFive[4].size]

    // Set the width and height of the chart
    var chartWidth = 50;
    var chartHeight = 30;

    // Set the X and Y position of the chart
    var chartX = 145;
    var chartY = 245;

    // Set the width and height of each bar in the chart
    var barWidth = (chartWidth - (data.length - 1) * 5) / data.length;
    var barHeight = chartHeight / Math.max(...data);

    // Set the fill color of the bars
    doc.setFillColor(255, 0, 0);

    doc.rect(chartX-5, chartY-15, chartWidth+10, chartHeight+25, 'S');
    // Loop through the data and draw the bars
    for (var i = 0; i < data.length; i++) {
        var barX = chartX + i * (barWidth + 5);
        var barY = chartY + chartHeight - data[i] * barHeight;
        var barHeightActual = data[i] * barHeight;
        doc.rect(barX, barY, barWidth, barHeightActual, 'F');
        doc.setFontSize(6)
        doc.text(data2[i], barX, barY + barHeightActual + 5)
    }

    // Save the PDF document


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

function formated_keywords() {
    let keywords = store.state.innovation_keywords
    let result = ""
    for (let i=0; i<keywords.length; i++) {
        if ((i+1) == keywords.length)
            result += keywords[i].text
        else
            result += keywords[i].text + ","
    }
    return result
}

export default async function generate() {

    let profile_prompt = `quickly write an honest description in english from the following data that has been scraped from a company website: company_name="${store.state.companyName}" company_address="${store.state.companyAddress}" company_incorporation_date="${store.state.incorporationDate}"`
    const profile_messages = [{ role: 'user', content: profile_prompt }]
    let profile = await get_gpt_response(profile_messages)

    let activity_prompt = `using the following company keywors: "${store.state.keywords}" and the following company SIC: "${store.state.SIC}" give me quickly a short description of the company activity without using uncertainty words (ex: likely, may ..)`
    const activity_messages = [{ role: 'user', content: activity_prompt }]
    let activity = await get_gpt_response(activity_messages)
    console.log(store.state.keywords);

    let innovation_prompt = `from the following keywods, sentences, description and activity that were scraped from a company website: keyword="${formated_keywords()}" sentences="${store.state.innovation_sentances}" description="${profile} activity="${activity}" we think that the probability of this company being R&D innovative is ${store.state.companyRAndD}.now explain to me with more confident (without using uncertainty words ex: likely, may ..) in a well formated multiparagraph (spcae between paragraphs and less that 200 characters) why the company is ${store.state.companyRAndD} r&d innovative? (I repeat less than 200 chars)`
    const innovation_messages = [{ role: 'user', content: innovation_prompt }]
    let innovation = await get_gpt_response(innovation_messages)

    renderPDF("\n- "+profile+"\n\n- "+activity,innovation)
}