<template>
  <div class="todo-app">
    <h1>To Do List</h1>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodo" placeholder="Add a task..." />
      <button type="submit" class="primary">Add</button>
    </form>
    <h2>List Items</h2>
    <div class="filter-section">
      <button @click="filterTodos('')" class="filter-btn">All</button>
      <button @click="filterTodos('active')" class="filter-btn">Not Completed</button>
      <button @click="filterTodos('completed')" class="filter-btn">Completed</button>
    </div>
    <ul class="todo-list">
      <li v-for="(todo, index) in filteredTodos" :key="index">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ 'done': todo.done }">{{ todo.text }}</span>
        <button @click="removeTodo(index)" class="danger">Remove</button>
      </li>
    </ul>
    <footer>
      <p>Created by sindi maharani </p>
    </footer>
  </div>
</template>



<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: [],
      filter: 'all',
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length === 0) {
        return;
      }
      this.todos.push({
        text: this.newTodo,
        done: false,
      });
      this.newTodo = '';
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    filterTodos(filterType) {
      this.filter = filterType;
    },
  },
  computed: {
    filteredTodos() {
      switch (this.filter) {
        case 'active':
          return this.todos.filter(todo => !todo.done);
        case 'completed':
          return this.todos.filter(todo => todo.done);
        default:
          return this.todos;
      }
    },
  },
};


</script>

<style>
/* General Styles */
body { color: black;
  font-family: "Dancing Script", cursive; /* Elegant cursive font */
  margin: 0;
  background-image: url(/src/assets/wlp.jpeg); 
  background: cover;
background-size: cover;
background-repeat: no-repeat; /* Light pink background */
}

/* Todo List Container */
.todo-app {
  max-width: 600px;
  margin: 40px auto;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  background-color: #fff; /* White background for clear text */
}

/* Heading */
.todo-app h1 {
  text-align: center;
  color: #a0b33a; /* Light purple heading */
  font-size: 2rem;
  margin-bottom: 20px;
}

/* Input Form */
.todo-app form {
  display: flex;
  margin-bottom: 20px;
}

.todo-app input[type=text] {
  flex: 1;
  padding: 15px 20px; /* Increase padding for a more spacious feel */
  font-size: 1.2rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); /* Subtle inset shadow for a touch of depth */
}

.todo-app button[type=submit] {
  margin-left: 10px;
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #c27fc4; /* Light purple button */
  color: #fff; /* White button */
}
.done {
  text-decoration: line-through; /* Strike through completed items */
  color: #888; /* Grayed out text for completed items */
}


</style>