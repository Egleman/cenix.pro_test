<template>
  <v-app>
    <v-main v-if="!processing">
      <router-view />
    </v-main>
    <v-container v-if="processing" :class="$style.processing" fill-height fluid>
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <v-progress-circular
            color="primary"
            indeterminate
            size="70"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia'

  const postsStore = usePostsStore()
  const { processing } = storeToRefs(postsStore)

  onMounted(async () => {
    await postsStore.init()
  })
</script>

<style lang="scss" module>
@import '@/styles/posts';
</style>
