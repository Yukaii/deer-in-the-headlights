<template>
  <h1 class="text-3xl font-bold underline">Hello world!</h1>

  <v-btn @click="toggleTheme">Hello world!</v-btn>

  <p>Mouse position: {{ x }}, {{ y }}</p>

  <div ref="mapRef" style="height: 400px"></div>
</template>

<script lang="ts">
import 'maplibre-gl/dist/maplibre-gl.css';

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
