<template>
  <div>
    <h1>Hospitals</h1>
    <ul>
      <li v-for="hospital in hospitals" :key="hospital.id">
        <p>{{ hospital.name }}</p>
        <p>{{ hospital.address }}</p>
        <p>{{ hospital.phone }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const hospitals = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('https://api.example.com/hospitals');
    hospitals.value = response.data;
  } catch (error) {
    console.error('Error fetching hospitals:', error);
  }
});
</script>