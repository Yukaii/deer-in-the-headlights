import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export default createGlobalState(() => {
  const longitude = ref(0)
  const latitude = ref(0)

  const setCoord = (lng: number, lat: number) => {
    longitude.value = lng
    latitude.value = lat
  }

  return {
    latitude,
    longitude,
    setCoord
  }
})
