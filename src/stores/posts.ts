import { defineStore } from 'pinia'
import type { IPost, IPostsStore } from '@/types'

export const usePostsStore = defineStore('posts', {
  state: (): IPostsStore => ({
    posts: [],
    processing: true,
    currentPage: 1,
    itemsPerPage: 10,
    searchWord: '',
  }),

  getters: {
    modifiedPosts: (state: IPostsStore) => {
      const start = ((state.searchWord ? 1 : state.currentPage) - 1) * state.itemsPerPage
      const end = start + state.itemsPerPage
      return state.posts
        .filter(post => post.name.toLowerCase().includes(state.searchWord.toLowerCase()))
        .slice(start, end)
    },
    pageCount: (state: IPostsStore) => {
      return Math.ceil(state.posts.length / state.itemsPerPage)
    },
  },

  actions: {
    async fetchPosts () {
      const response = await api.get('/posts/test.json')
      this.posts = response.posts
      this.savePosts()
    },
    async init () {
      const storedPosts = localStorage.getItem('posts')
      if (storedPosts) {
        this.posts = JSON.parse(storedPosts)
        if (!this.posts.length) {
          await this.fetchPosts()
        }
      } else {
        await this.fetchPosts()
      }
      this.processing = false
    },
    getById (id: string) {
      return this.posts.find(post => post.id === id)
    },
    savePosts () {
      localStorage.setItem('posts', JSON.stringify(this.posts))
    },
    editPost (data: IPost) {
      const post = this.posts.find(post => post.id === data.id)
      if (post) {
        post.name = data.name
        this.savePosts()
      }
    },
    deletePost (id: string, redirect = false) {
      this.posts = this.posts.filter(post => post.id !== id)
      this.savePosts()
      if (redirect) {
        this.$router.push('/')
      }
    },
  },
})
