<script async setup lang="ts">
import CitizenForm from '@/components/CitizenForm.vue'
import TreeView from '@/components/TreeView.vue'
import API from '@/services/API'
import normalize from '@/services/normalize'
import { useBaseStore } from '@/stores/base'
import type ICitizen from '@/types/citizen'
import { computed, onMounted, reactive } from 'vue'

const state: ICitizensState = reactive({
  citizens: [],
  error: '',
})

interface ICitizensState {
  citizens: ICitizen[]
  error: string
}

function addCitizen(newCitizen: ICitizen) {
  state.citizens.push(newCitizen)
}

const store = useBaseStore()

const trees = computed(() => {
  if (store.config == 'cityDistStreet') {
    return normalize.cityDistStreet(state.citizens)
  } else if (store.config == 'coutryCityDistStrHouse') {
    return normalize.coutryCityDistStrHouse(state.citizens)
  } else {
    return normalize.cityStreet(state.citizens)
  }
})

onMounted(async () => {
  const result = await API.fetchCitizens()
  if (result.data) {
    state.citizens = result.data
  } else {
    state.error = result.error
  }

  const cities = await API.fetchCities()
  if (cities.data) {
    store.saveCities(cities.data)
  } else {
    state.error = cities.error
  }
})
</script>

<template>
  <main>
    <div class="config_buttons">
      <button
        :class="store.config == 'cityDistStreet' ? 'active' : ''"
        @click="store.changeConfig('cityDistStreet')"
      >
        Город-район-улица
      </button>
      <button
        :class="store.config == 'coutryCityDistStrHouse' ? 'active' : ''"
        @click="store.changeConfig('coutryCityDistStrHouse')"
      >
        Страна-город-район-улица-дом
      </button>
      <button
        :class="store.config == 'cityStreet' ? 'active' : ''"
        @click="store.changeConfig('cityStreet')"
      >
        Город-улица
      </button>
    </div>
    <div class="content">
      <TreeView :tree="trees" />
      <CitizenForm @submit="addCitizen" />
    </div>
  </main>
</template>

<style scoped>
.content {
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}

main {
  width: 100%;
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
}

.config_buttons {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.active {
  background-color: gray;
}
</style>
