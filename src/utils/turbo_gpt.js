import { Configuration, OpenAIApi } from "openai"
import jsPDF from 'jspdf'
import store from '../store/store.js';
import 'jspdf-autotable'

const configuration = new Configuration({
    apiKey: process.env.VUE_APP_API_KEY,
});

const openai = new OpenAIApi(configuration);

function renderPDF(profile, innovation, top_players, market) {
    store.commit('changePopup', false)

    const doc = new jsPDF()

    let maxWidth = "170";

    if (store.state.ws_sm_status !== 0) {
        let social_media = store.state.social_media
    }
    if (typeof store.state.industry === "object") {
        addBadge(doc, findImgPath(store.state.industry[0]))
    }
    else if (typeof store.state.industry === "string") {
        addBadge(doc, findImgPath(store.state.industry))
    }

    console.log(store.state.industry[0]);

    doc.setFont("helvetica", "bold");
    doc.setFillColor("#2E4053")
    doc.rect(0, 5, 210, 15, "F")

    doc.setTextColor("#fff")
    doc.text(store.state.companyName, 10, 15, { renderingMode: "fill" })

    let profile_digest = [profile, "\n\n"]
    let top_players_digest = [top_players, "\n\n"]
    let innovation_digest = [innovation, "\n\n"]

    doc.setFillColor("#D1F2EB")
    doc.rect(5, 30, 200, 60, "F")
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
    doc.text("Innovation:", 15, 100)
    doc.text(innovation_digest, 20, 110, { maxWidth: maxWidth })

    doc.text("Industry statistics:", 15, 210)
    if (market !== "") {
        table(doc, 15, 215, market)
    }

    doc.setTextColor("#2E4053")
    doc.text("Top Players in the same sector:", 15, 260)
    doc.text(top_players_digest, 20, 265, { maxWidth: "50" })
    // drawChart(doc)
    donut(doc, 95, 270, 15, 7, store.state.sentences_count, store.state.high_scoring_sentences_count
        , "Sentences with score greater than 95%", "Total number of Sentences", '#FF6384', '#36A2EB')

    donut(doc, 160, 270, 15, 7, store.state.innovation_keywords.length, get_special_keywords_length()
        , "keywords with score greater than 100", "Total number of keywords", '#F7DC6F', '#2E4053')

    doc.save('my_data.pdf')
}

function findImgPath(industry) {
    switch (industry) {
        case "Wholesale and retail trade; repair of motor vehicles and motorcycles":
            return "wholesale.jpg";
        case "Professional, scientific and technical activities":
            return "professional.jpg";
        case "Construction":
            return "construction.jpg";
        case "Manufacturing":
            return "Manufacturing.jpg";
        case "Information and communication":
            return "information-communication.jpg";
        case "Administrative and support service activities":
            return "administrative.jpg";
        case "Other service activities":
            return "other.jpg"
        case "Real estate activities":
            return "realestate.jpg";
        case "Accommodation and food service activities":
            return "food.jpg";
        case "Human health and social work activities":
            return "health.jpg";
        case "Financial and insurance activities":
            return "financial.jpg";
        case "Arts, entertainment and recreation":
            return "art.jpg";
        case "Education":
            return "education.jpg";
        case "Transportation and storage":
            return "storage.jpg";
        case "Activities of extraterritorial organisations and bodies":
            return "organisations.jpg";
        case "Agriculture, Forestry and Fishing":
            return "agriculture.jpg";
        case "Public administration and defence; compulsory social security":
            return "socialsecurity.jpg";
        case "Water supply, sewerage, waste management and remediation activities":
            return "water.jpg";
        case "Electricity, gas, steam and air conditioning supply":
            return "electricity.jpg";
        case "Mining and Quarrying":
            return "mining.jpg";
        case "Activities of households as employers; undifferentiated goods- and services-producing activities of households for own use":
            return "households.jpg";
        case "Other service activities":
            return "other.jpg"
        default:
            return "industry.jpg"
    }
}

function get_special_keywords_length() {
    let keywords = store.state.innovation_keywords
    return keywords.filter(item => item.size > 100).length;
}

function table(doc, x, y, market) {
    const data = market.split("\n").map(row => row.split("|"));
    // const data = [
    //     ["Name", "Age", "Gender"],
    //     ["John Doe", "30", "Male"],
    //     ["Jane Smith", "25", "Female"],
    //     ["Bob Johnson", "45", "Male"],
    // ];

    doc.autoTable({
        head: [data[0]],
        body: data.slice(1),
        startY: y,
        startX: x
    });
}

function drawChart(doc) {
    // Create a new PDF document
    let keyword = store.state.innovation_keywords
    keyword.sort((a, b) => b.size - a.size);
    const topFive = keyword.slice(0, 5);
    // Define the data for the bar chart
    var data2 = [topFive[0].text, topFive[1].text, topFive[2].text, topFive[3].text, topFive[4].text];
    var data = [topFive[0].size, topFive[1].size, topFive[2].size, topFive[3].size, topFive[4].size]

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

    doc.rect(chartX - 5, chartY - 15, chartWidth + 10, chartHeight + 25, 'S');
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

function donut(doc, centerX, centerY, radius1, radius2, total_sentences, special_sentences, T1, T2, color1, color2) {
    // Data for the chart
    const data = [total_sentences, special_sentences];
    const colors = [color1, color2];
    const total = data.reduce((sum, value) => sum + value, 0);

    doc.setFontSize(7)
    doc.setFillColor(colors[1])
    doc.rect(centerX + radius1 + 5, centerY - 5, 1, 1, 'F')
    doc.setFillColor(colors[0])
    doc.rect(centerX + radius1 + 5, centerY + 5, 1, 1, 'F')

    doc.text(T1, centerX + radius1 + 8, centerY - 5, { maxWidth: "20" })
    doc.text(T2, centerX + radius1 + 8, centerY + 5, { maxWidth: "20" })
    doc.setFontSize(10)

    // Draw the slices of the donut chart
    let startAngle = 0;
    for (let i = 0; i < data.length; i++) {
        const sliceAngle = data[i] / total * Math.PI * 2;
        const endAngle = startAngle + sliceAngle;

        doc.setFillColor(colors[i]);
        doc.setDrawColor('#FFFFFF');
        doc.setLineWidth(0.5);

        doc.moveTo(centerX + radius1 * Math.cos(startAngle), centerY + radius1 * Math.sin(startAngle));
        for (let angle = startAngle; angle <= endAngle; angle += 0.01) {
            const x = centerX + radius1 * Math.cos(angle);
            const y = centerY + radius1 * Math.sin(angle);
            doc.lineTo(x, y);
        }

        doc.lineTo(centerX + radius2 * Math.cos(endAngle), centerY + radius2 * Math.sin(endAngle));
        for (let angle = endAngle; angle >= startAngle; angle -= 0.01) {
            const x = centerX + radius2 * Math.cos(angle);
            const y = centerY + radius2 * Math.sin(angle);
            doc.lineTo(x, y);
        }

        doc.lineTo(centerX + radius1 * Math.cos(startAngle), centerY + radius1 * Math.sin(startAngle));
        doc.fill();
        doc.stroke();

        startAngle = endAngle;
    }
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
    if (keywords === "") {
        return ""
    }
    let result = ""
    for (let i = 0; i < keywords.length; i++) {
        if ((i + 1) == keywords.length)
            result += keywords[i].text
        else
            result += keywords[i].text + ","
    }
    return result
}

function addBadge(doc, imgPath) {
    const image = require('@/assets/industry/' + imgPath)

    // Set a fixed width and height for the image
    const imgWidth = doc.internal.pageSize.getWidth()
    const imgHeight = 50

    // Calculate the position of the image in the upper right corner
    const x = 0; // 10 is the margin from the right
    const y = 0 // 10 is the margin from the top

    // Add the image to the PDF
    doc.addImage(image, 'PNG', x, y, imgWidth, imgHeight)
}

export default async function generate() {

    let profile = ""
    let activity = ""
    let innovation = ""
    let top_players = ""
    let market = ""

    if (store.state.companyName !== '' && store.state.companyAddress !== '' && store.state.companyAddress !== '' && store.state.incorporationDate !== '') {
        let profile_prompt = `quickly write an honest description in english from the following data that has been scraped from a company website: company_name="${store.state.companyName}" company_address="${store.state.companyAddress}" company_incorporation_date="${store.state.incorporationDate}" (dont say "Sorry, as an AI language model .." just get to the point)`
        const profile_messages = [{ role: 'user', content: profile_prompt }]
        profile = await get_gpt_response(profile_messages)
    }

    if (store.state.keywords !== '' && store.state.SIC !== '') {
        let activity_prompt = `using the following company keywors: "${store.state.keywords}" and the following company SIC: "${store.state.SIC}" give a quickly short description of the company activity without using uncertainty words (ex: likely, may ..) (dont say "Sorry, as an AI language model .." just get to the point) (dont start with "Based on the keywords, sentences, description, and activity scraped from the company website")`
        const activity_messages = [{ role: 'user', content: activity_prompt }]
        activity = await get_gpt_response(activity_messages)
    }

    if (store.state.innovation_sentances !== '' && formated_keywords() !== '' && profile !== '' && activity !== '' && store.state.companyRAndD !== '') {
        let innovation_prompt = `from the following keywods, sentences, description and activity that were scraped from a company website: keyword="${formated_keywords()}" sentences="${store.state.innovation_sentances}" description="${profile} activity="${activity}" we think that the probability of this company being R&D innovative is ${store.state.companyRAndD}.now explain (without using uncertainty words ex: likely, may ..) in a well formated multiparagraph (spcae between paragraphs) that does not exceed 152 words, why the company is ${store.state.companyRAndD} r&d innovative? (dont start the text with "Based on the information scraped..")`
        const innovation_messages = [{ role: 'user', content: innovation_prompt }]
        innovation = await get_gpt_response(innovation_messages)
    }

    if (store.state.industry !== "" && store.state.country) {
        let top_players_prompt = `give me the names of top five companies in the sector of "${store.state.industry}" in 2018 in ${store.state.country}`
        const top_players_messages = [{ role: 'user', content: top_players_prompt }]
        top_players = await get_gpt_response(top_players_messages)
        top_players = top_players.substring(top_players.indexOf("1.", 0), top_players.length)
    }

    if (store.state.industry !== "" && store.state.country !== "") {
        let market_prompt = `in csv format (use | as delimiter) give me any four key statistics regarding "${store.state.industry}" in ${store.state.country} in any year you have available (write the answer in csv format) also provide only three rows or less`
        const market_messages = [{ role: 'user', content: market_prompt }]
        market = await get_gpt_response(market_messages)
        console.log(market);
        let lines = market.split("\n");
        lines.splice(1, 1);
        market = lines.join("\n");
    }

    renderPDF("\n- " + profile + "\n\n- " + activity, innovation, top_players, market)




}