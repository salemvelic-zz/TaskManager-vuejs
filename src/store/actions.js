import axios from 'axios'
import router from '@/router'

export default {
  login ({commit}, authData) {
    commit('setLoading', true)
    axios.get('/user.json')
    .then(res => {
      commit('setLoading', false)
      const data = res.data
      for (let key in data) {
        if (data[key].email === authData.email) {
          const user = data[key]
          user.id = key
          commit('authUser', user.role)
          commit('storeUser', user)
          console.log(user.role)
        }
      }
    })
          .catch(error => {
            console.log(error)
            commit('setLoading', false)
          })
  },
  logout ({commit}) {
    commit('clearAuthData')
  },
  addUser ({commit}, authData) {
    commit('setLoading', true)
    axios.post('/user.json', {
      email: authData.email,
      fullName: authData.fullName,
      role: authData.role
    })
    .then(res => {
      commit('setLoading', false)
      router.push('/users')
      console.log(res)
    })
    .catch(error => {
      commit('setLoading', false)
      console.log(error)
    })
  },
  editTask ({commit}, authData) {
    commit('setLoading', true)
    axios.put('/task/' + authData.id + '.json', {
      title: authData.title,
      description: authData.description,
      deadline: authData.deadline,
      location: authData.locality,
      ltd: authData.latitude,
      lng: authData.longitude,
      status: authData.status
    })
    .then(res => {
      commit('setLoading', false)
      router.push('/tasks')
      console.log(res)
    })
    .catch(error => {
      console.log(error)
      commit('setLoading', false)
    })
  },
  editUser ({commit}, authData) {
    commit('setLoading', true)
    axios.put('/user/' + authData.id + '.json', {
      email: authData.email,
      fullName: authData.fullName,
      role: authData.role
    }).then(res => {
      commit('setLoading', false)
      console.log(res)
      router.push('/users')
    })
    .catch(error => {
      commit('setLoading', false)
      console.log(error)
    })
  },
  deleteUser ({commit}, userId) {
    axios.delete('/user/' + userId + '.json')
    .then(res => {
      console.log(res)
    })
    .catch(error => console.log(error))
  },
  addTask ({commit}, authData) {
    commit('setLoading', true)
    axios.post('/task.json', {
      title: authData.title,
      description: authData.description,
      deadline: authData.deadline,
      location: authData.locality,
      ltd: authData.latitude,
      lng: authData.longitude,
      status: authData.status
    })
    .then(res => {
      console.log(res)
      commit('setLoading', false)
      router.push('/tasks')
    })
    .catch(error => {
      console.log(error)
      commit('setLoading', false)
    })
  },
  fetchTasks ({commit}) {
    commit('setLoading', true)
    axios.get('/task.json')
      .then(res => {
        commit('setLoading', false)
        const data = res.data
        const tasks = []
        for (let key in data) {
          const task = data[key]
          task.id = key
          tasks.push(task)
        }
        commit('storeTasks', tasks)
      })
      .catch(error => {
        commit('setLoading', false)
        console.log(error)
      })
  },
  fetchTaskNames ({commit}) {
    axios.get('/task.json')
      .then(res => {
        const data = res.data
        const tasks = []
        for (let key in data) {
          const task = {id: key, label: data[key].title}
          tasks.push(task)
        }
        // console.log(tasks)
        commit('storeTasksNames', tasks)
      })
      .catch(error => {
        console.log(error)
      })
  },
  deleteTask ({commit}, taskId) {
    axios.delete('/task/' + taskId + '.json')
    .then(res => {
      console.log(res)
    })
    .catch(error => console.log(error))
  },
  storeUser ({commit, state}, userData) {
    axios.post('/user.json', userData)
      .then(res => console.log(res))
      .catch(error => console.log(error))
  },
  saveTask ({commit}, task) {
    commit('setTask', task)
  },
  fetchUserNames ({commit, state}) {
    axios.get('/user.json')
    .then(res => {
      const data = res.data
      const users = []
      for (let key in data) {
        const user = {id: key, label: data[key].fullName}
        users.push(user)
      }
      commit('storeUserName', users)
    })
    .catch(error => {
      console.log(error)
    })
  },
  fetchUsers ({commit, state}) {
    axios.get('/user.json')
    .then(res => {
      const data = res.data
      const users = []
      for (let key in data) {
        const user = data[key]
        user.id = key
        users.push(user)
      }
      commit('storeAllUsers', users)
    })
    .catch(error => {
      console.log(error)
    })
  },
  addSchedule ({commit}, authData) {
    commit('setLoading', true)
    axios.post('/schedule.json', {
      user: authData.user,
      task: authData.task
    })
    .then(res => {
      commit('setLoading', false)
      console.log(res)
    })
    .catch(error => {
      commit('setLoading', false)
      console.log(error)
    })
  },
  editSchedule ({commit}, authData) {
    commit('setLoading', true)
    console.log(authData.id)
    axios.put('/schedule/' + authData.id + '.json', {
      user: authData.user,
      task: authData.task
    }).then(res => {
      commit('setLoading', false)
      console.log(res)
    })
    .catch(error => {
      commit('setLoading', false)
      console.log(error)
    })
  },
  deleteSchedule ({commit}, scheduleId) {
    axios.delete('/schedule/' + scheduleId + '.json')
    .then(res => {
      console.log(res)
    })
    .catch(error => console.log(error))
  },
  getSchedule ({commit}) {
    commit('setLoading', true)
    axios.get('/schedule.json')
    .then(res => {
      const data = res.data
      const schedules = []
      for (let key in data) {
        const schedule = data[key]
        schedule.id = key
        if (schedule.task && schedule.user) {
          axios.all([
            axios.get('/task/' + schedule.task + '.json'),
            axios.get('/user/' + schedule.user + '.json')
          ])
          .then(axios.spread((task, user) => {
            const newSchedule = {id: key, user: user.data, task: task.data}
            schedules.push(newSchedule)
            commit('setLoading', false)
          }))
          .catch(error => {
            console.log(error)
            commit('setLoading', false)
          })
        }
      }
      console.log(schedules)
      commit('storeSchedules', schedules)
    })
    .catch(error => {
      console.log(error)
      commit('setLoading', false)
    })
  },
  getUserSchedule ({commit}, idUser) {
    commit('setLoading', true)
    axios.get('/schedule.json')
    .then(res => {
      const data = res.data
      const schedules = []
      for (let key in data) {
        const schedule = data[key]
        if (idUser !== schedule.user) {
          continue
        } else if (idUser && idUser === schedule.user) {
          schedule.id = key
          axios.all([
            axios.get('/task/' + schedule.task + '.json'),
            axios.get('/user/' + schedule.user + '.json')
          ])
          .then(axios.spread((task, user) => {
            const newSchedule = {id: key, user: user.data, task: task.data}
            schedules.push(newSchedule)
            commit('setLoading', false)
          }))
          .catch(error => {
            console.log(error)
            commit('setLoading', false)
          })
        }
      }
      commit('storeSchedules', schedules)
    })
    .catch(error => {
      console.log(error)
      commit('setLoading', false)
    })
  },
  getScheduleIds ({commit}) {
    axios.get('/schedule.json')
    .then(res => {
      const data = res.data
      const scheduleIds = []
      for (let key in data) {
        const schedule = data[key]
        schedule.id = key
        scheduleIds.push(schedule)
      }
      commit('storeAllSchedules', scheduleIds)
    })
    .catch(error => {
      console.log(error)
    })
  },
  changeStatus ({commit}, changeStat) {
    console.log('try to change', changeStat.status)
    const task = this.store.getters.getSpecificTask(changeStat.task)
    console.log('Task', task)
    axios.put('/task/' + changeStat.task + '/.json', {
      status: changeStat.status
    })
    .then(res => console.log(res))
    .catch(error => {
      console.log(error)
    })
  }
}
