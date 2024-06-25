<template>
  <div class="albums">
    <div class="album-container">
      <h2 class="title">Pilih Album</h2>
      <div class="album-table">
        <div class="album-row">
          <label for="albumSelect">Select an album:</label>
          <select id="albumSelect" v-model="selectedAlbumId" @change="handleAlbumChange">
            <option v-for="album in albums" :key="album.id" :value="album.id">{{ album.title }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useAlbumsStore } from '../stores/album';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const albums = ref([]);
    const selectedAlbumId = ref(null); 
    const albumsStore = useAlbumsStore();
    const router = useRouter();

    onMounted(async () => {
      await albumsStore.fetchAlbums();
      albums.value = albumsStore.albums;
    });

    const handleAlbumChange = () => {
      if (selectedAlbumId.value) {
        router.push(`/albums/${selectedAlbumId.value}`);
      }
    };

    return {
      albums,
      selectedAlbumId,
      handleAlbumChange,
    };
  },
});
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
  color: #000000;
}

.albums {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

.album-container {
  text-align: center;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: -180px; 
}

.title {
  font-size: 2.5rem; 
  font-weight: bold; 
  color: #000000; 
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4); 
}

.album-table {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.album-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

label {
  margin-bottom: 10px;
}

select {
  padding: 5px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
