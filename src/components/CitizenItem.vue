<script setup lang="ts">
import { useBaseStore } from '@/stores/base';
import { ref } from 'vue';

const props = defineProps(['name', 'city'])
const store = useBaseStore()

const cityCount = store.getCityCountByName(props.city)
const isOpenToolTip = ref(false)

</script>

<template>
  <div class="citizen-item" @mouseover="isOpenToolTip = true" @mouseleave="isOpenToolTip = false">
    <div class="tooltip" v-if="isOpenToolTip">{{ props.city }} {{ cityCount }} жителей</div>
    <span>
      {{ props.name }}
    </span>
  </div>

</template>

<style scoped>
.citizen-item {
  position: relative;
  width: min-content;
}
.tooltip {
  position: absolute;
  background-color: darkgray;
  top: 0;
  left: 120%;
  width: max-content;
}
</style>
