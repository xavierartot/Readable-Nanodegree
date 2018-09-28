export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export function categoriesAction(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  }
}
