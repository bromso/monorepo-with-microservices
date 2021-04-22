<template>
  <v-row justify="center" align="center">
    <div>
      <div v-if="$apollo.queries.casino.loading">Loading...</div>
      <div v-if="casino">
        <h1>{{ casino.name }}</h1>
        <p>{{ casino.address }}</p>
      </div>
      <div>
        <form @submit.prevent="saveData">
          <input v-model="name" />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  </v-row>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    data: () => ({
      name: "Jonas",
      loading: false,
    }),
    apollo: {
      casino: {
        query: gql`
          query ($id: ID!) {
            casino: node(id: $id) {
              ... on Casino {
                name
                address
              }
            }
          }
        `,
        variables() {
          return { id: this.$route.params.id };
        }
      }
    },
    methods: {
      async saveData() {
        console.log("Hello");
        // const result = await this.$apollo.mutate({
        //   mutation: gql`mutation ($label: String!) {
        //     addTag(label: $label) {
        //       id
        //       label
        //     }
        //   }`,
        //   variables: {
        //     label: this.name,
        //   },
        // });
      }
    }
  }
</script>
