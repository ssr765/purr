import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Post } from '@/models/Post'
import axios from '@/lib/axios'

export const usePostStore = defineStore('post', () => {
  const posts = ref<Post[]>([])

  const fetchPosts = async () => {
    try {
      const response = await axios.get<Post[]>('/api/v1/posts')
      posts.value = response.data
      console.log('posts', posts.value)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    posts,

    fetchPosts,
  }
})
