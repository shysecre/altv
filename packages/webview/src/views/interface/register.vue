<script setup lang="ts">
import { alt } from "@/utils/alt";
import { LocalWebViewEvents, type AuthRegisterData } from "shared";
import { ref } from "vue";

const username = ref("");
const password = ref("");

function handleSubmit() {
  const registerData: AuthRegisterData = {
    password: password.value,
    username: username.value
  };

  alt.emit(LocalWebViewEvents.AUTH_COMPLETE_REGISTER, registerData);
}
</script>

<template>
  <div class="blur" />
  <div class="ui">
    <h1>REGISTRATION FORM 👿</h1>
    <form class="form" @submit.prevent="handleSubmit">
      <div class="form-input-container">
        <label class="form-label" for="username">Username</label>
        <input
          class="form-input"
          v-model="username"
          name="username"
          autocomplete="off"
        />
      </div>
      <div class="form-input-container">
        <label class="form-label" for="password">Password</label>
        <input
          class="form-input"
          v-model="password"
          name="password"
          autocomplete="new-password"
          type="password"
        />
      </div>
    </form>

    <button @click="handleSubmit" class="login-button">Register</button>
    <button @click="$router.push('/login')">
      Have an account? Login instead!
    </button>
  </div>
</template>

<style scoped>
.ui {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;
  color: white;
}

.login-button {
  border: none;
  width: 200px;
  height: 25px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.blur {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("https://images.pexels.com/photos/1358833/pexels-photo-1358833.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
}

.form-input-container {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 20px;
}

.form-input {
  height: 0.2rem;
  width: 1.8rem;
}
</style>
