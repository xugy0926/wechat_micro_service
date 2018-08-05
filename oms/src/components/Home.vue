<template>
  <div class="hello">
  </div>
</template>

<script>
import router from '../router';

export default {
  name: 'Home',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  created() {
    router.push('signin');
  },
};
</script>
