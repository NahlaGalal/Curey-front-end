import {SCAN_IMAGE} from '../actions/types'

export function prescription(state = [], action) {
  switch (action.type === SCAN_IMAGE) {
    default:
      return {
        ...state,
        medications: action.payload
      }
  }
}
