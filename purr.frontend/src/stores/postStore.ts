import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Post } from '@/models/Post'
import { useCommentService } from '@/services/commentService'
import { usePostService } from '@/services/postService'
import { toast } from 'vue-sonner'
import type { AxiosError } from 'axios'
import { useCommentStore } from './commentStore'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { Comment } from '@/models/Comment'

export const usePostStore = defineStore('post', () => {
  const { t } = useI18n()
  const router = useRouter()
  const postService = usePostService()
  const commentStore = useCommentStore()
  const commentService = useCommentService()

  const posts = ref<Post[]>([])
  const postDetail = ref<Post | null>(null)
  const nextPageExists = ref(true)
  const loading = ref(false)
  const loadingMore = ref(false)

  const fetchExplore = async (page: number = 1) => {
    try {
      page === 1 ? (loading.value = true) : (loadingMore.value = true)
      const response = await postService.fetchExplore(page)
      console.log(response)
      posts.value = [...posts.value, ...response.data]
      nextPageExists.value = response.links.next !== null
    } catch (error) {
      console.log(error)
      toast.error(t('app.posts.toast.fetchError'))
    } finally {
      loading.value = false
      loadingMore.value = false
    }
  }

  const fetchFeed = async (page: number = 1) => {
    try {
      page === 1 ? (loading.value = true) : (loadingMore.value = true)
      const response = await postService.fetchFeed(page)
      console.log(response)
      posts.value = [...posts.value, ...response.data]
      nextPageExists.value = response.links.next !== null
    } catch (error) {
      console.log(error)
      toast.error(t('app.posts.toast.fetchError'))
    } finally {
      loading.value = false
      loadingMore.value = false
    }
  }

  const fetchPostDetail = async (id: number) => {
    const postData = posts.value.find((post) => post.id === id)
    console.log(postData)
    if (postData) {
      postDetail.value = postData

      // Fetch comments if not all comments are loaded.
      if (postDetail.value.commentsCount > postDetail.value.comments.length) {
        const comments = await commentStore.fetchComments(id)
        postDetail.value.comments = comments
      }

      return
    }

    try {
      const post = await postService.fetchPostDetail(id)
      postDetail.value = post
    } catch (error) {
      console.log(error)
      toast.error(t('app.posts.detail.toast.fetchError'))
    }
  }

  const deletePost = async (id: number) => {
    try {
      await postService.deletePost(id)
      posts.value = posts.value.filter((post) => post.id !== id)
      if (postDetail.value?.id === id) {
        postDetail.value = null
        router.push({ name: 'app-feed' })
      }
      toast.success(t('app.posts.detail.toast.postDeleted'))
    } catch (error) {
      console.log(error)
      toast.error(t('app.posts.detail.toast.deleteError'))
    }
  }

  const addComment = async (id: number, content: string) => {
    try {
      const comment = await commentService.create(id, content)

      if (postDetail.value) {
        postDetail.value.comments.push(comment)
        postDetail.value.commentsCount++
      }
    } catch (error) {
      console.log(error)
      toast.error(t('app.comments.toast.createError'))
    }
  }

  const commentLiking = ref(false)
  const toggleCommentLike = async (id: number) => {
    const updateLikeData = (
      comment: Comment,
      newLikeData: { count: number; isLiked: boolean },
    ) => {
      comment.likesCount = newLikeData.count
      comment.liked = newLikeData.isLiked
    }

    const commentToLike =
      postDetail.value?.comments.find((comment) => comment.id === id) ||
      posts.value
        .find((post) => post.id === id)
        ?.comments.find((comment) => comment.id === id)

    if (!commentToLike) return

    const oldLikeData = {
      count: commentToLike.likesCount,
      isLiked: commentToLike.liked,
    }

    // Actualizar UI de forma optimista
    commentToLike.liked = !oldLikeData.isLiked
    commentToLike.likesCount += commentToLike.liked ? 1 : -1

    try {
      commentLiking.value = true
      const likeData = commentToLike.liked
        ? await commentService.like(id)
        : await commentService.unlike(id)
      updateLikeData(commentToLike, likeData)
    } catch (error) {
      const axiosError = error as AxiosError
      toast.error(
        !oldLikeData.isLiked
          ? t('app.comments.toast.likeError')
          : t('app.comments.toast.unlikeError'),
      )
      // Revertir si hay error
      const likeData = axiosError.response!.data as {
        count: number
        isLiked: boolean
      }

      updateLikeData(commentToLike, likeData)
    } finally {
      commentLiking.value = false
    }
  }

  const liking = ref(false)
  const toggleLike = async (id: number) => {
    const updateLikeData = (
      post: Post,
      newLikeData: { count: number; isLiked: boolean },
    ) => {
      post.likesData.count = newLikeData.count
      post.likesData.isLiked = newLikeData.isLiked
    }

    const postToLike =
      postDetail.value || posts.value.find((post) => post.id === id)

    if (!postToLike) throw new Error('Publicación no encontrada')

    const oldLikeData = { ...postToLike.likesData }

    // Actualizar UI de forma optimista
    postToLike.likesData.isLiked = !oldLikeData.isLiked
    postToLike.likesData.count += postToLike.likesData.isLiked ? 1 : -1

    try {
      liking.value = true
      const likeData = postToLike.likesData.isLiked
        ? await postService.like(id)
        : await postService.unlike(id)
      updateLikeData(postToLike, likeData)
    } catch (error) {
      const axiosError = error as AxiosError
      toast.error(
        !oldLikeData.isLiked
          ? t('app.posts.toast.likeError')
          : t('app.posts.toast.unlikeError'),
      )
      // Revertir si hay error
      const likeData = axiosError.response!.data as {
        count: number
        isLiked: boolean
      }
      updateLikeData(postToLike, likeData)
    } finally {
      liking.value = false
    }
  }

  const saving = ref(false)
  const toggleSave = async (id: number) => {
    const postToSave =
      postDetail.value || posts.value.find((post) => post.id === id)

    if (!postToSave) throw new Error('Publicación no encontrada')

    const oldSaveData = { ...postToSave.savesData }

    // Actualizar UI de forma optimista
    postToSave.savesData.isSaved = !oldSaveData.isSaved
    postToSave.savesData.count += postToSave.savesData.isSaved ? 1 : -1

    try {
      saving.value = true
      const saveData = postToSave.savesData.isSaved
        ? await postService.save(id)
        : await postService.unsave(id)
      postToSave.savesData.count = saveData.count
      postToSave.savesData.isSaved = saveData.isSaved
    } catch (error) {
      toast.error(
        !oldSaveData.isSaved
          ? t('app.posts.toast.saveError')
          : t('app.posts.toast.unsaveError'),
      )
      // Revertir si hay error
      postToSave.savesData.count = oldSaveData.count
      postToSave.savesData.isSaved = oldSaveData.isSaved
    } finally {
      saving.value = false
    }
  }

  const fetchSavedPosts = async () => {
    try {
      const response = await postService.getSavedPosts()
      posts.value = response
    } catch (error) {
      console.log(error)
    }
  }

  const fetchLikedPosts = async () => {
    try {
      const response = await postService.getLikedPosts()
      posts.value = response
    } catch (error) {
      console.log(error)
    }
  }

  const removeComment = (postId: number, commentId: number) => {
    const post = posts.value.find((post) => post.id === postId)
    if (post) {
      post.comments = post.comments.filter(
        (comment) => comment.id !== commentId,
      )
      post.commentsCount--
    }

    if (postDetail.value && postDetail.value.id === postId) {
      postDetail.value.comments = postDetail.value.comments.filter(
        (comment) => comment.id !== commentId,
      )

      // Do not double decrement comments count
      if (!post) {
        postDetail.value.commentsCount--
      }
    }
  }

  return {
    posts,
    postDetail,
    liking,
    commentLiking,
    saving,
    loading,
    loadingMore,
    nextPageExists,

    fetchExplore,
    fetchFeed,
    fetchPostDetail,
    deletePost,
    addComment,
    toggleCommentLike,
    toggleLike,
    toggleSave,
    fetchSavedPosts,
    fetchLikedPosts,
    removeComment,
  }
})
