import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";

function Current(props) {
  const current = props.current;
  const name = props.name;
  const slug = props.slug;

  if (current === name) {
    return (
      <Link to={`/industry/${slug}`} className="current">
        {name}
      </Link>
    );
  } else {
    return (
      <Link to={`/industry/${slug}`}>
        {name}
      </Link>
    );
  }
}

export default function IndustryNav(props) {
  return (
    <StaticQuery
      query={graphql`
        query IndustryNavQuery {
          allStrapiIndustry(sort: {order: ASC}) {
            edges {
              node {
                slug
                title
              }
            }
          }
        }
      `}
      render={data => (
        <>
          {data.allStrapiIndustry.edges.map(document => (
            <li key={document.node.slug}>
              <Current current={props.current} name={document.node.title} slug={document.node.slug} />
            </li>
          ))}
        </>
      )}
    />
  );
}
