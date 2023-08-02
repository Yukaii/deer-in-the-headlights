import { createSharedComposable, useStepper } from '@vueuse/core'

function useSubmissionSteps () {
  return useStepper([
    'initial',
    'move-location',
    'upload-image',
    'confirm'
  ])
}

export default createSharedComposable(useSubmissionSteps)
