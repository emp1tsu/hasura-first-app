<template>
  <li :key="todo.id" v-on:click="removeTodo">{{ todo.title }}</li>
</template>

<script>
import gql from "graphql-tag";

// GraphQLクエリを作成します。DELETEなのでmutationです。
// idが一致するレコードを削除し、返り値として削除したレコード数を返します。
const REMOVE_TODO = gql`
  mutation removeTodo($id: Int!) {
    delete_todos(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export default {
  name: "TodoItem",
  props: ["todo"],
  methods: {
    removeTodo() {
      const { id } = this.todo;
      this.$apollo.mutate({
        mutation: REMOVE_TODO,
        variables: {
          id,
        },
        // DELETEした後画面をリロードしなくても良いように、TodoListで実行した取得用のクエリを自動で実行します。
        // 一度実行したクエリはメモリ上にキャッシュされていますので、クエリ名を指定します。
        refetchQueries: ["getTodos"],
      });
    },
  },
};
</script>
