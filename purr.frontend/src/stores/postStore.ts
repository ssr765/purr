import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Post } from '@/models/Post'
import axios from '@/lib/axios'
import type { Comment } from '@/models/Comment'
import { useCommentService } from '@/services/commentService'

export const usePostStore = defineStore('post', () => {
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

  return {
    posts,
    postDetail,

    fetchPosts,
    fetchPostDetail,
    addComment,
    refreshCommentLike,
  }
})
