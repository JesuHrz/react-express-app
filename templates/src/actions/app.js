import { SET_TITLE } from '../reducers/app'

export function setTitle (title) {
  return {
    type: SET_TITLE,
    payload: title
  }
}
