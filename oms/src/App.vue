<template>
<v-app blue>
  <v-navigation-drawer
    fixed
    :mini-variant="miniVariant"
    :clipped="clipped"
    v-model="drawer"
    app>
    <v-list>
      <v-list-tile
        :value="true"
        v-for="item in items"
        :key="item.title"
        @click="onclick(item.name)">
        <v-list-tile-action>
          <v-icon light v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar fixed app :clipped-left="clipped">
    <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-btn icon @click.stop="miniVariant = !miniVariant">
      <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
    </v-btn>
    <v-btn
      icon
      @click.stop="clipped = !clipped">
      <v-icon>web</v-icon>
    </v-btn>
    <v-btn
      icon
      @click.native.stop="fixed = !fixed">
      <v-icon>remove</v-icon>
    </v-btn>
    <v-toolbar-title v-text="title"></v-toolbar-title>
    <v-spacer></v-spacer>
  </v-toolbar>
  <main>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </main>
  <v-footer :fixed="fixed" app>
    <span>&copy; 2018</span>
  </v-footer>
</v-app>
</template>

<script>
import router from './router'

export default {
  name: 'App',
  data() {
    return {
      title: 'OMS',
      clipped: true,
      drawer: true,
      fixed: false,
      items: [{ icon: 'bubble_chart', title: 'clients', name: 'clients' }],
      miniVariant: false,
      right: true,
      rightDrawer: false
    }
  },
  created() {
    if (!this.$cookie.get('token')) {
      router.push('signin')
    }
  },
  methods: {
    onclick(name) {
      router.push(name)
    }
  }
}
</script>

<style>
/** CSS Styles */

#getting-started .intro {
  display: flex;
  justify-content: center;
  margin: 4rem 0;
}

#getting-started .card {
  border-radius: 0;
  margin-bottom: 5rem;
}

#getting-started a {
  color: inherit;
}

#getting-started .list {
  margin: 0 2rem !important;
}

#getting-started main {
  text-align: center;
}

#getting-started h2 {
  text-align: center;
}
</style>
