<template>
  <div class="container">
    <div class="posts-container">
      <h2>Postingan</h2>
      <select v-model="selectedUser" @change="fetchPosts" class="user-select">
        <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
      </select>
      <table class="posts-table">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Isi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in posts" :key="index" class="post-item">
            <td class="post-title">{{ post.title }}</td>
            <td class="post-body">{{ post.body }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostsComponent',
  data() {
    return {
      users: [],
      posts: [],
      selectedUser: null
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
          this.users = users;
        });
    },
    fetchPosts() {
      if (this.selectedUser) {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`)
          .then(response => response.json())
          .then(posts => {
            this.posts = posts;
          });
      }
    },
    editPost(postId) {
      const post = this.posts.find(post => post.id === postId);
      const newTitle = prompt('Edit Judul', post.title);
      const newBody = prompt('Edit Isi', post.body);

      if (newTitle && newBody) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: newTitle, body: newBody, userId: this.selectedUser })
        })
          .then(response => response.json())
          .then(updatedPost => {
            post.title = updatedPost.title;
            post.body = updatedPost.body;
          });
      }
    },
    deletePost(postId) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE'
      }).then(() => {
        this.posts = this.posts.filter(post => post.id !== postId);
      });
    }
  }
};
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
}

.container {
  padding: 20px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

button.btn {
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button.btn:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

button.btn.primary {
  background-color: #007bff;
}

button.btn.primary:hover {
  background-color: #0056b3;
}

button.btn.secondary {
  background-color: #6c757d;
}

button.btn.secondary:hover {
  background-color: #5a6268;
}

form {
  margin: 20px 0;
  width: 80%;
  max-width: 400px;
  background: rgba(182, 175, 175, 0.705);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-control {
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.col {
  flex: 1;
  margin: 5px;
}

.col-md-2 {
  flex: 0 0 16.6667%;
  max-width: 16.6667%;
  margin-right: 10px;
}

.post-list, .todo-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  width: 80%;
  max-width: 600px;
}

.post-item, .todo-item {
  background: rgb(255, 255, 255);
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center; 
}

.post-item:hover, .todo-item:hover {
  background-color: #e9ecef;
  transform: translateY(-2px);
}

.posts-container {
  width: 100%;
  max-width: 800px;
}

.posts-container h2 {
  font-size: 2.5rem; 
  font-weight: bold; 
  color: #333;
  margin-bottom: 20px; 
  text-transform: uppercase; 
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4); 
}

.user-select {
  width: 100%;
  max-width: 200px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.posts-table {
  width: 100%;
  border-collapse: collapse;
}

.posts-table th,
.posts-table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.posts-table th {
  background-color: #f1f1f174;
}

.post-title {
  font-weight: bold;
}

.post-body {
  text-align: left;
}

.post-item {
  text-align: left;
}

</style>
