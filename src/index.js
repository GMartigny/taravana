import { createApp } from "vue";
import { createI18n } from "vue-i18n";

import $bus from "./bus.js";
import "./lazy.js";

import Main from "./main.vue";
import * as messages from "./lang";

import "./less/global.less";

const app = createApp(Main);

app.use(createI18n({
    locale: "fr",
    messages,
}));
app.config.globalProperties.$bus = $bus;
app.mount(document.body);
