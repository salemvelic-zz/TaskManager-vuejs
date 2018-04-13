<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
          <v-toolbar dark class="primary">
            <v-toolbar-title>Add New Task</v-toolbar-title> 
          </v-toolbar>
          <v-layout row>
            <v-flex xs12 class="mt-4">
              <v-form  @submit.prevent="onSubmit" ref="form">
                <v-layout row>
                  <v-flex xs12 sm8 offset-sm2>
                    <v-text-field
                      prepend-icon="bookmark"
                      name="title"
                      label="Title"
                      v-model="title"
                      :error-messages="errors.collect('title')"
                      v-validate="'required'"
                      data-vv-name="title">
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm8 offset-sm2>
                    <v-text-field
                      prepend-icon="assignment"
                      name="description"
                      label="Description"
                      v-model="description"
                      multi-line
                      v-validate="'required|min:3'"
                      :error-messages="errors.collect('description')"
                      data-vv-name="description">
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm8 offset-sm2>
                    <v-dialog
                      ref="dialog"
                      persistent
                      v-model="modal"
                      lazy
                      full-width
                      width="290px"
                      :return-value.sync="date">
                        <v-text-field
                          slot="activator"
                          label="Set a deadline"
                          v-model="date"
                          prepend-icon="event"
                          readonly>
                        </v-text-field>
                          <v-date-picker v-model="date" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                          <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                          </v-date-picker>
                    </v-dialog>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm8 offset-sm2>
                    <vuetify-google-autocomplete
                      id="map"
                      label="Location"
                      placeholder=""
                      @placechanged="getAddressData"
                      prepend-icon="gps_fixed"
                      required
                      clearable>
                    </vuetify-google-autocomplete>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3 class="mt-4 mb-3">
                    <v-btn 
                      class="primary" 
                      type="submit"
                      :disabled="loading"
                      :loading="loading">
                        <v-icon>add</v-icon>Add
                         <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
                    </v-btn>
                    <v-btn 
                      class="primary" 
                      @click="clear">
                        <v-icon>edit</v-icon>Clear
                    </v-btn>
                    <v-btn 
                      class="primary" 
                      @click="close">
                        <v-icon>clear</v-icon>Cancel
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-flex>    
          </v-layout>    
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
      $_veeValidate: {
        validator: 'new'
      },
      data () {
        return {
          title: null,
          description: null,
          address: null,
          dateOne: null,
          date: null,
          modal: false,
          status: 'Waiting'
        }
      },
      computed: {
        loading () {
          return this.$store.getters.loading
        }
      },
      methods: {
        clear () {
          this.title = ''
          this.description = ''
          this.date = ''
          this.address = ''
          this.$validator.reset()
        },
        getAddressData (addressData, placeResultData, id) {
          this.address = addressData
        },
        onSubmit () {
          return this.$validator.validateAll().then((result) => {
            if (result) {
              const formData = {
                title: this.title,
                description: this.description,
                deadline: this.date,
                locality: this.address.locality,
                latitude: this.address.latitude,
                longitude: this.address.longitude,
                status: this.status
              }
              this.$store.dispatch('addTask', {...formData})
            }
          })
        },
        close () {
          this.title = null
          this.description = null
          this.date = null
          this.address = null
          this.$router.push('/tasks')
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