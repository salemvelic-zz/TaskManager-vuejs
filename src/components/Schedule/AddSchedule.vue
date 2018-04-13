<template>
  <v-dialog v-model="dialog" persistent scrollable  max-width="600px">
    <v-btn
      fixed
      dark
      fab
      bottom
      right
      color="pink"
      slot="activator">
        <v-icon>add</v-icon>
    </v-btn>
    <v-card>
      <v-toolbar dark class="primary">
        <v-toolbar-title>Add New Schedule</v-toolbar-title> 
        <v-spacer></v-spacer>
        <flash-message></flash-message>
      </v-toolbar>
      <v-form @submit.prevent="onSubmit" ref="form" lazy-validation>
        <v-layout row>
          <v-flex sm8 offset-sm2>
            <v-card-title>
              <h3>Choose User</h3>
            </v-card-title>  
            <v-select  v-model="user" :options="userOptions" maxHeight="110px"></v-select>
            <v-card-title>
              <h3>Choose Task(s)</h3>
            </v-card-title>  
            <v-select  v-model="task" :options="taskOptions" maxHeight="80px"></v-select>
            <v-card-actions class="mt-5">
            <v-spacer></v-spacer>
            <v-btn 
            class="primary" 
            type="submit" 
            flat
            :disabled="loading"
            :loading="loading">
              Add
              <span slot="loader" class="custom-loader">
                <v-icon light>cached</v-icon>
              </span>
            </v-btn>
            <v-btn class="primary" flat @click.native="dialog = false">Close</v-btn>
          </v-card-actions> 
          </v-flex>
          </v-layout>   
      </v-form>    
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        user: null,
        task: null,
        userOptions: this.$store.getters.userNames,
        taskOptions: this.$store.getters.tasksNames,
        status: 'In progress'
      }
    },
    created () {
      this.$store.dispatch('fetchUserNames')
      this.$store.dispatch('fetchTaskNames')
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onSubmit () {
        if (this.user && this.task) {
          const formData = {
            user: this.user.id,
            task: this.task.id
          }
          this.$store.dispatch('addSchedule', {...formData})
          .then(() => {
            this.task = null
            this.user = null
            this.flash('Schedule stored', 'success', {
              timeout: 2000,
              important: true
            })
          })
          .catch((error) => {
            console.log(error)
          })
        } else {
          this.flash('Validation failed', 'error', {
            timeout: 2000,
            important: true
          })
        }
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
