<template>
  <div :style="{ height: `${height}px` }" class="relative">
    <div ref="minimapRef" class="w-full h-full" />

    <!-- red points for showing center coordinate -->
    <div class="absolute inset-0 flex justify-center items-center">
      <div class="w-3 h-3 bg-red-500 rounded-full" />
      <!-- lng/lat -->
      <div class="absolute text-center text-sm translate-y-10 bg-white px-2 py-1 rounded border">
        <div>Lng: {{ props.longitude }}</div>
        <div>Lat: {{ props.latitude }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Map } from "maplibre-gl";

const props = withDefaults(
  defineProps<{
    longitude: number;
    latitude: number;
    height?: number;
  }>(),
  {
    height: 300,
  }
);

const minimapRef = ref<HTMLDivElement>(null);

onMounted(() => {
  const map = new Map({
    container: minimapRef.value!,
    style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
    center: [props.longitude, props.latitude],
    zoom: 18,
    dragPan: false,
  });
});
</script>
