<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="signup">
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Sign Up</button>
    </form>
    <!-- <div>
      <p>Or sign up with Google:</p>
      <button @click="signUpWithGoogle">Sign Up with Google</button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import {auth} from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { ref } from 'vue';
import router from "../router/index"

const email = ref('');
const password = ref('');
const error = ref('');

const signup = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    console.log("user login successful!");
    router.push("/search")
  } catch (error) {
    console.log("error!!!");
  }
 
};

</script>








<style scoped>
.sign-link {
  text-decoration: none;
  color: #328792;
}


</style>