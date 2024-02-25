import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

interface Content {
    postData?: {
        caption: string
        likes: number
        comments: number
    }
    comments?: Array<{
        username: string
        content: string
    }>
    catData?: {
        name: string
    }
}

export const useAsideStore = defineStore('aside', () => {
    const content: Ref<Content> = ref({})

    const postDetails = (postId: number) => {
        // Mock data, when the backend is ready, retrive the info from the API.
        content.value = {
            postData: {
                caption: 'Lorem ipsum',
                likes: 222,
                comments: 222
            },
            comments: [
                {
                    username: 'ssr765',
                    content: 'Lorem Ipsum'
                },
                {
                    username: 'ssr765',
                    content: 'Lorem Ipsum'
                },
                {
                    username: 'ssr765',
                    content: 'Lorem Ipsum'
                }
            ],
            catData: {
                name: 'Bicho'
            }
        }
    }

    return {
        content,
        postDetails
    }
})
