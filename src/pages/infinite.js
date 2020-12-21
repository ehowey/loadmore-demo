import React, { useState, useEffect, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Article from "../components/article"

const Page = () => {
  const data = useStaticQuery(graphql`
    {
      allNewsJson {
        nodes {
          id
          title
          date
          author
          summary
        }
      }
    }
  `)
  // Array of all news articles
  const allNews = data.allNewsJson.nodes

  // State for the list
  const [list, setList] = useState([...allNews.slice(0, 10)])

  // State to trigger oad more
  const [loadMore, setLoadMore] = useState(false)

  // State of whether there is more to load
  const [hasMore, setHasMore] = useState(allNews.length > 10)

  //Set a ref for the loading div
  const loadRef = useRef()

  // Handle intersection with load more div
  const handleObserver = (entities) => {
    const target = entities[0]
    if (target.isIntersecting) {
      setLoadMore(true)
    }
  }

  //Initialize the intersection observer API
  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    }
    const observer = new IntersectionObserver(handleObserver, options)
    if (loadRef.current) {
      observer.observe(loadRef.current)
    }
  }, [])

  // Handle loading more articles
  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < allNews.length
      const nextResults = isMore
        ? allNews.slice(currentLength, currentLength + 10)
        : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore]) //eslint-disable-line

  //Check if there is more
  useEffect(() => {
    const isMore = list.length < allNews.length
    setHasMore(isMore)
  }, [list]) //eslint-disable-line

  return (
    <div>
      <h1>Load more demo</h1>
      <div>
        {list.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </div>
      <div ref={loadRef}>
        {hasMore ? <p>Loading...</p> : <p>No more results</p>}
      </div>
    </div>
  )
}

export default Page
