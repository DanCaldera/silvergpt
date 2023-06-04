import React, { createContext, useCallback, useState } from 'react'

const PostContext = createContext({})

export default PostContext

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([])

  const setPostsFromSSR = useCallback((postsFromSSR = []) => {
    setPosts(postsFromSSR)
  }, [])

  console.log('posts', posts)

  return <PostContext.Provider value={{ posts, setPostsFromSSR }}>{children}</PostContext.Provider>
}
