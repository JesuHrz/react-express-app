const initialState = {
  title: ''
}

export const SET_TITLE = 'SET_TITLE'

export default function creditCards (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SET_TITLE:
      return {
        ...state,
        title: payload
      }
    default:
      return state
  }
}
