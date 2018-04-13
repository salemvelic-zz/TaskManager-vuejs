<template>
  <v-container>
     <v-layout row wrap justify-center>
       <v-flex xs12 sm10 md8 offset-sm1 v-for="(user, index) in listUsers" :key="user.id">
         <v-card class="elevation-10 mb-4">
           <v-container fluid>
             <v-layout row wrap>
                <v-flex xs5 sm4 md1>
                 <v-card-text>
                   <p class="display-1">{{index + 1 + '.'}}</p>
                 </v-card-text>
               </v-flex>
               <v-flex xs7 sm8 md3>
                 <v-card-title primary-title> 
                   <div>
                    <h3 class="primary--text">Ime:</h3>
                    <div class="title">{{user.fullName}}</div>
                   </div>
                 </v-card-title>
                </v-flex> 
                <v-flex xs7 sm8 md5>
                 <v-card-title primary-title> 
                   <div>
                    <h3 class="primary--text">Email:</h3>
                    <div class="title"> {{user.email}} </div>
                   </div>
                 </v-card-title>
                </v-flex>
                <v-flex xs7 sm8 md3>
                 <v-card-title primary-title> 
                   <div>
                    <h3 class="primary--text">Role:</h3>
                    <div class="title">{{user.role}}</div>
                   </div>
                 </v-card-title>
                </v-flex>
                <v-layout row wrap>
                  <v-flex md4 offset-md8 class="mt-1">
                  <v-card-actions>
                   <app-edit-user :user="user"></app-edit-user> 
                   <v-btn class="primary" @click="deleteUser(user.id, index)">
                     <v-icon>delete</v-icon> Delete   
                   </v-btn>
                 </v-card-actions>
                 </v-flex> 
                </v-layout>                                              
             </v-layout>
           </v-container>
         </v-card>
       </v-flex>
        <app-new-user></app-new-user>
     </v-layout> 
  </v-container>
</template>

<script>
export default {
  methods: {
    deleteUser (id, index) {
      this.$store.dispatch('deleteUser', id)
      this.listUsers.splice(index, 1)
    }
  },
  computed: {
    listUsers () {
      return this.$store.getters.users
    }
  },
  created () {
    this.$store.dispatch('fetchUsers')
  }
}
</script>