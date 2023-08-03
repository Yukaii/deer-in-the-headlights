<template>
  <v-dialog v-model="props.open" fullscreen transition="dialog-bottom-transition">
    <v-card class="w-full">
      <v-toolbar color="primary">
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-toolbar-title>Submit Point</v-toolbar-title>
      </v-toolbar>

      <minimap :longitude="longitude" :latitude="latitude" />

      <v-card-text>
        <v-form>
          <v-text-field label="Name" outlined required />

          <v-text-field label="Description" outlined required />

          <div>
            <span>Lng: {{ longitude }}</span>
            <span>Lat: {{ latitude }}</span>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import useMapCoord from "../hooks/useMapCoord";
import Minimap from "./Minimap.vue";

const props = defineProps<{
  open: boolean;
}>();
const emit = defineEmits(["close"]);

const { longitude, latitude } = useMapCoord();

function close() {
  emit("close");
}
</script>
