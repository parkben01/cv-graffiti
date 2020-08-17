export const CREATE_NEW_DOODLE = "CREATE_NEW_DOODLE";
export const EXTEND_LAST_DOODLE = "EXTEND_LAST_DOODLE";
export const CLEAR_ALL_DOODLES = "CLEAR_ALL_DOODLES";
export const UPDATE_ISDRAWING = "UPDATE_ISDRAWING";

export const createNewDoodle = coords => ({
  type: CREATE_NEW_DOODLE,
  value: coords
});

export const extendLastDoodle = coords => ({
  type: EXTEND_LAST_DOODLE,
  value: coords
});

export const clearAllDoodles = () => ({ type: CLEAR_ALL_DOODLES });

export const updateIsDrawing = isDrawing => ({
  type: UPDATE_ISDRAWING,
  value: isDrawing
});
