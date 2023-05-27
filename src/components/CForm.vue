<template>
  <div class="py-10 w-full xl:max-w-lg">
    <form v-if="!loading" class="w-full max-w-lg">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            Nombre
          </label>
          <input required
                 class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                 id="grid-last-name" type="text" placeholder="Nombre" v-model="user.nombre">

        </div>
        <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
            Apellidos
          </label>
          <input required
                 class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                 id="grid-last-name" type="text" placeholder="Apellido" v-model="user.apellidos">
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-age">
            Edad
          </label>
          <input required
                 class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                 id="grid-last-name" type="number" placeholder="Edad" v-model="user.edad">
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-sex">
            Sexo
          </label>
          <div class="relative">
            <select required
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-sex" v-model="user.sexo">
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

      </div>
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full  px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
            Correo
          </label>
          <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-email" requiredtype="email" placeholder="Correo" v-model="user.correo">
        </div>
      </div>
      <div class="flex items-center justify-between">
        <button type="button"
                class="bg-blue-500 float-right hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                @click="sendUser">
          Enviar
        </button>
      </div>
    </form>
    <div v-else
         class="inline-block h-8 w-8 mt-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
         role="status">
  <span
      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
  >Loading...</span
  >
    </div>
  </div>
</template>

<script setup lang="ts">

import {inject, onMounted, reactive, ref} from "vue"
import axios from "axios"

let user = reactive({id: null, nombre: "", apellidos: "", edad: "", sexo: "", correo: ""})
const loading = ref(false)
const refresh_user:any=inject('refresh_user')
const axiosInstace = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

async function sendUser() {

  loading.value = true
  if (!user.id)
    await axiosInstace.post('/admin/datos', user)
  else
    await axiosInstace.put('/admin/datos/' + user.id, user)
  refresh_user()
  loading.value = false
  user = {id: null, nombre: "", apellidos: "", edad: "", sexo: "", correo: ""}

}

async function load_user(id: number) {

  loading.value = true
  const data = await axiosInstace.get('/admin/datos/' + id)
  user = data.data
  loading.value = false


}
defineExpose({load_user})

onMounted(() => {
})

</script>

<style scoped>

</style>