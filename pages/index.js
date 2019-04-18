import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Link from "next/link";

function HomePage({ profiles, page }) {
  return (
    <>
      <Head>
        <title>Profiles</title>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://css.zeit.sh/v1.css"
          type="text/css"
        />
      </Head>
      <h1>Robot Profiles</h1>
      <ul>
        {profiles.map(p => (
          <li key={p.id}>
            <img src={p.avatar} />
            <Link prefetch href={`/profile?id=${p.id}`}>
              <h2>{p.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
      <Link prefetch href={`/?page=${page - 1}`}>
        Previous
      </Link>
      <Link prefetch href={`/?page=${page + 1}`}>
        Next
      </Link>
      <style jsx>{`
        ul li::before {
          content: "";
        }
        li {
          display: flex;
        }
        h2 {
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

HomePage.getInitialProps = async ({ req, query }) => {
  const host = req ? `https://${req.headers.host}` : "";
  const pageRequest = query.page
    ? `${host}/api/profiles?page=${query.page}`
    : `${host}/api/profiles`;
  const res = await fetch(pageRequest);
  const json = await res.json();
  return json;
};

export default HomePage;
