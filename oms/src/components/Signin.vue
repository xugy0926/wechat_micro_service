<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs8 offset-xs2>
        <v-form>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            :counter="10"
            label="Name"
            required>
          </v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required>
          </v-text-field>

          <v-btn
            @click="submit">
            Signin
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import signin from '../api/signin'
import router from '../router'

export default {
  name: 'signin',
  data() {
    return {
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be valid'
      ]
    }
  },
  methods: {
    submit() {
      signin(this.name, this.password)
        .then(({ token }) => {
          this.$cookie.set('token', token, 30)
          router.push({ name: 'home' })
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>
