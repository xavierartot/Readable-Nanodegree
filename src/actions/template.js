export const CHANGE_TEMPLATE = 'CHANGE_TEMPLATE'

export function changeTemplate(color) {
  return {
    type: CHANGE_TEMPLATE,
    color,
  }
}
export function handleTemplate(color) {
  return (dispatch, getState) => {
    dispatch(changeTemplate(color))
  }
}
