<template>
  <v-dialog v-model="props.open" fullscreen transition="dialog-bottom-transition">
    <div ref="minimapRef" class="absolute right-0 bottom-0 z-10" />

    <v-card class="w-full">
      <v-toolbar color="primary">
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-toolbar-title>Submit Point</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-form>
          <v-text-field label="Name" outlined required />

          <v-text-field label="Description" outlined required />

          <v-text>
            <span>Lng: {{ longitude }}</span>
            <span>Lat: {{ latitude }}</span>
          </v-text>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import useMapCoord from "~/hooks/useMapCoord";

const props = defineProps<{
  open: boolean;
}>();
const emit = defineEmits(["close"]);

const { longitude, latitude } = useMapCoord();

function close() {
  emit("close");
}
</script>
