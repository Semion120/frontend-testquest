<script setup lang="ts">
import { useBaseStore } from '@/stores/base';
import CitizenItem from './CitizenItem.vue';

const props = defineProps(['tree', 'city'])
const store = useBaseStore()

</script>

<template>
 <ul class="tree-view">
    <li v-for="(value, key) in props.tree" :key="key">
      {{ typeof key === 'string' ? key : undefined  }}
      <TreeView v-if="typeof value === 'object' && !props.city" :tree="value" :city="store.isItCity(key.toString())" />
      <TreeView v-if="typeof value === 'object' && props.city" :tree="value" :city="props.city" />
      <CitizenItem v-if="typeof value !== 'object'" :name="value" :city="city" />
    </li>
  </ul>
</template>

<style scoped>

  .tree-view ul {
    margin-left: 20px;
    list-style-type: none;
  }

   .tree-view ul li {
     width: fit-content;
  }
</style>
