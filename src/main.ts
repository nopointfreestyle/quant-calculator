import { createApp } from 'vue'
import App from './App.vue'
import "./style.css";
import { SvgIconsPlugin } from './plugins/svg-icons.plugin';
import { router } from './router';

const app = createApp(App)

app.use(SvgIconsPlugin)
app.use(router);

app.mount('#app')
