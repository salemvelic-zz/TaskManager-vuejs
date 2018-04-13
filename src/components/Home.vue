<template>
  <v-container fluid>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm8 md6 v-if="showHome">
        <v-card class="elevation-12">
          <v-toolbar dark class="primary">
            <v-toolbar-title>Welcome {{ name }}!</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <p>It is nice to see you again!</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm8 md6 v-if="!showHome">
        <v-card class="elevation-12">
          <v-toolbar dark class="primary">
            <v-toolbar-title>Welcome!</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <p class="text-xs-center subheading">Please login to continue!</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        name: this.$store.getters.user.fullName
      }
    },
    computed: {
      showHome () {
        return this.$store.getters.isAuthenticated
      }
    }
  }
</script>

