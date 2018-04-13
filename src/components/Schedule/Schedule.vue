<template>
  <v-container>  
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
     <v-layout row wrap>
       <v-flex xs12 sm10 offset-sm1 v-for="(sch, index) in schedules" :key="sch.id">
         <v-card class="elevation-10 mb-4">
           <v-container>
             <v-layout row justify-space-around>
               <v-flex xs1>
                 <v-card-text>
                   <h4 class="display-2">{{ index + 1 + '.'}}</h4>
                 </v-card-text>
               </v-flex>
               <v-flex xs7 sm7 md7>
                 <v-card-title primary-title> 
                   <div>
                    <h3 class="primary--text" >Task</h3>
                    <h4>{{ sch.task.title }}</h4>
                   </div>
                 </v-card-title>
                 <v-card-text>
                   {{ sch.task.description }}
                 </v-card-text>
                </v-flex> 
                <v-flex xs2 sm2 md2> 
                  <v-layout row wrap>
                    <v-flex md8>
                  <v-card-title>
                    <h3 class="primary--text">Status</h3>
                  </v-card-title>  
                  <v-card-text class="pt-0 pb-0">
                    <p>{{ sch.task.status }}</p>
                  </v-card-text>  
                  </v-flex>     
                  <v-flex md5>                
                  <v-card-title>
                    <h3 class="primary--text">Responsible</h3>
                  </v-card-title>  
                  <v-card-text class="pt-0 pb-0">
                    <p>{{ sch.user.fullName }}</p>
                  </v-card-text>  
                  </v-flex>  
                  </v-layout>         
                </v-flex>
                <v-flex xs4 sm2 md2>
                  <v-layout row wrap>                   
                     <v-flex md8>
                     <v-card-title>
                    <h3 class="primary--text">Deadline</h3>
                  </v-card-title>  
                  <v-card-text class="pt-0 pb-0">
                    <p>{{ sch.task.deadline }}</p>
                  </v-card-text>  
                  </v-flex>
                  <template v-if="adm">
                    <app-edit-schedule-details :sch="sch" :index="index"></app-edit-schedule-details>
                      <v-btn 
                        fab                    
                        icon
                        @click="deleteSchedule(sch.id, index)"
                           >
                              <v-icon>delete</v-icon>
                          </v-btn>
                    </template>
                  </v-layout>
                </v-flex>
             </v-layout>
           </v-container>
         </v-card>
       </v-flex>
       <template v-if="adm">
       <app-add-schedule></app-add-schedule>
       </template>
     </v-layout>  
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      task: null,
      user: null
    }
  },
  methods: {
    deleteSchedule (schId, index) {
      this.$store.dispatch('deleteSchedule', schId)
      this.schedules.splice(index, 1)
    }
  },
  computed: {
    adm () {
      return this.$store.getters.isAdmin
    },
    schedules () {
      return this.$store.getters.schedules
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  created () {
    if (this.$store.getters.isAdmin) {
      this.$store.dispatch('getSchedule')
    } else {
      this.$store.dispatch('getUserSchedule', this.$store.getters.user.id)
    }
  }
}
</script>