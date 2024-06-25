<template>
  <div class="form-container">
    <h2>Form Pendaftaran Kegiatan</h2>
    <table>
      <tr>
        <td><label for="activity">Kegiatan:</label></td>
        <td><input type="text" id="activity" v-model="newActivity"></td>
      </tr>
      <tr>
        <td><label for="date">Tanggal:</label></td>
        <td><input type="date" id="date" v-model="newDate"></td>
      </tr>
      <tr>
        <td><label for="time">Jam:</label></td>
        <td><input type="time" id="time" v-model="newTime"></td>
      </tr>
      <tr>
        <td><label for="hobby">Hobi:</label></td>
        <td><input type="text" id="hobby" v-model="newHobby"></td>
      </tr>
      <tr>
        <td colspan="2"><button @click="addActivity">Daftar</button></td>
      </tr>
    </table>

    <div class="col">
      <select class="form-control form-control-lg" v-model="currentFilter">
        <option value="all">Semua</option>
        <option value="undone">Belum Selesai</option>
        <option value="done">Selesai</option>
      </select>
    </div>

    <h2>Daftar Kegiatan</h2>
    <table>
      <tr v-for="(activity, index) in filteredActivities" :key="index">
        <td>
          <input type="checkbox" v-model="activity.completed">
        </td>
        <td :class="{ 'completed': activity.completed }">{{ activity.name }}</td>
        <td>{{ activity.date }}</td>
        <td>{{ activity.time }}</td>
        <td>{{ activity.hobby }}</td>
        <td><button @click="cancelActivity(index)">Batalkan</button></td>
        <td><button @click="editActivity(index)">Edit</button></td>
        <td><button @click="deleteActivity(index)">Hapus</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newActivity: '',
      newDate: '',
      newTime: '',
      newHobby: '',
      editIndex: null,
      activities: JSON.parse(localStorage.getItem('activities')) || [],
      currentFilter: 'all'
    };
  },
  computed: {
    filteredActivities() {
      if (this.currentFilter === 'undone') {
        return this.activities.filter(activity => !activity.completed);
      } else if (this.currentFilter === 'done') {
        return this.activities.filter(activity => activity.completed);
      } else {
        return this.activities;
      }
    }
  },
  watch: {
    activities: {
      handler() {
        localStorage.setItem('activities', JSON.stringify(this.activities));
      },
      deep: true
    }
  },
  methods: {
    addActivity() {
      if (this.newActivity && this.newDate && this.newTime && this.newHobby) {
        const newActivity = {
          name: this.newActivity,
          date: this.newDate,
          time: this.newTime,
          hobby: this.newHobby,
          completed: false
        };
        if (this.editIndex !== null) {
          this.activities.splice(this.editIndex, 1, newActivity);
          this.editIndex = null;
        } else {
          this.activities.push(newActivity);
        }
        this.clearForm();
      }
    },
    cancelActivity(index) {
      this.activities.splice(index, 1);
    },
    editActivity(index) {
      const activity = this.activities[index];
      this.newActivity = activity.name;
      this.newDate = activity.date;
      this.newTime = activity.time;
      this.newHobby = activity.hobby;
      this.editIndex = index;
    },
    deleteActivity(index) {
      this.activities.splice(index, 1);
    },
    clearForm() {
      this.newActivity = '';
      this.newDate = '';
      this.newTime = '';
      this.newHobby = '';
      this.editIndex = null;
    }
  }
};
</script>

<style scoped>
/* Bagian ini mengubah warna latar belakang form dan teks */
.form-container {
  margin: 20px;
  background-color: #5491c77a; /* Warna latar belakang form (AliceBlue) */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-container h2 {
  text-align: center;
  color: #333; /* Warna teks judul form */
}

table {
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
}

td, th {
  padding: 10px;
  border: 1px solid #ddd;
  color: #555; /* Warna teks */
}

button {
  background-color: #183361;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #c6b8c5;
}

input[type="text"], input[type="date"], input[type="time"], select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333; /* Warna teks input */
}

input[type="checkbox"] {
  margin-right: 10px;
}

.completed {
  text-decoration: line-through;
}
</style>
