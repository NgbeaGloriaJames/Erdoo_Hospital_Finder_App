<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="username">Email</label>
      <input type="text" v-model="email" id="email" required>
      <label for="password">Password</label>
      <input type="password" v-model="password" id="password" required>
      <button class="submit" type="submit">Login</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
  <router-link to="/Signup" class="sign-link"><p>Don't have an account? <strong>SignUp</strong></p></router-link>

</template>

<script setup lang="ts">
import {auth} from '../firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { ref } from 'vue';
import router from "../router/index"

const email = ref('');
const password = ref('');
const error = ref('');

 const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log("user login successful!");
    router.push("/search")
  } catch (error) {
    console.log("error!!!");
  }
 
};
</script>


<style scoped>

.login {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 50vh;
  justify-content: center;
  align-items: center;
}


input {
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 2px #328792 solid  ;
}

.submit {
  width: 80%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #328792;
  color:white;
  height: 40px;
  border-radius: 8px;
  border: none;
  margin-left: 30px;
  
  
}

.error {
  color: red;
  margin-top: 10px;
}
.sign-link {
  text-decoration: none;
  color: #eaeeee;
}
</style>
