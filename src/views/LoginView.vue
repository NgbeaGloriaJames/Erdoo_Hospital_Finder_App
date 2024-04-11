<template>
  <div class="login">
    <h2>Welcome Back!!!</h2>
    <p>Enter your credentials to login</p>
    <form @submit.prevent="login">
      <input type="text" v-model="email" id="email" placeholder="Email" required>
      <input type="password" v-model="password" id="password" placeholder="password" required>
      <button class='submit' @click="login">Submit</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
    <router-link to="/Signup" class="sign-link"><p>Don't have an account? <strong>SignUp</strong></p></router-link>


  </div>

</template>

<script setup lang="ts">
import {auth} from '../firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { ref } from 'vue';
import { onMounted } from 'vue'; // Import onMounted from vue
import router from "../router/index"

const email = ref('');
const password = ref('');
const error = ref('');

 const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log("user login successful!");
    router.push("/search");
  } catch (error) {
    console.log("error!!!");
  }
};
onMounted(() => {
  email.value = '';
  password.value = '';
});

</script>

<style scoped>

.login {
  touch-action: manipulation;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
}

input {
  width: 80%;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 2px #0000 solid  ;
  outline: none;
  font-size: 16px
}

.submit {
  width: 90%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #328792;
  color:white;
  height: 40px;
  border: none;
  width: 0 auto;

}

.error {
  color: red;
  margin-top: 10px;
}

.sign-link {
  position: relative;
  top: 800px;
  text-decoration: none;
  color: #328792;

}

@media (min-width:350px) and (max-width: 750px){
  .login{
    width: 80%;
    background-color: whitesmoke;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .sign-link {
    position: relative;
    top: 80px;
    text-decoration: none;
    color: #328792;
  }
  .submit:hover{
    background-color: white;
    color:#328792;
    border-radius: 20px;
  }
 
}
@media (min-width:750px) and (max-width: 1440px){
  .login{
    width: 80%;
    background-color: whitesmoke;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .sign-link {
    position: relative;
    top: 80px;
    text-decoration: none;
    color: #328792;
  }

  .submit:hover{
    background-color: white;
    color:#328792;
    border-radius: 20px;
  }
  

}
</style>
