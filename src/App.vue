<template>
  <v-app class="secondary">
    <v-navigation-drawer temporary absolute v-model="sideNav">
      <v-list>
        <v-list-tile 
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link">         
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile> 
        <v-list-tile  
          v-if="auth"
          @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>   
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon 
        @click="sideNav = !sideNav" 
        class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Labours of Hercules</router-link>  
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn 
          flat 
          v-for="item in menuItems" 
          :key="item.title"
          router
          :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn
          v-if="auth"
          flat
          @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {icon: 'lock_open', title: 'Login', link: '/login'}
        ]
        if (this.auth) {
          if (this.adm) {
            menuItems = [
              {icon: 'extension', title: 'Task Manager', link: '/tasks'},
              {icon: 'account_circle', title: 'User Manager', link: '/users'},
              {icon: 'event', title: 'Schedule', link: '/schedule'}
            ]
          } else {
            menuItems = [
              {icon: 'event', title: 'Schedule', link: '/schedule'}
            ]
          }
        }
        return menuItems
      },
      auth () {
        return this.$store.getters.isAuthenticated
      },
      adm () {
        return this.$store.getters.isAdmin
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
  }
</script>
