import type ICity from '@/types/city'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useBaseStore = defineStore('base', () => {
  const config = ref('cityDistStreet')
  const cities: Ref<ICityRes> = ref({})

  const getCityCountByName = (name:string) => {
    return cities.value[name]
  }

  const isItCity = (name: string) => {
    for (const city of Object.keys(cities.value)) {
      if (name.includes(city)) return city
    }
    return false
  }

  function changeConfig(newConfig: string) {
    config.value = newConfig
  }

  async function saveCities(citiesNew: ICity[]) {
    citiesNew.forEach(el => {
      cities.value[el.name] = el.data
    })
  }

  return { config, getCityCountByName, isItCity, cities, changeConfig, saveCities }
})

interface ICityRes {
  [key:string]:string
}
