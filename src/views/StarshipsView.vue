<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { IData } from '@/interfaces'
import axios from 'axios'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Highlighter from 'vue-highlight-words'

const starships = ref<IData>({ count: 0, next: null, previous: null, results: [] })
const loading = ref<boolean>(true)
const search = ref<string>('')
const router = useRouter()
const route = useRoute()

const loadData = async (url: string) => {
  loading.value = true
  await axios(url).then((response) => {
    starships.value = response.data
  })
  loading.value = false
}

const prev = async () => {
  if (starships.value.previous) await loadData(starships.value.previous)
}

const next = async () => {
  if (starships.value.next) await loadData(starships.value.next)
}

const open = (url: string) => {
  const id: string = url.replace('https://swapi.dev/api/starships/', '')
  router.push(`/${id}`)
}

const goSearch = async () => {
  await loadData('https://swapi.dev/api/starships?search=' + search.value)
}

onBeforeMount(async () => {
  if (route.query.search) {
    search.value = String(route.query.search)
    goSearch()
  } else await loadData('https://swapi.dev/api/starships/')
})
</script>

<template>
  <h1>Starships</h1>
  <div v-if="search">Результаты поиска</div>

  <div v-if="!loading">
    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText v-model="search" class="w-full" @change="goSearch" placeholder="Search" />
    </IconField>

    <DataTable :value="starships.results" tableStyle="min-width: 50rem">
      <Column header="  ">
        <template #body="{ data }">
          <Button label="Открыть" severity="help" rounded @click="open(data.url)" />
        </template>
      </Column>
      <Column field="name" header="name">
        <template #body="{ data }">
          <div v-if="search">
            <Highlighter
              class="my-highlight"
              highlightClassName="highlight"
              :searchWords="[search]"
              :autoEscape="true"
              :textToHighlight="data.name"
            />
          </div>
          <div v-else>
            {{ data.name }}
          </div>
        </template>
      </Column>
      <Column field="model" header="model"></Column>
      <Column field="manufacturer" header="manufacturer"></Column>
      <Column field="cost_in_credits" header="cost_in_credits"></Column>
      <Column field="length" header="length"></Column>
      <Column field="max_atmosphering_speed" header="max_atmosphering_speed"></Column>
      <Column field="crew" header="crew"></Column>
      <Column field="cargo_capacity" header="cargo_capacity"></Column>
      <Column field="hyperdrive_rating" header="hyperdrive_rating"></Column>
      <Column field="MGLT" header="MGLT"></Column>
    </DataTable>

    <div class="flex align-items-center justify-content-start">
      <Button label="Назад" icon="pi pi-arrow-left" @click="prev" v-if="starships.previous" />
      <Button
        label="Дальше"
        icon="pi pi-arrow-right"
        class="ml-1"
        iconPos="right"
        @click="next"
        v-if="starships.next"
      />
    </div>
  </div>
  <div v-else>loading...</div>
</template>
