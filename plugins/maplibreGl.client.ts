import VueMaplibreGl from 'vue-maplibre-gl'

import "maplibre-gl/dist/maplibre-gl.css";
import "vue-maplibre-gl/dist/vue-maplibre-gl.css";

import { MglMap } from 'vue-maplibre-gl'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueMaplibreGl)
  nuxtApp.vueApp.component('MglMap', MglMap)
})
