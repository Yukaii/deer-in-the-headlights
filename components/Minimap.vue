<template>
  <div ref="minimapRef" class="absolute right-0 bottom-0 z-10 h-[300px]" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Map } from "maplibre-gl";

const props = defineProps<{
  longitude: number;
  latitude: number;
}>();

const minimapRef = ref<HTMLDivElement>(null);

onMounted(() => {
  console.log('props', JSON.stringify(props))

  const map = new Map({
    container: minimapRef.value!,
    style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
    // 凱道
    center: [props.longitude, props.latitude],
    zoom: 15,
    dragPan: false,
  });
});
</script>
