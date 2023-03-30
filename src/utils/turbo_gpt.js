import { Configuration, OpenAIApi } from "openai"
import jsPDF from 'jspdf'
import store from '../store/store.js';
import 'jspdf-autotable'
// import '/home/taha/Desktop/one-pager/src/assets/arial-unicode-ms-normal.js';

const configuration = new Configuration({
    apiKey: process.env.VUE_APP_API_KEY,
});

const openai = new OpenAIApi(configuration);

/*
    Main function that renders the PDF
*/
function renderPDF(profile, innovation, top_players, market, graph_data) {

    store.commit('changePopup', false)

    const doc = new jsPDF()

    let maxWidth = "170";

    headSection(doc)


    profileSection(doc, profile, maxWidth)
    innovationSection(doc, innovation, maxWidth)




    // ** R&D **
    rndComponenet(doc, 83, 178)
    // -------------------------------------------------


    // ** Top Players **
    // let top_players_digest = [top_players, "\n\n"]
    // doc.setTextColor("#2E4053")
    // doc.text("Top Players in the same sector:", 15, 245)
    // doc.setFontSize(7);
    // doc.text(top_players_digest, 145, 250, { maxWidth: "50" })
    // doc.setFontSize(10);
    // ----------------------------


    // ** Donuts **
    let red_donut_x = 30;
    let red_donut_y = 195;
    donut(doc, red_donut_x, red_donut_y, 15, 7, store.state.sentences_count, store.state.high_scoring_sentences_count
        , "Sentences with score greater than 95%", "Total number of Sentences", '#FF6384', '#36A2EB')

    let yellow_donut_x = 155;
    let yellow_donut_y = 195;
    doc.setTextColor("000")
    donut(doc, yellow_donut_x, yellow_donut_y, 15, 7, store.state.innovation_keywords.length, get_special_keywords_length()
        , "keywords with score greater than 100", "Total number of keywords", '#F7DC6F', '#2E4053')
    // ----------------------------------

    // ** Table **
    doc.text("Top companies doing R&D in this fiels:", 15, 222)
    if (market !== "") {
        table(doc, 15, 225, 35, market)
    }
    // ------------

    // ** Graph **
    doc.text(`Evolution of R&D in ${store.state.country}`, 130, 222)
    graph(doc, 135, 267, 40, graph_data)

    let footer_height = 15
    // ** Footer **
    doc.setFillColor("#283747")
    doc.rect(0, doc.internal.pageSize.getHeight() - footer_height, doc.internal.pageSize.getWidth(), footer_height, "F")
    let footer_text = `Company Number: ${store.state.companyID}  Phone: ${store.state.companyPhone}  Address: ${store.state.companyAddress}  Email: ${store.state.ws_contact_email}`
    doc.setTextColor("#fff")
    doc.setFontSize(7)
    doc.text(footer_text, (doc.internal.pageSize.getWidth() / 2) - (doc.getTextWidth(footer_text) / 2), doc.internal.pageSize.getHeight() - (footer_height / 2))
    // ---------------------------------


    doc.save('my_data.pdf')
}

function graph(doc, x, y, width, graph_data) {
    doc.setFillColor("#000")
    doc.setDrawColor("#1A5276")
    // Define some sample data
    var data = [10, 25, 30, 12, 20, 25, 30, 12, 20];

    let lines_len = width

    // Set the graph's x and y axes
    var x_axis = x;
    var y_axis = y;

    // Calculate the scale of the graph based on the maximum value
    var scale = 40 / width;

    // Draw the x and y axes
    doc.line(x_axis, y_axis, x_axis, y_axis - lines_len);
    doc.line(x_axis, y_axis, x_axis + lines_len, y_axis);


    // Draw the lines connecting the data points
    for (var i = 0; i < data.length - 1; i++) {
        var x1 = x_axis + (i * scale);
        var y1 = y_axis - (data[i] * scale);
        var x2 = x_axis + ((i + 1) * scale);
        var y2 = y_axis - (data[i + 1] * scale);
        doc.line(x1, y1, x2, y2);
    }

    // Draw the data points
    for (var i = 0; i < data.length; i++) {
        var x = x_axis + (i * scale);
        var y = y_axis - (data[i] * scale);
        doc.circle(x, y, 1, 'F');
    }
}

function fitSize(doc, text, size, maxWidth) {
    var fontSize = size
    while (doc.getTextWidth(text) > maxWidth) {
        console.log("m: ", doc.getTextWidth(text));
        fontSize--;
        doc.setFontSize(fontSize);
    }
}

function headSection(doc) {
    if (typeof store.state.industry === "object") {
        addBadge(doc, findImgPath(store.state.industry[0]))
    }
    else if (typeof store.state.industry === "string") {
        addBadge(doc, findImgPath(store.state.industry))
    }

    if (store.state.ws_sm_status !== 0) {
        let social_media = store.state.companySocialMedia
        let next = 0
        let size = 3;
        let init_x = 180
        let init_y = 8
        for (const key in social_media) {
            const image = require('@/assets/socialMedia/' + key + '.png');
            doc.addImage(image, 'SVG', init_x + next, init_y, size, size)
            doc.link(init_x + next, init_y, size, size, { url: social_media[key][0] });
            next += 6;
        }
    }

    doc.setFillColor("#1C2833")
    doc.rect(0, 2, 210, 15, "F")
    doc.setTextColor("#fff")
    fitSize(doc, store.state.companyName, 10, 90)
    // doc.setFont("arial-unicode-ms");
    doc.text(store.state.companyName, 10, 9, { renderingMode: "fill" })
    doc.setFontSize(7)
    doc.text("(" + store.state.industry + ")", 10, 12, { renderingMode: "fill" })
    const country_image = require('@/assets/country/' + store.state.country + ".png")
    doc.addImage(country_image, 'PNG', 4, 7, 4, 4)
}

function profileSection(doc, profile, maxWidth) {
    let profile_digest = [profile, "\n\n"]
    doc.setFillColor("#2C3E50")
    doc.roundedRect(5, 40, 200, 50, 5, 5, "F")
    doc.setTextColor("#fff")
    doc.setFontSize(10)
    doc.text("Profile:", 15, 50)
    doc.setFontSize(9)
    doc.setFont("times", "normal");
    doc.text(profile_digest, 20, 55, { maxWidth: maxWidth })
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold");
}

function innovationSection(doc, innovation, maxWidth) {
    let innovation_digest = [innovation, "\n\n"]
    doc.setFillColor("#F7DC6F")
    doc.setTextColor("#000")
    doc.text("Innovation:", 15, 100)
    doc.setFontSize(9)
    doc.setFont("times", "normal");
    doc.text(innovation_digest, 20, 105, { maxWidth: maxWidth })
    console.log(doc.getTextDimensions(innovation_digest));
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold");
}

function rndComponenet(doc, x, y) {
    doc.setTextColor("#fff")
    doc.setFontSize(25);
    doc.setFont("times", "bold");
    let rnd = parseFloat(store.state.companyRAndD.slice(0, -1))
    /// add unknowen
    let color = "#000";
    let rnd_image_path = "rndu.png"
    let rnd_sub_title = "not scored yet"
    if (rnd <= 5) {
        color = "#C0392B"
        rnd_image_path = "rnd5.png";
        rnd_sub_title = "No R&D sign"
    }
    else if (rnd <= 35) {
        color = "#DE3163"
        rnd_image_path = "rnd35.png";
        rnd_sub_title = "R&D very unlikely"
    }
    else if (rnd <= 65) {
        color = "#F39C12"
        rnd_image_path = "rnd65.png";
        rnd_sub_title = "R&D uncertain"
    }
    else if (rnd <= 95) {
        color = "#2ECC71"
        rnd_image_path = "rnd95.png";
        rnd_sub_title = "R&D likely"
    }
    else if (rnd <= 100) {
        color = "#1E8449"
        rnd_image_path = "rnd100.png";
        rnd_sub_title = "R&D very likely"
    }
    doc.setFillColor(color)
    doc.roundedRect(x, y + 5, 45, 25, 5, 5, "F")
    doc.text(store.state.companyRAndD, x + 10, y + 20)
    doc.setFontSize(8)
    doc.text("R&D Score:", x + 5, y + 10)
    doc.setFontSize(7)
    doc.text("*"+rnd_sub_title, x + 10 + 10, y + 20 + 7)
    doc.setFillColor('#FFFFFF');
    // doc.circle(x+35, y+5, 3, "F");
    // const rnd_image = require('@/assets/rnd/' + rnd_image_path)
    // doc.addImage(rnd_image, 'PNG', x+25, y+5, 4, 4)
    doc.setTextColor("#000")
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
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
5
function table(doc, x, y, cellWidth, market) {
    const data = market.split("\n").map(row => row.split("|"));

    doc.autoTable({
        styles: { fontSize: 7, cellWidth: cellWidth },
        head: [data[0]],
        body: data.slice(1, 4),
        startY: y,
        startX: x,
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

    doc.setTextColor(colors[1])
    let persent = (special_sentences / total_sentences) * 100;
    let persent_text = "" + Math.round(persent) + "%";
    doc.text(persent_text, centerX - (doc.getTextWidth(persent_text) / 2), centerY + 1)

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
    let graph_data = ""

    // let message = [{ role: 'system', content: 'You are a helpful assistant.' }]

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

    // if (store.state.innovation_sentances !== '' && formated_keywords() !== '' && profile !== '' && activity !== '' && store.state.companyRAndD !== '') {
    //     let innovation_prompt = `from the following keywods, sentences, description and activity that were scraped from a company website: keyword="${formated_keywords()}" sentences="${store.state.innovation_sentances}" description="${profile} activity="${activity}" we think that the probability of this company being R&D innovative is ${store.state.companyRAndD}.now explain (without using uncertainty words ex: likely, may ..) in a well formated multiparagraph (spcae between paragraphs) that does not exceed 152 words, why the company is ${store.state.companyRAndD} r&d innovative? (dont start the text with "Based on the information scraped..")`
    //     const innovation_messages = [{ role: 'user', content: innovation_prompt }]
    //     innovation = await get_gpt_response(innovation_messages)
    // }

    // // // check if actually four
    if (profile !== "" && activity !== "" && store.state.country !== "") {
        // let market_prompt = `in csv format (use | as delimiter) give me any four key statistics regarding "${store.state.industry}" in ${store.state.country} in any year you have available (write the answer in csv format) also provide only three rows or less`
        let market_prompt = `in csv format (use | as delimiter) give me top three companies (just name, revenue, r&d product (just the nmae)) in ${store.state.country} doing the same activity as the company with the following description "${profile + "\n" + activity}", please order your prompt as csv text delimted by "|" and "-" with a header`
        const market_messages = [{ role: 'user', content: market_prompt }]
        market = await get_gpt_response(market_messages)
        // market = market.substring(0, market.indexOf("\n\n", 0))
        console.log(market.indexOf("\n\n", 0));
        console.log(market);
        let lines = market.split("\n");
        lines.splice(1, 1);
        market = lines.join("\n");
    }

    if (profile !== "" && activity !== "" && store.state.country !== "") {
        // interesing => let graph_prompt = `in csv format (use | as delimiter) give me one statistic key evolving with time (like market size, turnover ..) (also doesn't have to be real-time statistics data) in the same field as these companies: "${market}" in ${store.state.country}`
        let graph_prompt = `in csv format (use | as delimiter) give me the year and market size (just the year and market size in USD) evolving with time (doesn't have to be real-time statistics data) in the same field as these companies: "${market}" in ${store.state.country} don't include N/A values`
        const graph_messages = [{ role: 'user', content: graph_prompt }]
        let graph = await get_gpt_response(graph_messages)
        console.log(graph);
        let graph_data_prompt = `extract from the following text a double js array ${graph}, the first array containing the years as a string, the second array containing the market size as a number, the third array containing just two elements which is 'the currency of the market size' and 'the unit', ex: "[['2010', '2011', '2012'], [3.4, 2, 10], ['USD', 'billion']]"` 
        const graph_data_messages = [{ role: 'user', content: graph_data_prompt }]
        graph_data = await get_gpt_response(graph_data_messages)
        console.log(graph_data);
    }

    renderPDF("\n- " + profile + "\n\n- " + activity, innovation, top_players, market, graph_data)




}