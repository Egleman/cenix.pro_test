<script setup lang="ts">
  import { IPost } from '@/types'

  const router = useRouter()
  const route = useRoute()

  const postsStore = usePostsStore()
  const { editPost, deletePost } = postsStore

  const post = ref<IPost>({ id: '', name: '' })

  const foundPost = postsStore.getById(route.params.id)

  if (!foundPost) {
    router.push({ path: '/' })
  } else {
    post.value = foundPost
  }
</script>
<template>
  <v-container>
    <v-textarea v-model="post.name" variant="solo-filled" />
    <div class="d-flex ga-3">
      <v-btn color="red" @click="deletePost(post.id, true)">Удалить</v-btn>
      <v-btn color="blue" @click="editPost(post)">Сохранить</v-btn>
    </div>
  </v-container>
</template>
