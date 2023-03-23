import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            showPopup: false,
            ENTRIE: 0,
            entries: [
                {
                    companyName: 'IVF LIMITED',
                    companyDescription: `Manufacturers of high quality, species-specific media for in vitro fertilisation (IVF). All IVF Bioscience products are serum-free and ready to use.`,
                    companySocialMedia: 'twitter',
                    companyPhone: '+2126012345678',
                    companyWebsite: 'https://appeler-tenemos.com/',
                    companyAddress: 'United kingdome Falmouth',
                    companyRAndD: '0.33',
                    industry: 'Professional, scientific and technical activities',
                    incorporationDate: '11/01/2010',
                    SIC: '75000 - Veterinary activities',
                    keywords: 'bovine ,oocytes ,oocyte ,gentamycin ,mediaequine ,maturation ,vitriwarm ,vitricool ,strøbech ,bioscience ,blastocyst ,protocolbovine ,embryos ,embryo ,suitebovine',
                },
                {
                    companyName: 'SELARL LEXAVOUE AIX EN PROVENCE',
                    companyDescription: `Découvrez la société d'avocats Lexavoué au service de leurs confrères, des institutionnels, des entreprises et des particuliers`,
                    companySocialMedia: 'twitter',
                    companyPhone: '+2126012345678',
                    companyWebsite: 'http://www.lexavoue.com',
                    companyAddress: 'France AIX-EN-PROVENCE',
                    companyRAndD: '0.33',
                    industry: 'Professional, scientific and technical activities',
                    incorporationDate: '02/01/2012',
                    SIC: '69.10Z Activités juridiques',
                    keywords: 'colmar ,plaidant ,postulant ,rejoindre ,amiens ,chambéry ,besançon ,avocats ,grenoble ,avocat ,poitiers ,lexavoue ,alternatifs ,versailles ,contentieux ,limoges',
                },
                {
                    companyName: 'KALLYSTA SARL',
                    companyDescription: `Kallysta is a technology allowing the charge and the Synchronization of any kind of device. Our SoftwareapiKa Multimedia Lab for iPad KallyLang Language Lab for Mac Dapi Sync. for iPads Kollector Multi-app files sending and recovering Legal Notice Privacy Policy GET SOCIAL © 2007-2020 All rights reserved`,
                    companySocialMedia: 'twitter',
                    companyPhone: '+2126012345678',
                    companyWebsite: 'https://www.kallysta.com/en/',
                    companyAddress: 'france',
                    companyRAndD: '0.33',
                    SIC: '62.01Z Programmation informatique',
                    industry: 'Information and communication',
                    incorporationDate: '01/09/2007',
                    keywords: 'kollector ,teacher ,reseller ,kallysta ,apollo ,kallylang ,tablet ,docking ,tablets',
                }
            ],
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
