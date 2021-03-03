import Link from "next/link";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";
import { client } from "../prismic-configuration";
import classes from './index.module.css';

export default function BlogHome(props) {
  return (
    <div>
      <img className={classes.heroImage} src={props.home.data.hero_image.url} alt="avatar image" width="100%" />
      <div className={classes.Wrapper}>
      <h1>{RichText.asText(props.home.data.main_title)}</h1>
      <p>{RichText.asText(props.home.data.description)}</p>

      <ul className={classes.BlogList}>
        {props.posts.results.map((post) => (
          <li key={post.uid}>
            {RichText.render(post.data.main_title)}
            {RichText.render(post.data.date)}
            {RichText.render(post.data.post_body)}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export async function getStaticProps() {
    const home = await client.getSingle("homepage")
    const posts = await client.query(
      Prismic.Predicates.at("document.type", "post"),
      { orderings: "[my.post.date desc]" }
    )
    return {
      props: {
        home,
        posts,
      },
    }
  }

