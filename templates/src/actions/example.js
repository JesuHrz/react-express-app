import { SET_EXAMPLE } from 'reducers/example'

export function setTitle (title) {
  return {
    type: SET_EXAMPLE,
    payload: title
  }
}
