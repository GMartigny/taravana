import { createApp } from "vue";
import { createI18n } from "vue-i18n";

import $bus from "./bus.js";
import "./lazy.js";

import Main from "./main.vue";
import messages from "./lang/i18n.json";

import "./less/global.less";

import "./robots.txt";

const app = createApp(Main);

app.use(createI18n({
    locale: "fr",
    messages,
}));
app.config.globalProperties.$bus = $bus;
app.mount(document.body);
