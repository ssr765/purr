import { computed, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import type { PostInput } from '@/models/Post'
import { useRouter } from 'vue-router'
import { usePostService } from '@/services/postService'
import type { Analysis } from '@/models/Analysis'
import { toast } from 'vue-sonner'
import { useI18n } from 'vue-i18n'
import { usePostStore } from './postStore'

export const useCreatePostStore = defineStore('createPost', () => {
  const { t } = useI18n()
  const { postDetail } = storeToRefs(usePostStore())
  const postService = usePostService()
  const router = useRouter()

  const loading = ref(false)
  const post = ref<PostInput | null>(null)

  const analyzing = ref(false)
  const analysisData = ref<Analysis | null>(null)

  const postMediaPreview = computed(() => {
    return post.value?.file ? URL.createObjectURL(post.value.file) : null
  })

  const reset = () => {
    post.value = null
    analysisData.value = null
  }

  const onImageUpload = async (file: File) => {
    post.value = { file: file, cat_id: undefined, caption: '' } as PostInput

    try {
      analyzing.value = true
      analysisData.value = await postService.analyze(file)
    } catch (error) {
      toast.error(t('app.posts.create.errors.analyzeError'))
    } finally {
      analyzing.value = false
    }
  }

  const createPost = async () => {
    if (!post.value) return

    if (!post.value.cat_id) {
      toast.error(t('app.posts.create.errors.noCatSelected'))
      return
    }

    loading.value = true

    const fd = new FormData()
    if (post.value.file) {
      fd.append('file', post.value.file)
    } else {
      return
    }

    if (post.value.cat_id) {
      fd.append('cat_id', post.value.cat_id)
    } else {
      return
    }

    if (post.value.caption) {
      fd.append('caption', post.value.caption)
    }

    fd.append('type', 'normal')

    try {
      const post = await postService.createPost(fd)
      postDetail.value = post
      router.push({
        name: 'app-posts-detail',
        params: { id: post.id },
      })
    } catch (error) {
      toast.error(t('app.posts.create.errors.createError'))
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    post,
    postMediaPreview,
    analyzing,
    analysisData,

    reset,
    createPost,
    onImageUpload,
  }
})
