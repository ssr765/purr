import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Post } from '@/models/Post'
import axios from '@/lib/axios'
import { useCommentService } from '@/services/commentService'
import { usePostService } from '@/services/postService'
import { toast } from 'vue-sonner'

export const usePostStore = defineStore('post', () => {
  const postService = usePostService()
  const commentService = useCommentService()

  const posts = ref<Post[]>([])
  const postDetail = ref<Post | null>(null)

  const fetchPosts = async () => {
    try {
      const response = await axios.get<Post[]>('/api/v1/posts')
      posts.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPostDetail = async (id: number) => {
    const postData = posts.value.find((post) => post.id === id)
    console.log(postData)
    if (postData) {
      postDetail.value = postData
      return
    }

    try {
      const response = await axios.get<Post>(`/api/v1/posts/${id}`)
      console.log(response.data)
      postDetail.value = response.data
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
    let oldLikeData
    if (postDetail.value) {
      oldLikeData = postDetail.value.likesData
    } else {
      oldLikeData = posts.value.find((post) => post.id === id)?.likesData
    }

    oldLikeData = { ...oldLikeData } as { count: number; isLiked: boolean }

    if (!oldLikeData) {
      throw new Error('Post not found')
    }

    if (!oldLikeData.isLiked) {
      if (postDetail.value) {
        postDetail.value.likesData.count++
        postDetail.value.likesData.isLiked = true
      } else {
        posts.value.find((post) => post.id === id)!.likesData.count++
        posts.value.find((post) => post.id === id)!.likesData.isLiked = true
      }
    } else {
      if (postDetail.value) {
        postDetail.value.likesData.count--
        postDetail.value.likesData.isLiked = false
      } else {
        posts.value.find((post) => post.id === id)!.likesData.count--
        posts.value.find((post) => post.id === id)!.likesData.isLiked = false
      }
    }

    try {
      liking.value = true
      let likeData

      if (!oldLikeData.isLiked) {
        likeData = await postService.like(id)
      } else {
        likeData = await postService.unlike(id)
      }

      if (postDetail.value) {
        postDetail.value.likesData = likeData
      } else {
        posts.value.find((post) => post.id === id)!.likesData = likeData
      }
    } catch (error) {
      toast.error('No se ha podido dar me gusta a la publicación')

      if (postDetail.value) {
        postDetail.value.likesData = oldLikeData
      } else {
        posts.value.find((post) => post.id === id)!.likesData = oldLikeData
      }
    } finally {
      liking.value = false
    }
  }

  return {
    posts,
    postDetail,
    liking,

    fetchPosts,
    fetchPostDetail,
    addComment,
    refreshCommentLike,
    toggleLike,
  }
})
