<template>
  <v-layout row wrap>
    <v-layout xs2>
    <v-card>
      <v-card-title primary-title>
        <div>
          <v-form>
            <v-text-field
              v-model="name"
              :rules="inputRules"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="tag"
              :rules="inputRules"
              label="tag"
              required
            ></v-text-field>
            <v-text-field
              v-model="appId"
              :rules="inputRules"
              label="appId"
              required
            ></v-text-field>
            <v-text-field
              v-model="secretKey"
              :rules="inputRules"
              label="secretKey"
              required
            ></v-text-field>
            <v-text-field
              v-model="token"
              :rules="inputRules"
              label="token"
              required
            ></v-text-field>
            <v-text-field
              v-model="adminOpenId"
              :rules="inputRules"
              label="adminOpenId"
              required
            ></v-text-field>
          </v-form>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color="orange"
          @click="addClient({name, tag, appId, secretKey, token, adminOpenId})">Add</v-btn>
      </v-card-actions>
    </v-card>
    </v-layout>
    <v-flex xs10>
      <v-data-table
        :headers="headers"
        :items="clients"
        hide-actions
        class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.tag }}</td>
          <td>{{ props.item.appId }}</td>
          <td>{{ props.item.secretKey }}</td>
          <td>{{ props.item.token }}</td>
          <td>{{ props.item.accessToken ? 'success' : 'failed' }}</td>
          <td>{{ props.item.adminOpenId }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'client',
  data() {
    return {
      name: '',
      tag: '',
      appId: '',
      secretKey: '',
      token: '',
      inputRules: [
        v => !!v || 'required'
      ],
      headers: [
        { text: 'NAME', value: 'name' },
        { text: 'TAG', value: 'tag' },
        { text: 'APPID', value: 'appId' },
        { text: 'SECRET KEY', value: 'secretKey' },
        { text: 'TOKEN', value: 'token' },
        { text: 'ACCESSTOKEN', value: 'accessToken' },
        { text: 'ACCESSTOKEN', value: 'adminOpenId' }
      ]
    }
  },
  computed: mapState({
    clients: state => state.client.clients
  }),
  methods: mapActions('client', [
    'addClient'
  ]),
  created() {
    this.$store.dispatch('client/getClients')
  }
}
</script>
