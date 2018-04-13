import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login/Login'
import AdminSchedule from '@/components/Schedule/Schedule'
import Tasks from '@/components/Tasks/Tasks'
import User from '@/components/User/Users'
import EditUser from '@/components/User/EditUser'
import AddTask from '@/components/Tasks/AddTask'
import EditTask from '@/components/Tasks/EditTask'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/schedule',
      name: 'ScheduleAdmin',
      component: AdminSchedule
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: Tasks,
      beforeEnter: AuthGuard
    },
    {
      path: '/tasks/new',
      name: 'AddTask',
      component: AddTask,
      beforeEnter: AuthGuard
    },
    {
      path: '/tasks/:id',
      name: 'EditTask',
      component: EditTask,
      beforeEnter: AuthGuard
    },
    {
      path: '/users',
      name: 'User',
      component: User,
      beforeEnter: AuthGuard
    },
    {
      path: '/user/:id',
      name: 'EditUser',
      component: EditUser,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
