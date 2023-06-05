import React, { createContext, useCallback, useState } from 'react'

const PostContext = createContext({})

export default PostContext

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [noMorePosts, setNoMorePosts] = useState(false)

  const setPostsFromSSR = useCallback((postsFromSSR = []) => {
    setPosts(postsFromSSR)
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

    setPosts(prevPosts => {
      const newPosts = [...prevPosts]
      postsResult.forEach(post => {
        const exists = newPosts.find(({ id }) => id === post.id)
        if (!exists) {
          newPosts.push(post)
        }
      })
      return newPosts
    })
  }, [])

  return <PostContext.Provider value={{ posts, setPostsFromSSR, getPosts, noMorePosts, setNoMorePosts }}>{children}</PostContext.Provider>
}
