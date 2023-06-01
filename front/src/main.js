/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import ApiService from './services/ApiService';

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)
app.use(ApiService);
registerPlugins(app)

app.mount('#app')
