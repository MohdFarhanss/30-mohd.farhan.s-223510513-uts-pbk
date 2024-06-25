<template>
  <div>
    <FormComponent @add-activity="handleAddActivity" :activities="activities"/>
  </div>
</template>

<script>
import FormComponent from '../components/RegistrationForm.vue'; // Ubah path sesuai dengan lokasi file form component

export default {
  components: {
    FormComponent
  },
  data() {
    return {
      activities: []  // Daftar kegiatan
    };
  },
  methods: {
    handleAddActivity(newActivity) {
      this.activities.push(newActivity);
    },
    handleUpdateActivity({ index, activity }) {
      this.activities.splice(index, 1, activity);
    },
    handleToggleCompletion(activity) {
      activity.completed = !activity.completed;
    },
    handleCancelActivity(index) {
      this.activities.splice(index, 1);
    }
  }
};
</script>
