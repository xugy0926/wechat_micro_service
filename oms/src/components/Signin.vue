<template>
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
  </v-form>
</template>

<script>
export default {
  name: 'signin',
  data() {
    return {
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be valid',
      ],
    };
  },
};
</script>
