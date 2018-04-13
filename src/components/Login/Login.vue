<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark class="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
               <v-text-field 
                 prepend-icon="mail" 
                 name="login" 
                 label="Email" 
                 type="text"
                 v-model="email" ></v-text-field>              
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
              color="primary" 
              type="submit" 
              @click="onSubmit"
              :disabled="loading"
              :loading="loading">
                Login
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      loading () {
        if (!this.$store.getters.loading && this.$store.getters.isAuthenticated) {
          this.$router.push('/')
        }
        return this.$store.getters.loading
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('login', {email: formData.email})
      }
    }
  }
</script>

<style scoped>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
