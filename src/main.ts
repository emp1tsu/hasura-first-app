import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import VueApollo from "vue-apollo";

Vue.config.productionTip = false;

// GraphQL APIへの接続先を設定する
const httpLink = new HttpLink({
  uri: "http://localhost:8080/v1/graphql",
});

const apolloClient = new ApolloClient({
  link: httpLink,
  // 実行したクエリをメモリにキャッシュします。
  cache: new InMemoryCache(),
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
