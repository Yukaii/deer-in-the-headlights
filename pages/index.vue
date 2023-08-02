<template>
  <v-app-bar title="看路">
    <v-spacer />

    <v-btn icon @click="toggleTheme">
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
  </v-app-bar>

  <v-main>
    <div ref="mapRef" class="w-full h-full" />

    <!-- bottom center container -->
    <div class="flex absolute inset-x-0 bottom-3 justify-center px-4">
      <v-btn color="primary" @click="showForm = true" rounded="xl" size="large">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>

    <submit-point-form v-model="showForm" @close="showForm = false" />
  </v-main>
</template>

<script lang="ts">
import "maplibre-gl/dist/maplibre-gl.css";

import toggleTheme from "~/hooks/toggleTheme";
import useMapCoord from "~/hooks/useMapCoord";
import { useMouse } from "@vueuse/core";
import { Map } from "maplibre-gl";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const mapRef = ref<HTMLDivElement>(null);
    const { setCoord } = useMapCoord();
    const showForm = ref(false);

    onMounted(() => {
      const map = new Map({
        container: mapRef.value!,
        style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
        center: [121.51545267311785, 25.039814170038984],
        zoom: 15,
      });

      map.on("move", () => {
        const { lng, lat } = map.getCenter();
        setCoord({ lng, lat });
        console.log({ lng, lat });
      });
    });

    return {
      ...toggleTheme(),
      ...useMouse(),
      mapRef,
      showForm,
    };
  },
};
</script>
