<script setup>
const props = defineProps(["getTasks"]);
</script>

<template>
  <header class="header-background p-5 mb-4 mt-8 rounded-3 text-center animated-header-background">
    <h2><b>THIS IS MY PROJECT</b></h2>
  </header>
</template>

<style>
@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes moveLightning {
  0% { left: -100%; }
  50% { left: 200%; }
  100% { left: -100%; }
}

body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #809ebc;
  color: #343a40;
}

.header-background {
  position: relative;
  width: 100vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;
  margin-top: 5%;
  border-radius: 8px;
  color: #171111;
  background: linear-gradient(90deg, rgba(106, 0, 255, 0.481), rgba(255, 0, 251, 0.5), rgba(0, 255, 242, 0.5), rgba(0, 128, 0, 0.5), rgba(0, 0, 255, 0.5), rgba(75, 0, 130, 0.5), rgba(238, 130, 238, 0.5));
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); 
  box-shadow: 0 4px 8px rgba(159, 144, 144, 0.2);
  transition: transform 0.5s ease, box-shadow 0.5s ease; 
  overflow: hidden; /* Untuk memastikan elemen pseudo tidak meluap */
}

.header-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%);
  animation: moveLightning 10s infinite linear;
  z-index: 1;
}

.animated-header-background {
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;
}

.header-background:hover {
  transform: scale(1.05); /* Membesarkan saat hover */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Bayangan lebih dalam saat hover */
}

h2 {
  margin-bottom: 20px;
  font-size: 2.5em;
  font-weight: bold;
  color: #000000; /* Warna teks hitam */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Bayangan teks */
  z-index: 2; /* Memastikan teks berada di atas animasi pseudo-element */
}

p {
  font-size: 1.2em;
  color: #ffffff; /* Warna teks putih */
  background-color: rgba(0, 0, 0, 0.5); /* Latar belakang semi-transparan untuk teks */
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 2; /* Memastikan teks berada di atas animasi pseudo-element */
}

.animated-item:hover {
  transform: scale(1.1); 
}
</style>