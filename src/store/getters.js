export default {
  user (state) {
    return state.user
  },
  users (state) {
    return state.users
  },
  userNames (state) {
    return state.userNames
  },
  tasks (state) {
    return state.loadedTasks
  },
  getSpecificTask (state, id) {
    return state.loadedTasks[id]
  },
  tasksNames (state) {
    return state.tasksNames
  },
  schedules (state) {
    return state.schedules
  },
  scheduleIds (state) {
    return state.scheduleIds
  },
  isAuthenticated (state) {
    return state.role !== null
  },
  isAdmin (state) {
    return state.role === 'admin'
  },
  loading (state) {
    return state.loading
  },
  getTask (state) {
    return state.task
  }
}
