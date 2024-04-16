import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { PostInput } from '@/models/Post'
import axios from '@/lib/axios'
import { useRouter } from 'vue-router'

export const useCreatePostStore = defineStore('createPost', () => {
  const router = useRouter()

  const loading = ref(false)
  const post = ref<PostInput | null>(null)

  const postMediaPreview = computed(() => {
    return post.value?.file ? URL.createObjectURL(post.value.file) : null
  })

  const reset = () => {
    post.value = null
  }

  const createPost = async () => {
    if (!post.value) return

    loading.value = true

    const fd = new FormData()
    if (post.value.file) {
      fd.append('file', post.value.file)
    } else {
      return
    }

    if (post.value.cat_id) {
      fd.append('cat_id', post.value.cat_id.toString())
    } else {
      return
    }

    if (post.value.caption) {
      fd.append('caption', post.value.caption)
    }

    fd.append('type', 'normal')

    try {
      const response = await axios.post('/api/v1/posts', fd)
      router.push({ name: 'app-post', params: { id: response.data.id } })
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    post,
    postMediaPreview,

    reset,
    createPost,
  }
})
