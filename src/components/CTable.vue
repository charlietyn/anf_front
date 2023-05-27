<template>
  <h1>Listado de usuarios</h1>
  <div class="flex">
    <div class="overflow-x-auto ">
      <div class="inline-block ">
        <div v-if="!loading" class="overflow-hidden flex flex-wrap -mx-3 mb-6">
          <table class=" w-full md:w-1/2 px-3 mb-6 md:mb-0 text-left text-sm font-light">
            <thead class="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" class="px-6 py-4">#</th>
              <th scope="col" class="px-6 py-4">Nombre</th>
              <th scope="col" class="px-6 py-4" v-if="!hide_elements">Apellidos</th>
              <th scope="col" class="px-6 py-4" v-if="!hide_elements">Edad</th>
              <th scope="col" class="px-6 py-4">Sexo</th>
              <th scope="col" class="px-6 py-4">Correo</th>
              <th scope="col" class="px-6 py-4">Nacionalidad</th>
              <th scope="col" class="px-6 py-4">Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in list" :key="item.id" class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap px-6 py-4 font-medium">{{ item.id }}</td>
              <td class="whitespace-nowrap px-6 py-4">{{ item.nombre }}</td>
              <td class="whitespace-nowrap px-6 py-4" v-if="!hide_elements">{{ item.apellidos }}</td>
              <td class="whitespace-nowrap px-6 py-4" v-if="!hide_elements">{{ item.edad }}</td>
              <td class="whitespace-nowrap px-6 py-4">{{ item.sexo }}</td>
              <td class="whitespace-nowrap px-6 py-4">{{ item.correo }}</td>
              <td class="whitespace-nowrap px-6 py-4">{{ item.nationality }}</td>
              <td class="whitespace-nowrap px-6 py-4"><a class="text-blue-400" href="javascript:void(0)"
                                                         @click="edit_user(item.id)">Editar</a> <a
                  class="text-red-700" href="javascript:void(0)" @click="eliminar(item.id)">Eliminar</a></td>
            </tr>
            </tbody>
          </table>
          <table class=" w-full md:w-1/4 px-3 ml-10 mb-6 md:mb-0 text-left text-sm font-light">
            <thead class="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" colspan="2" class="px-6 py-4"><h1>Datos informativos</h1></th>
            </tr>
            </thead>
            <tbody>
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap px-6 py-4 font-medium">Cantidad de Femeninos</td>
              <td class="whitespace-nowrap px-6 py-4">{{ datos_inf.femeninos }}</td>
            </tr>
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap px-6 py-4 font-medium">Cantidad de Masculino</td>
              <td class="whitespace-nowrap px-6 py-4">{{ datos_inf.masculinos }}</td>
            </tr>
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap px-6 py-4 font-medium">Promedio de edad</td>
              <td class="whitespace-nowrap px-6 py-4">{{ datos_inf.promedio }}</td>
            </tr>
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap px-6 py-4 font-medium">Mayor edad</td>
              <td class="whitespace-nowrap px-6 py-4">{{ datos_inf.mayor.nombre }} {{ datos_inf.mayor.apellidos }}</td>
            </tr>
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap px-6 py-4 font-medium">Menor edad</td>
              <td class="whitespace-nowrap px-6 py-4">{{ datos_inf.menor.nombre }} {{ datos_inf.menor.apellidos }}</td>
            </tr>
            </tbody>
          </table>

        </div>
        <div v-else style="margin-left: 12rem"
             class="inline-block h-8 w-8 mt-2 flex-auto justify-center animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
             role="status">
  <span
      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
  >Loading...</span
  >
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import axios from "axios"
import {inject, onMounted, reactive, ref} from "vue"

import {useBreakpoints} from '@vueuse/core'
const breakpoints_mobile = useBreakpoints({
  mobile: 600,
})
const hide_elements = breakpoints_mobile.smallerOrEqual('mobile') // lg and smaller
const axiosInstace = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})
const list = ref()
const loading = ref(false)
let datos_inf = reactive({
  femeninos: null,
  masculinos: null,
  promedio: null,
  nationality: null,
  mayor: {nombre: "",apellidos:""},
  menor: {nombre: "",apellidos:""}
})

async function listusers() {
  loading.value = true
  const data = await axiosInstace.get('/admin/datos')
  list.value = data.data
  datos()
  loading.value = false
}

async function datos() {
  const data = await axiosInstace.get('/admin/datos/info')
  datos_inf.femeninos = data.data.femeninos
  datos_inf.masculinos = data.data.masculinos
  datos_inf.promedio = data.data.promedio
  datos_inf.mayor = data.data.mayor
  datos_inf.menor = data.data.menor
}

async function eliminar(id: number) {
  loading.value = true
  const data = await axiosInstace.delete('/admin/datos/' + id)
  listusers()
  loading.value = false
}

const load_user: any = inject('load_user')

function edit_user(id: number) {
  load_user(id)
}

defineExpose({listusers})
onMounted(() => {
  listusers()
})

</script>

<style scoped>

</style>