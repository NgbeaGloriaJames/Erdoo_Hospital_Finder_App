<template>
  <div>
    <input type="text" v-model="searchName" placeholder="Search by hospital name" @keyup.enter="search" />
    <select v-model="selectedCity">
      <option value="">All Cities</option>
      <option v-for="city in uniqueCities" :key="city">{{ city }}</option>
    </select>
    <button @click="search">Search</button>
    <ul>
      <li v-for="hospital in filteredHospitals" :key="hospital.id">
        {{ hospital.name }} - {{ hospital.city }} - {{ hospital.phonenumber }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
const searchName = ref("");
const selectedCity = ref("");
interface Hospital {
  id: string;
  name: string;
  city: string;
  phonenumber: string;
}

const hospitals = ref<Hospital[]>([]);
const cities = ref<string[]>([]);
const loadHospitals = async () => {
  let q = query(collection(db, "hospitals"));
  if (searchName.value) {
    q = query(q, where("name", ">=", searchName.value));
  }
  if (selectedCity.value) {
    q = query(q, where("city", "==", selectedCity.value));
  }
  if (selectedCity.value) {
    q = query(q, where("phonenumber", "==", selectedCity.value));
  }
  const querySnapshot = await getDocs(q);
hospitals.value = querySnapshot.docs.map(doc => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    city: data.city,
    phonenumber: data.phonenumber
  };
});
};
const loadCities = async () => {
  const q = query(collection(db, "hospitals"), where("city", "!=", ""));
  const querySnapshot = await getDocs(q);
  cities.value = Array.from(
    new Set(querySnapshot.docs.map((doc) => doc.data().city))
  );
};
const search = () => {
  loadHospitals();
};
loadCities();
const filteredHospitals = computed(() => {
  return hospitals.value.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchName.value.toLowerCase()) &&
      (selectedCity.value ? hospital.city === selectedCity.value : true)
  );
});
const uniqueCities = computed(() => Array.from(new Set(cities.value)));
</script>
