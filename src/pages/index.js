import React from "react"
import { Link } from "gatsby"

const Page = () => {
  return (
    <div>
      <h1>Load more and infinite scrolling demo</h1>
      <Link to="/load-more">Load more demo</Link>
      <br />
      <Link to="/infinite">Infinite scrolling demo</Link>
    </div>
  )
}

export default Page
