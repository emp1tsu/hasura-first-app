<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <add-todo />
    <todo-list />
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue";
import AddTodo from "./components/AddTodo.vue";

export default {
  name: "app",
  components: {
    TodoList,
    AddTodo,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
