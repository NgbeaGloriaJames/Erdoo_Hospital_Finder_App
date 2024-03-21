<template>
  <div class="app-content">
    <img alt="Vue logo" class="EHF_LOGO" src="../assets/EHF.png"  />
    
  <div class="mainintro">
    <h1>Hello, welcome!</h1>
  <div class="msgspc">{{ message }}</div>
  </div>

  <div class="secondintro">
    <router-link to="/Login"><button>Login</button></router-link>
    <router-link to="/Signup" class="sign-link"><p>Don't have an account? <strong>SignUp</strong></p></router-link>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const message = ref(`This app helps you find hospitals near you.`);

</script>

<style scoped>
p{
  margin-top: 10px;
  font-size:0.9rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

button{
  background-color: #328792;
  color:white;
  width: 100%;
  height: 35px;
  border-radius: 8px;
  border: none;
  margin-top: 25px;
  margin-bottom: 20px;
  border-radius: 100px;
  }

  .sign-link {
    text-decoration: none;
    color: #328792;
  }

  .app-content{
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
</style>

