<script setup lang="ts">
import type { IStarship } from '@/interfaces'
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import Button from 'primevue/button'

const starship = ref<IStarship>()
const loading = ref<boolean>(true)
const route = useRoute()

const loadData = async (url: string) => {
  loading.value = true
  await axios(url).then((response) => {
    starship.value = response.data
  })
  loading.value = false
}

onBeforeMount(async () => {
  await loadData(`https://swapi.dev/api/starships/${route.params.id}`)
})
</script>

<template>
  <h1>Starship</h1>

  <div v-if="!loading && starship">
    <div class="field">
      <FloatLabel>
        <InputText id="name" v-model="starship.name" class="w-full" disabled />
        <label for="name">name</label>
      </FloatLabel>
    </div>
    <div class="field">
      <FloatLabel>
        <InputText id="model" v-model="starship.model" class="w-full" disabled />
        <label for="model">model</label>
      </FloatLabel>
    </div>
    <div class="field">
      <FloatLabel>
        <InputText id="manufacturer" v-model="starship.manufacturer" class="w-full" disabled />
        <label for="manufacturer">manufacturer</label>
      </FloatLabel>
    </div>
    <div class="field">
      <FloatLabel>
        <InputText
          id="cost_in_credits"
          v-model="starship.cost_in_credits"
          class="w-full"
          disabled
        />
        <label for="cost_in_credits">cost_in_credits</label>
      </FloatLabel>
    </div>
    <div class="field">
      <FloatLabel>
        <InputText id="length" v-model="starship.length" class="w-full" disabled />
        <label for="length">length</label>
      </FloatLabel>
    </div>
    <div class="field">
      <FloatLabel>
        <InputText
          id="max_atmosphering_speed"
          v-model="starship.max_atmosphering_speed"
          class="w-full"
          disabled
        />
        <label for="max_atmosphering_speed">max_atmosphering_speed</label>
      </FloatLabel>
    </div>
    <div class="field">
      <FloatLabel>
        <InputText id="crew" v-model="starship.crew" class="w-full" disabled />
        <label for="crew">crew</label>
      </FloatLabel>
    </div>
    <div class="field">
      <FloatLabel>
        <InputText id="passengers" v-model="starship.passengers" class="w-full" disabled />
        <label for="passengers">passengers</label>
      </FloatLabel>
    </div>
    <div class="field">
      <FloatLabel>
        <InputText id="cargo_capacity" v-model="starship.cargo_capacity" class="w-full" disabled />
        <label for="cargo_capacity">cargo_capacity</label>
      </FloatLabel>
    </div>
    <div class="field">
      <FloatLabel>
        <InputText id="consumables" v-model="starship.consumables" class="w-full" disabled />
        <label for="consumables">consumables</label>
      </FloatLabel>
    </div>
    <div class="field">
      <FloatLabel>
        <InputText
          id="hyperdrive_rating"
          v-model="starship.hyperdrive_rating"
          class="w-full"
          disabled
        />
        <label for="hyperdrive_rating">hyperdrive_rating</label>
      </FloatLabel>
    </div>
    <div class="field">
      <FloatLabel>
        <InputText id="MGLT" v-model="starship.MGLT" class="w-full" disabled />
        <label for="MGLT">MGLT</label>
      </FloatLabel>
    </div>
    <div class="field">
      <FloatLabel>
        <InputText id="starship_class" v-model="starship.starship_class" class="w-full" disabled />
        <label for="starship_class">starship_class</label>
      </FloatLabel>
    </div>
    <div class="field" v-if="Object.keys(starship.pilots).length > 0">
      <label for="pilots">pilots</label>
      <ul>
        <li v-for="(pilot, index) in starship.pilots" :key="index">{{ pilot }}</li>
      </ul>
    </div>
    <div class="field" v-if="Object.keys(starship.films).length > 0">
      <label for="films">films</label>
      <ul>
        <li v-for="(film, index) in starship.films" :key="index">{{ film }}</li>
      </ul>
    </div>

    <RouterLink :to="{ name: 'starships' }">
      <Button label="В список" />
    </RouterLink>
  </div>
  <div v-else>loading...</div>
</template>

<style scoped>
.input {
  width: 100%;
}
.field {
  margin-top: 40px;
}
</style>
