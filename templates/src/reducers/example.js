const initialState = {
  example: ''
}

export const SET_EXAMPLE = 'SET_EXAMPLE'

export default function example (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SET_EXAMPLE:
      return {
        ...state,
        example: payload
      }
    default:
      return state
  }
}
