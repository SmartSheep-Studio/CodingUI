import {createApp} from "vue";

import Routes from "./routers";
import App from "./App.vue";

import Axios from "axios";
import VueAxios from "vue-axios";

import VueCookies from "vue-cookies";

import {createPinia} from "pinia";

const pinia = createPinia().use(() => {
    return {VueCookies};
});

const app = createApp(App);
app
    .use(Routes)
    .use(VueCookies)
    .use(VueAxios, Axios.create({
        validateStatus: function (status) {
            return true;
        }
    }))
    .use(pinia)
    .provide("axios", app.config.globalProperties.axios)
    .mount("#app");
