<template>
  <v-dialog v-model="dialog" persistent scrollable  max-width="600px">
    <v-btn class="primary" 
      slot="activator">
       <v-icon>edit</v-icon> Edit
    </v-btn>
    <v-card>
      <v-toolbar dark class="primary">
        <v-toolbar-title>Edit User</v-toolbar-title> 
      </v-toolbar>
      <v-form @submit.prevent="onSubmit" ref="form" lazy-validation>
      <v-card-text>
            <v-layout row wrap>  
            <v-flex sm8 offset-sm2>               
            <v-text-field
              label="Name"
              name="fullName"
              v-model="fullName"
              :error-messages="errors.collect('name')"
              v-validate="'required|alpha_dash|min:3'"
              data-vv-name="name"
              prepend-icon="person">
            </v-text-field>
            </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex sm8 offset-sm2>
            <v-text-field
              label="Email"
              name="email"
              v-model="email"
              :error-messages="errors.collect('email')"
              v-validate="'required|email'"
              prepend-icon="email">
            </v-text-field>
            </v-flex>
            </v-layout>   
            <v-layout row>
              <v-flex sm8 offset-sm2>
                  <v-radio-group 
                    data-vv-name="role" 
                    v-validate="'required'" 
                    :error-messages="errors.collect('role')" 
                    v-model="role" 
                    row
                    prepend-icon="group">
                    <v-radio color="primary" label="User" value="user" ></v-radio>
                    <v-radio color="primary" label="Administrator" value="admin"></v-radio>
                  </v-radio-group>
               </v-flex>
            </v-layout>   
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
              class="primary" 
              type="submit" 
              flat
              :disabled="loading"
              :loading="loading">
                Submit
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
            </v-btn>
            <v-btn class="primary" flat @click="clear">Clear</v-btn>
            <v-btn class="primary" flat @click.native="dialog = false">Close</v-btn>
          </v-card-actions>
           
        </v-form>
    </v-card>
    </v-dialog>
</template>

<script>
  export default {
    props: ['user'],

    $_veeValidate: {
      validator: 'new'
    },
    data () {
      return {
        dialog: false,
        email: this.user.email,
        fullName: this.user.fullName,
        role: this.user.role,
        id: this.user.id
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      clear () {
        this.email = ''
        this.fullName = ''
        this.role = 'user'
        this.$validator.reset()
      },
      onSubmit () {
        return this.$validator.validateAll().then((result) => {
          if (result) {
            const formData = {
              email: this.email,
              fullName: this.fullName,
              role: this.role,
              id: this.id
            }
            this.$store.dispatch('editUser', {...formData})
            .then(() => {
              this.dialog = false
              this.$validator.reset()
            })
            .catch((error) => {
              console.log(error)
            })
          }
        })
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