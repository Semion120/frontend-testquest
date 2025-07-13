<script setup lang="ts">
import API from '@/services/API';
import type ICitizen from '@/types/citizen';
import { ref } from 'vue';

const emit = defineEmits(['submit'])

const name = ref('');
const country = ref('');
const city = ref('');
const district = ref('');
const street = ref('');
const house = ref('');

const error = ref('');

async function handler() {
  if ( !name.value ||
    !country.value ||
    !city.value ||
    !district.value ||
    !street.value ||
    !house.value ) {
      error.value = 'Заполнены не все обязательные поля'
      return
    }

    const newCitizen: ICitizen = {
      id:2,
      _id: '',
      name: name.value,
      city_id: 1,
      groups: {
        country: country.value,
        city: city.value + ' г.',
        district: district.value + ' р-н',
        street: street.value + ' ул.',
        house: 'Дом ' + house.value,
      }
    }
    emit('submit', newCitizen)
    const result = await API.addUserToDataBase(newCitizen)
    console.log(result)

    name.value = ''
    country.value = ''
    city.value = ''
    district.value = ''
    street.value = ''
    house.value = ''
    error.value = ''
}

</script>

<template>
  <div class="form">
    <p class="error_field" v-if="error">{{ error }}</p>
    <div>
      <label for="name">Имя:</label>
      <input id="name" v-model.trim="name" placeholder="Введите имя" required />
    </div>

    <div>
      <label for="country">Страна:</label>
      <input id="country" v-model.trim="country" placeholder="Ваша страна" required />
    </div>

    <div>
      <label for="city">Город:</label>
      <input id="city" v-model.trim="city" placeholder="Ваш город" required />
    </div>

    <div>
      <label for="district">Район:</label>
      <input id="district" v-model.trim="district" placeholder="Ваш район" required />
    </div>

    <div>
      <label for="street">Улица:</label>
      <input id="street" v-model.trim="street" placeholder="Название улицы" required />
    </div>

    <div>
      <label for="house">Адрес (номер дома):</label>
      <input id="house" v-model.trim="house" placeholder="Дом, квартира" required />
    </div>

    <button type="submit" @click="handler">Добавить жителя</button>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
.error_field {
  color: red;
}
</style>
