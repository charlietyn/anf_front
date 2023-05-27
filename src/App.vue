<script setup lang="ts">
import CForm from "./components/CForm.vue"
import CTable from "./components/CTable.vue"
import {provide, ref} from "vue"

const form = ref()
const table = ref()
function refresh_user(){
  table.value.listusers()
}

function load_user(id:number){
  form.value.load_user(id)
}
provide('refresh_user',refresh_user)
provide('load_user',load_user)
</script>

<template>
  <c-form ref="form"/>
  <c-table ref="table"/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
