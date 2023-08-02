<template>
  <v-app-bar title="看路">
    <v-spacer />

    <v-btn icon @click="toggleTheme">
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
  </v-app-bar>

  <v-main>
    <div ref="mapRef" class="w-full h-full" />

    <!-- a dot to indicate map center -->
    <div v-if="current === 'move-location'" class="flex absolute inset-0 justify-center items-center translate-y-[32px]"
      style="pointer-events: none">
      <div class="w-3 h-3 bg-red-500 rounded-full" />
      <!-- description -->
      <div class="absolute text-center text-sm translate-y-10 bg-white px-2 py-1 rounded border">
        <div>Drag the map to the location</div>
        <div>where you want to submit a point</div>
      </div>
    </div>

    <!-- bottom center container -->
    <div class="flex absolute inset-x-0 bottom-3 justify-center px-4">
      <v-btn color="primary" @click="goToNext" rounded="xl" size="large">
        <v-icon v-if="current === 'initial'">mdi-plus</v-icon>
        <v-icon v-else>mdi-arrow-right</v-icon>
      </v-btn>
    </div>

    <submit-point-form v-model="showForm" @close="onClosed" />
  </v-main>
</template>

<script lang="ts">
import "maplibre-gl/dist/maplibre-gl.css";

import toggleTheme from "~/hooks/toggleTheme";
import useMapCoord from "~/hooks/useMapCoord";
import useSubmissionSteps from "../hooks/useSubmissionSteps";
import { useMouse } from "@vueuse/core";
import { Map } from "maplibre-gl";
import { onMounted, ref, computed } from "vue";

export default {
  setup() {
    const mapRef = ref<HTMLDivElement>(null);
    const { setCoord } = useMapCoord();
    const { current, goBackTo, goToNext } = useSubmissionSteps();

    const showForm = computed(() => current.value === "upload-image");

    const onClosed = () => {
      goBackTo("initial");
    };

    onMounted(() => {
      const map = new Map({
        container: mapRef.value!,
        style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
        // 凱道
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
      onClosed,
      current,
      goToNext,
    };
  },
};
</script>
