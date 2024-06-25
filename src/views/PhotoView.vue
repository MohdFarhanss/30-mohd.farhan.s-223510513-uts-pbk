<template>
  <div class="container">
    <div class="album-detail">
      <h1>{{ albumTitle }}</h1>
      <div class="photos-grid">
        <div
          class="photo-container"
          v-for="(photo, index) in photos"
          :key="index"
          @click="showPhoto(photo.url)"
        >
          <img :src="photo.thumbnailUrl" :alt="photo.title" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAlbumsStore } from '../stores/album';
import { usePhotosStore } from '../stores/photo';

export default defineComponent({
  setup() {
    const route = useRoute();
    const albumTitle = ref('');
    const photos = ref([]);
    const albumsStore = useAlbumsStore();
    const photosStore = usePhotosStore();

    onMounted(async () => {
      const albumId = route.params.id;
      await photosStore.fetchPhotos(albumId);
      photos.value = photosStore.photos;
      albumTitle.value = albumsStore.albums.find(album => album.id == albumId)?.title;
    });

    const showPhoto = (url) => {
      window.open(url);
    };

    return {
      albumTitle,
      photos,
      showPhoto,
    };
  },
});
</script>

<style scoped>
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
  color: #343a40;
}

.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.album-detail {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.album-detail h1 {
  font-size: 2.5rem;
  color: #343a40;
  margin-bottom: 20px;
  font-weight: bolder;
  text-transform: uppercase;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.photo-container {
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  border: 2px solid #673ab7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.photo-container:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.photo-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s;
}

.photo-container img:hover {
  opacity: 0.8;
}
</style>
