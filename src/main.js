// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VProgressCircular,
  VCard,
  VRadioGroup,
  VTooltip,
  VDatePicker,
  VForm,
  VDialog,
  VTextField,
  VIcon,
  VGrid,
  VToolbar,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'
import { store } from './store/store'
import VeeValidate from 'vee-validate'
import * as VueGoogleMaps from 'vue2-google-maps'
import EditScheduleDetails from './components/Schedule/EditScheduleDetails.vue'
import EditUser from './components/User/EditUser.vue'
import AddNewUser from './components/User/AddUser.vue'
import AddSchedule from './components/Schedule/AddSchedule.vue'
import axios from 'axios'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'
import vSelect from 'vue-select'
import VueFlashMessage from 'vue-flash-message'
import 'vue-flash-message/dist/vue-flash-message.min.css'

axios.defaults.baseURL = 'https://task-manager-idata.firebaseio.com/'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VCard,
    VBtn,
    VProgressCircular,
    VRadioGroup,
    VForm,
    VDatePicker,
    VTextField,
    VIcon,
    VDialog,
    VTooltip,
    VGrid,
    VToolbar,
    transitions
  },
  theme: {
    primary: colors.green.darken2,
    secondary: colors.blueGrey.lighten4,
    accent: colors.green.darken2,
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.use(VeeValidate)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBcAxvChLkoWRmU-2mRYqYfse-Wbo29w4Q'
  }
})

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyBcAxvChLkoWRmU-2mRYqYfse-Wbo29w4Q'
})

Vue.use(VueFlashMessage)

Vue.component('app-edit-schedule-details', EditScheduleDetails)
Vue.component('app-new-user', AddNewUser)
Vue.component('app-edit-user', EditUser)
Vue.component('app-add-schedule', AddSchedule)

Vue.component('v-select', vSelect)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
