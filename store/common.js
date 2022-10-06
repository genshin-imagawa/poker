export const state = () => ({
  darkMode: false
})

export const getters = {
  getDarkMode (state) {
    return state.darkMode
  }
}

export const mutations = {
  setDarkMode (state, value) {
    state.darkMode = value
  }
}
