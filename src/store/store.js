import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            showPopup: false,
            companyName: 'PHARMACIE DES TROIS COMMUNES',
            companyDescription: `Mill Group invests in innovative projects that provide successful social and commercial outcomes for responsible investors\nMicroshare is an innovative global leader in smart buildings solutions.\nIts EverSmart solutions leverage the power of the Internet of Things (IoT) data to solve real world problems: unlocking previously hidden data insights that secure people and places, producing cost savings and sustainability metrics and mitigating risks associated with the global pandemic.\nOurnew venture connects innovative prop-tech solutions with real estate occupiers and investorsWith our track record in both spaces we are well positioned to play a role in the evolution of the property space.We work with selected providers of state-of-the-art prop-tech solutions to accelerate the adoption of smart buildings technologies, Internet of Things (IoT) technologies and other prop-tech innovations and solutions across all real estate sectors.We seek to facilitate enhanced occupier experiences and well-being in physical spaces; to enable improvements in operational efficiencies and accompanying cost savings whilst making real beneficial environmental impact.MGS is led by John Osborn who brings over 30 years experience in institutional real estate markets.View John’s profile >>`,
            companySocialMedia: 'facebook',
            companyPhone: '+2126012345678',
            companyWebsite: 'https://appeler-tenemos.com/',
            companyAddress: 'MONTIGNY-LE-BRETONNEUX',
            companyRAndD: '0.33',
        };
    },
    mutations: {
        changePopup(state, val) {
            state.showPopup = val;
        }
    },
    actions: {
    },
    getters: {
    }
});

export default store;
