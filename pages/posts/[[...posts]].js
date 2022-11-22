import { useRouter } from "next/router";
import axios from "axios";

export default function Post({ postData, userData, commentData }) {
  const router = useRouter();
  const { posts } = router.query;

  return (
    <>
      {postData.map((item) => {
        if (item.id === parseInt(posts[0])) {
          return (
            <div key={item.id}>
              <div>
                <span style={{ fontWeight: "700" }}>title:</span> {item.title}
              </div>

              <div>
                <span style={{ fontWeight: "700" }}>body:</span> {item.body}
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
                {commentData.map((comment) => {
                  if (comment.postId === parseInt(posts[0]))
                    return (
                      <div key={comment.id}>
                        <div>
                          <span style={{ fontWeight: "700" }}>
                            comment author:
                          </span>
                          {comment.email}
                        </div>
                        <div>
                          <span style={{ fontWeight: "700" }}>comments:</span>
                          {comment.body}
                        </div>
                      </div>
                    );
                })}
              </div>
            </div>
          );
        }
      })}
    </>
  );
}

export async function getServerSideProps(context) {
  const url1 = "https://jsonplaceholder.typicode.com/posts";
  const url2 = "https://jsonplaceholder.typicode.com/users";
  const url3 = "https://jsonplaceholder.typicode.com/comments";
  const { data: postData } = await axios.get(url1);
  const { data: userData } = await axios.get(url2);
  const { data: commentData } = await axios.get(url3);
  return {
    props: { postData, userData, commentData },
  };
}
