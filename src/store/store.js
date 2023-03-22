import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            showPopup: false,
            companyName: 'KANEPI LIMITED',
            companyDescription: `kanepi provides software and services, focusing on delivering innovative solutions that have an immediate and positive impact on operations.\n-The solution incorporates workflow review processes, versioning, audit trails, a powerful search engine and a clear hierarchal structure for ease of use.\n-We bring this experience and the latest technologies together to deliver solutions to improve productivity and safety, and reduce downtime and cost.\n-Our modular approach to providing solutions means customers can avail of relevant and integrated software without the overheads of ‘big ticket’ systems.\n-Custom SolutionsWhile kanepi has developed software products that provide benefits from accessing real-time and historic operations data, we recognised our customers often have unique requirements.We welcome the opportunity to work with companies to design and build custom solutions to support specific processes or perform specific functions not already available.Building a custom solution with kanepi may not be as expensive as you think.`,
            companySocialMedia: 'twitter',
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
