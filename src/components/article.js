/** @jsx jsx */
import { jsx } from "theme-ui"

const Article = ({ article }) => {
  return (
    <div>
      <h3>{article.title}</h3>
      <p>{article.date}</p>
      <p>{article.author}</p>
      <p>{article.summary}</p>
    </div>
  )
}

export default Article
