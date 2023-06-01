/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import pinia from "../store";
import router from "../router";
import { ApiService } from "@/services/ApiService.js";

pinia.use(({ store }) => {
  store.$api = ApiService;
});

export function registerPlugins(app) {
  loadFonts();
  app.use(vuetify).use(pinia).use(router);
}