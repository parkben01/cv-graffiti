import { CREATE_NEW_DOODLE, EXTEND_LAST_DOODLE, CLEAR_ALL_DOODLES, UPDATE_ISDRAWING } from '../actions'

const initialState = {
  isDrawing: false,
  doodles: []
}

const reducers = (state = initialState, action) => {
  // console.log('reducer', state, action);

  switch(action.type) {
    case UPDATE_ISDRAWING:
      return {
        ...state,
        isDrawing: action.value
      }
    case CREATE_NEW_DOODLE:
      return {
        ...state,
        doodles: [...state.doodles, [action.value]]
      }
    case EXTEND_LAST_DOODLE:
      return {
        ...state,
        doodles: state.doodles.map((doodle, i) =>
          (i === state.doodles.length - 1)
            ? doodle.concat(action.value)
            : doodle
          )
      }
    case CLEAR_ALL_DOODLES:
      return {
        ...state,
        doodles: []
      }
    default:
      return state;
  }
};

export default reducers;
