<template>
  <v-container fill-height>
      <v-layout>
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular 
            indeterminate 
            color="primary"
            :width="7"
            :size="70"
            v-if="loading">
          </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-between v-if="!loading">
      <v-flex xs12 sm10 md5 v-for="(task, index) in listTasks" :key="task.id">
        <v-card class="mb-5 elevation-20">
          <v-toolbar dark class="primary">
            <v-toolbar-title>{{ task.title }}</v-toolbar-title>
            <v-spacer></v-spacer>
               <v-btn                   
                    fab  
                    flat
                    icon
                    :to="'tasks/' + task.title"
                    @click="saveTask(task)">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn 
                    fab                    
                    flat
                    icon
                    @click="deleteTask(task.id, index)">
                    <v-icon>delete</v-icon>
                  </v-btn>
          </v-toolbar>
          <v-container>
            <v-layout column>
              <v-flex>
                <v-card-title><h4 class="title primary--text">Description:</h4></v-card-title>
                <v-card-text>
                   <p>{{task.description}}</p>
                </v-card-text>
              </v-flex>
            </v-layout>
            <v-layout column>
              <v-flex>
                <v-card-title> 
                  <h2 class="title primary--text">Location:</h2>                       
                </v-card-title>   
                <v-card-text>
                  <p class="mb-0 text-xs-center title">{{task.location}}</p>
                </v-card-text>      
              </v-flex>    
              <v-flex class="mb-3">
                <gmap-map
                    :center="{lat: parseFloat(task.ltd), lng: parseFloat(task.lng)}" 
                    :zoom="7"
                    style="width: 400px; height: 200px; margin-left:auto; margin-right:auto;"
                    >
                  <gmap-marker
                    :key="index"
                    :position="{lat: parseFloat(task.ltd), lng: parseFloat(task.lng)}" 
                    :clickable="true"
                    :draggable="false"
                    @click="center={lat: parseFloat(task.ltd), lng: parseFloat(task.lng)}" 
                    ></gmap-marker>
                  </gmap-map>
              </v-flex>           
            </v-layout>
            <v-layout row justify-center>
              <v-flex sm6>
                <v-card-title>
                  <span class="subheading primary--text">Deadline:</span>
                   <v-spacer></v-spacer>
                  <span class="subheading primary--text">Status:</span>
                </v-card-title>
                <v-card-title>
                  <span>{{task.deadline}}</span>  
                  <v-spacer></v-spacer>
                  <span>{{task.status}}</span>  
                </v-card-title>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
        <v-btn
              fixed
              dark
              fab
              bottom
              right
              color="pink"
              slot="activator"
              to="/tasks/new"
            >
              <v-icon>add</v-icon>
            </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      listTasks () {
        return this.$store.getters.tasks
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    created () {
      this.$store.dispatch('fetchTasks')
    },
    methods: {
      deleteTask (id, index) {
        this.$store.dispatch('deleteTask', id)
        this.listTasks.splice(index, 1)
      },
      saveTask (task) {
        this.$store.dispatch('saveTask', task)
      }
    }
  }
</script>