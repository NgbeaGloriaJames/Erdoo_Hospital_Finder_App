<template >
  <img alt="Vue logo" class="EHF_LOGO" src="../assets/EHF.png"  />
  <div class="search">
    <div class="seaching">
    <input type="text" v-model="searchName" placeholder="Search by hospital name" @keyup.enter="search" />
    <select v-model="selectedCity">
      <option value="">All Cities</option>
      <option v-for="city in uniqueCities" :key="city">{{ city }}</option>
    </select>
    <button class='btnsearch'@click="search">Search</button>
  </div>
    <div class="search-result">
      <ol v-for="hospital in filteredHospitals" :key="hospital.id">
      📛  {{ hospital.name }} <br> 🏙{{ hospital.city }} <br>
       📞 {{ hospital.phonenumber }}
      </ol>
    </div>
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


<style scoped>

.search{
  max-width: 350px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center content vertically */
  align-items: center;
  height: auto;
}

.seaching{
  display: flex;
  flex-direction: row;
  padding: 20px;
  border-radius: 10px;
  height: 30px;
}

.search-result{
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Three items per row */  grid-gap: 20px; /* Adjust spacing between items */
    }


ol{
  border: 1px grey solid;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size:0.8em;
  box-sizing: border-box;
  line-height:2em;
  background-color: #ccc;
  padding: 20px;
  box-sizing: border-box;
  }


input{
  border-radius: 10px ;
  border: 2px solid #1d1e1f;
  outline: none;
}

select{
  outline: none;
  border: 2px solid #5f6368;
  border-radius: 10px ;
}

.btnsearch{
  outline: none;
  border: 2px solid #5f6368;
   border-radius: 10px ;
}

</style>