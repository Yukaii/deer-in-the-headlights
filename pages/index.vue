<template>
  <h1 class="text-3xl font-bold underline">Hello world!</h1>

  <v-btn @click="toggleTheme">Hello world!</v-btn>

  <p>Mouse position: {{ x }}, {{ y }}</p>

  <mgl-map style="height: 400px;"></mgl-map>
</template>

<script lang="ts">
import toggleTheme from '~/hooks/toggleTheme'
import { useMouse } from '@vueuse/core'

export default {
  setup() {
    return {
      ...toggleTheme(),
      ...useMouse(),
    }
  }
}
</script>
