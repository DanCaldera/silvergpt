import React, { createContext, useCallback, useState } from 'react'

const PostContext = createContext({})

export default PostContext

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [showButton, setShowButton] = useState(true)

  const setPostsFromSSR = useCallback((postsFromSSR = []) => {
    setPosts(postsFromSSR)
  }, [])

  const getPosts = useCallback(async ({ lastPostDate }) => {
    const response = await fetch('/api/getPosts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lastPostDate
      })
    })

    const { posts: newPosts } = await response.json()

    if (newPosts.length === 0) {
      setShowButton(false)
    }

    setPosts((prevPosts = []) => [...prevPosts, ...newPosts])
  }, [])

  return <PostContext.Provider value={{ posts, setPostsFromSSR, getPosts }}>{children}</PostContext.Provider>
}
