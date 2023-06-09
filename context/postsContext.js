import React, { createContext, useCallback, useReducer, useState } from 'react'

const PostContext = createContext({})

export default PostContext

const postsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_POSTS':
      const newPosts = [...state]
      action.posts.forEach(post => {
        const exists = newPosts.find(({ id }) => id === post.id)
        if (!exists) {
          newPosts.push(post)
        }
      })
      return newPosts
    case 'DELETE_POST':
      return state.filter(({ id }) => id !== action.postId)
    default:
      return state
  }
}

export const PostsProvider = ({ children }) => {
  const [posts, dispatch] = useReducer(postsReducer, [])
  const [noMorePosts, setNoMorePosts] = useState(false)

  const setPostsFromSSR = useCallback((postsFromSSR = []) => {
    dispatch({ type: 'ADD_POSTS', posts: postsFromSSR })
  }, [])

  const deletePost = useCallback(async postId => {
    const response = await fetch('/api/deletePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        postId
      })
    })

    const { success } = await response.json()

    if (success) {
      dispatch({ type: 'DELETE_POST', postId })
    }
  }, [])

  const getPosts = useCallback(async ({ lastPostDate, getNewerPosts = false }) => {
    const response = await fetch('/api/getPosts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lastPostDate,
        getNewerPosts
      })
    })

    const { posts: postsResult } = await response.json()

    if (postsResult.length === 0) {
      setNoMorePosts(true)
      return
    }

    dispatch({ type: 'ADD_POSTS', posts: postsResult })
  }, [])

  return (
    <PostContext.Provider value={{ posts, setPostsFromSSR, getPosts, noMorePosts, setNoMorePosts, deletePost }}>
      {children}
    </PostContext.Provider>
  )
}
