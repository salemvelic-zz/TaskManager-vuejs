import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    role: null,
    userId: null,
    user: null,
    task: null,
    users: [
      {
        id: null,
        email: null,
        fullName: null,
        role: null
      }
    ],
    userNames: [
      {
        id: null,
        label: null
      }
    ],
    tasksNames: [
      {
        id: null,
        label: null
      }
    ],
    loadedTasks: [
      {
        id: null,
        name: null,
        description: null,
        location: null,
        lat: null,
        lng: null,
        deadline: null,
        status: null
      }
    ],
    schedules: [
      {
        id: null,
        user: null,
        task: null
      }
    ],
    scheduleIds: [
      {
        id: null,
        userId: null,
        taskId: null
      }
    ],
    loading: null
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  mutations,
  actions,
  getters
})
