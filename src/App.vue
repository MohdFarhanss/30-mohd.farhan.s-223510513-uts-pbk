<template>
  <div id="app">
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="custom-navbar animated-navbar">
        <q-toolbar>
          <q-btn flat round dense class="header-icon" href="https://www.instagram.com/mhd__farhan_?igsh=MXRlcDNqY2NvZjBjMw==" target="_blank">
            <q-icon name="assignment_ind" size="30px" /> 
          </q-btn>
          <q-toolbar-title class="custom-title">
            <strong>FARHAN's UAS PROJECT</strong>
          </q-toolbar-title>
          
          <router-link to="/" exact-active-class="active" class="q-item animated-item" exact>
            <q-icon name="home" />
            <q-item-label>Home</q-item-label>
          </router-link>
          <router-link to="/todos" exact-active-class="active" class="q-item animated-item" exact>
            <q-icon name="list_alt" />
            <q-item-label>Todos</q-item-label>
          </router-link>
          <router-link to="/posts" exact-active-class="active" class="q-item animated-item" exact>
            <q-icon name="article" />
            <q-item-label>Post</q-item-label>
          </router-link>
          <router-link to="/albums" exact-active-class="active" class="q-item animated-item" exact>
            <q-icon name="photo_album" />
            <q-item-label>Album</q-item-label>
          </router-link>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Bagian ini menambahkan warna latar belakang dasar aplikasi menjadi pink soft */
body {
  background-color: #304b368c !important; /* Warna pink soft */
}

.custom-navbar {
  background: rgb(61, 8, 4) !important; /* Tetap seperti sebelumnya */
  color: #000000; 
  height: 120px; 
  padding: 0 10px;
}

.custom-navbar .q-toolbar {
  display: flex;
  justify-content: flex-start; /* Ubah justify-content menjadi flex-start agar item berada di samping kiri */
  align-items: center; 
  padding: 0;
  height: 100%; 
}

.custom-title {
  margin-left: 10px; /* Berikan margin kiri untuk memastikan ada jarak antara ikon dan judul */
}

.custom-title h3 {
  margin: 5;
  color: #000000;
  font-size: 2.0rem; 
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.719); /* Tambahkan bayangan teks untuk tampilan lebih baik */
}

.custom-navbar .q-item {
  display: flex;
  align-items: center;
  margin: 0 10px;
  padding: 0 5px; /* Perkecil padding item */
  transition: transform 0.3s ease-in-out; /* Tambahkan animasi transisi transform */
}

.custom-navbar .q-item-label {
  color: #070303; /* Warna teks link */
  font-weight: bold;
  margin-left: 5px; 
}

.custom-navbar .q-item:hover .q-item-label {
  color: #7b765f84; 
}

.custom-navbar .active .q-item-label {
  color: #7b765f84; 
}

.custom-navbar .q-icon {
  font-size: 1.2rem; 
  margin-right: 5px; 
}

.animated-item:hover {
  transform: scale(1.1); 
}
</style>
