<script setup lang="ts">
  import { storeToRefs } from 'pinia'

  const router = useRouter()

  const postsStore = usePostsStore()

  const { deletePost } = postsStore
  const {
    modifiedPosts,
    pageCount,
    currentPage,
    searchWord,
  } = storeToRefs(postsStore)
</script>
<template>
  <v-container>
    <div :class="$style.filter">
      <div :class="$style.filter__wrapper">
        <p :class="$style.filter__label">Поиск по названию</p>
        <v-text-field v-model="searchWord" />
      </div>
    </div>
    <v-row>
      <v-col v-for="post in modifiedPosts" :key="post.id" cols="12" md="6">
        <v-card class="d-flex flex-column fill-height" link>
          <v-card-title>
            <RouterLink :class="$style.post_title" :to="`/${post.id}`">
              {{ post.name }}
            </RouterLink>
          </v-card-title>
          <v-card-actions>
            <v-btn color="red" @click="deletePost(post.id)">Удалить</v-btn>
            <v-btn color="blue" @click="router.push(`/${post.id}`)">Редактировать</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="5">
        <v-container class="max-width">
          <v-pagination
            v-model="currentPage"
            :hide-on-small="false"
            :length="pageCount"
          />
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" module>
@import '@/styles/posts';
</style>
