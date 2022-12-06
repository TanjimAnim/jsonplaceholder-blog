import { useRouter } from "next/router";
import axios from "axios";
import { Box, Heading, Text } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { baseUrl } from "../../config/";
//import { Suspense } from "react";
//import Loader from "../../src/components/loader";

//import types
import { GetServerSideProps } from "next";
import { PostData, PostResponseData } from "../api/get-posts";
import { CommentData, CommentResponseData } from "../api/get-comments";
import { UserData, UserResponseData } from "../api/get-users";
export default function Post({ postData, userData, commentData }) {
  const router = useRouter();
  const { posts } = router.query;

  return (
    <>
      <Box display="flex" justifyContent="center" marginY="20px">
        <Link href="/">
          <Heading as="h1" fontSize="50px" color="#2e8c81">
            Blog
          </Heading>
        </Link>
      </Box>
      <Box background="#fefbd8" padding="1rem" marginX="1rem" minHeight="80vh">
        {postData.posts.map((item: PostData) => {
          if (item.id === parseInt(posts[0])) {
            return (
              <Box key={item.id}>
                <Box>
                  {userData.map((user: UserData) => {
                    if (user.id === item.userId) {
                      return (
                        <Text
                          key={user.id}
                          fontSize="20px"
                          color="#618685"
                          fontWeight={700}
                        >
                          <span
                            style={{
                              color: "#80ced6",
                              fontWeight: "600",
                              fontSize: "16px",
                            }}
                          >
                            Posted By
                          </span>{" "}
                          {user.name}
                        </Text>
                      );
                    }
                  })}
                </Box>
                <Box marginY="10px">
                  <Text color="#618685" fontWeight={700} fontSize="30px">
                    {item.title}
                  </Text>
                </Box>

                <Box marginY="10px">
                  <Text color="#80ced6" fontSize="24px" textAlign="justify">
                    {item.body}
                  </Text>
                </Box>
                <Box marginY="10px">
                  <Text fontSize="20px" color="lightblue" fontWeight={700}>
                    <span style={{ color: "#71b8bf" }}>
                      Comments <ChatIcon />
                    </span>{" "}
                    {
                      commentData.comments.filter(
                        (elem: CommentData) => elem.postId === item.id
                      ).length
                    }
                  </Text>
                </Box>
                <Box>
                  {commentData.comments.map((comment: CommentData) => {
                    if (comment.postId === parseInt(posts[0]))
                      return (
                        <Box
                          key={comment.id}
                          borderLeft="1px solid #71b8bf"
                          marginY="10px"
                          padding="1rem"
                        >
                          <Text color="#80ced6" fontSize="18px">
                            {comment.email}
                          </Text>

                          <Text
                            color="#71b8bf"
                            fontSize="18px"
                            fontWeight={700}
                          >
                            {comment.body}
                          </Text>
                        </Box>
                      );
                  })}
                </Box>
              </Box>
            );
          }
        })}
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const url1 = `${baseUrl}/api/get-posts`;
  const url2 = "https://jsonplaceholder.typicode.com/users";
  const url3 = `${baseUrl}/api/get-comments`;
  const { data: postData }: { data: PostResponseData } = await axios.get(url1);
  const { data: userData }: { data: UserResponseData } = await axios.get(url2);
  const { data: commentData }: { data: CommentResponseData } = await axios.get(
    url3
  );
  return {
    props: { postData, userData, commentData },
  };
};
