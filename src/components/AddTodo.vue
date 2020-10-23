<template>
  <form @submit="submit">
    <fieldset>
      <input type="text" placeholder="トゥドゥ" v-model="title" />
    </fieldset>
    <input class="button-primary" type="submit" value="Send" />
  </form>
</template>

<script>
import gql from "graphql-tag";

// GraphQLクエリを作成します。INSERTなのでmutationです。
// 返り値としてINSERTしたレコードのidを指定しています。
const ADD_TODO = gql`
  mutation addTodo($title: String!) {
    insert_todos(objects: [{ title: $title }]) {
      returning {
        id
      }
    }
  }
`;

export default {
  name: "AddTodo",
  data() {
    return { title: "" };
  },
  methods: {
    // submit時にGraphQLでINSERTします。
    submit(e) {
      e.preventDefault();
      // apolloインスタンスを指定してmutateクエリを実行します。
      this.$apollo.mutate({
        mutation: ADD_TODO,
        variables: {
          title: this.title,
        },
        // INSERTした後画面をリロードしなくても良いように、TodoListで実行した取得用のクエリを自動で実行します。
        // 一度実行したクエリはメモリ上にキャッシュされていますので、クエリ名を指定します。
        refetchQueries: ["getTodos"],
      });
      this.title = "";
    },
  },
};
</script>
