<template>
  <v-app-bar title="看路">
    <v-spacer />

    <v-btn icon @click="toggleTheme">
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
  </v-app-bar>

  <v-main fill-height>
    <div ref="mapRef" class="w-full h-full" />
  </v-main>
</template>

<script lang="ts">
import "maplibre-gl/dist/maplibre-gl.css";

import toggleTheme from "~/hooks/toggleTheme";
import { useMouse } from "@vueuse/core";
import { Map } from "maplibre-gl";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const mapRef = ref<HTMLDivElement>(null);

    onMounted(() => {
      const map = new Map({
        container: mapRef.value!,
        style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
        center: [121.51545267311785, 25.039814170038984],
        zoom: 15,
      });
    });

    return {
      ...toggleTheme(),
      ...useMouse(),
      mapRef,
    };
  },
};
</script>
