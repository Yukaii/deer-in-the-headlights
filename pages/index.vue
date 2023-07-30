<template>
  <h1 class="text-3xl font-bold underline">Hello world!</h1>

  <v-btn @click="toggleTheme">Hello world!</v-btn>
</template>

<script lang="ts">
import toggleTheme from '~/hooks/toggleTheme'

export default {
  setup() {
    return {
      ...toggleTheme()
    }
  }
}
</script>
