import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Post } from '@/models/Post'
import { useCommentService } from '@/services/commentService'
import { usePostService } from '@/services/postService'
import { toast } from 'vue-sonner'
import type { AxiosError } from 'axios'
import { useCommentStore } from './commentStore'
import { useRouter } from 'vue-router'

export const usePostStore = defineStore('post', () => {
  const router = useRouter()
  const postService = usePostService()
  const commentStore = useCommentStore()
  const commentService = useCommentService()

  const posts = ref<Post[]>([])
  const postDetail = ref<Post | null>(null)
  const nextPageExists = ref(true)
  const loading = ref(false)
  const loadingMore = ref(false)

  const fetchExplore = async () => {
    try {
      loading.value = true
      const exploreFeed = await postService.fetchExplore()
      posts.value = exploreFeed
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  const fetchFeed = async (page: number = 1) => {
    try {
      page === 1 ? (loading.value = true) : (loadingMore.value = true)
      const response = await postService.fetchFeed(page)
      posts.value = [...posts.value, ...response.data]
      nextPageExists.value = response.links.next !== null
    } catch (error) {
      console.log(error)
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
    } catch (error) {
      console.log(error)
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
    }
  }

  const refreshCommentLike = async (
    postId: Number,
    commentId: Number,
    like: boolean,
  ) => {
    const post = posts.value.find((post) => post.id === postId)
    if (post) {
      const comment = post.comments.find((comment) => comment.id === commentId)
      if (comment) {
        comment.liked = like
        if (like) {
          comment.likesCount++
        } else {
          comment.likesCount--
        }
      }
    }

    if (postDetail.value && postDetail.value.id) {
      const comment = postDetail.value.comments.find(
        (comment) => comment.id === commentId,
      )
      if (comment) {
        comment.liked = like
        if (like) {
          comment.likesCount++
        } else {
          comment.likesCount--
        }
      }
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
          ? 'No se ha podido dar me gusta a la publicación'
          : 'No se ha podido quitar el me gusta de la publicación',
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
      const axiosError = error as AxiosError
      toast.error(
        !oldSaveData.isSaved
          ? 'No se ha podido guardar la publicación'
          : 'No se ha podido quitar la publicación guardada',
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
    saving,
    loading,
    loadingMore,
    nextPageExists,

    fetchExplore,
    fetchFeed,
    fetchPostDetail,
    deletePost,
    addComment,
    refreshCommentLike,
    toggleLike,
    toggleSave,
    fetchSavedPosts,
    fetchLikedPosts,
    removeComment,
  }
})
