export default {
  authUser (state, userData) {
    // state.userId = userData.userId
    state.role = userData
  },
  storeTasks (state, tasks) {
    state.loadedTasks = tasks
  },
  storeTasksNames (state, tasks) {
    state.tasksNames = tasks
  },
  storeUser (state, user) {
    state.user = user
    // state.userId = user.id
  },
  storeAllUsers (state, users) {
    state.users = users
  },
  storeUserName (state, users) {
    state.userNames = users
  },
  storeSchedules (state, schedules) {
    state.schedules = schedules
  },
  storeAllSchedules (state, schedules) {
    state.scheduleIds = schedules
  },
  clearAuthData (state) {
    state.userId = null
    state.role = null
  },
  setLoading (state, load) {
    state.loading = load
  },
  setTask (state, task) {
    state.task = task
  }
}
