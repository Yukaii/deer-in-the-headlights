import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export default createGlobalState(() => {
  const latitude = ref(0)
  const longitude = ref(0)

  const setCoord = (lat: number, lng: number) => {
    latitude.value = lat
    longitude.value = lng
  }

  return {
    latitude,
    longitude,
    setCoord
  }
})
