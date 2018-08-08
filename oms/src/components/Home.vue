<template>
  <v-container grid-list-xl>
    <div>{{ msg }}</div>
  </v-container>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      msg: 'Welcome to wechat_micro_service'
    }
  }
}
</script>
