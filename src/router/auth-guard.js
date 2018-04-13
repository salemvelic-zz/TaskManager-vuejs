import { store } from '@/store/store'

export default (to, from, next) => {
  if (store.state.role === 'user') {
    next('/login')
  } else if (store.state.role == null) {
    next('/login')
  } else {
    next()
  }
}
