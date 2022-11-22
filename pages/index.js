import axios from "axios";
import slugify from "slugify";
import Link from "next/link";
import { useState } from "react";

export default function Home({ data, userData, commentData }) {
  const [postData, setPostData] = useState(
    data.filter((elem) => elem.id <= 20)
  );
  const deletePost = (id) => {
    setPostData(postData.filter((elem) => elem.id !== id));
  };
  return (
    <>
      <h1>Blog</h1>
      {postData.map((item) => {
        return (
          <div key={item.id}>
            <div>
              <span style={{ fontWeight: "700" }}>title:</span>{" "}
              <Link href={`/posts/${item.id}/${slugify(item.title)}`}>
                {item.title}
              </Link>
            </div>
            <div>
              <span style={{ fontWeight: "700" }}>author:</span>
              {userData.map((user) => {
                if (user.id === item.userId) {
                  return <p key={user.id}>{user.name}</p>;
                }
              })}
            </div>
            <div>
              <span style={{ fontWeight: "700" }}>comments:</span>
              {commentData.filter((elem) => elem.postId === item.id).length}
            </div>
            <div>
              <button
                style={{ padding: "1rem" }}
                onClick={() => {
                  deletePost(item.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export async function getStaticProps() {
  const url1 = "https://jsonplaceholder.typicode.com/posts";
  const url2 = "https://jsonplaceholder.typicode.com/users";
  const url3 = "https://jsonplaceholder.typicode.com/comments";
  const { data } = await axios.get(url1);
  const { data: userData } = await axios.get(url2);
  const { data: commentData } = await axios.get(url3);
  return {
    props: { data, userData, commentData },
  };
}
