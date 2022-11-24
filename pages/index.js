import axios from "axios";
import slugify from "slugify";
import Link from "next/link";
import { useState } from "react";
import { Box, Text, Heading, Button, useToast } from "@chakra-ui/react";
//import icons
import { DeleteIcon, ChatIcon } from "@chakra-ui/icons";
import { FaQuoteLeft } from "react-icons/fa";

//import Loader from "../src/components/loader";

import { baseUrl } from "../config";

export default function Home({ data, userData, commentData }) {
  const toast = useToast();
  const [postData, setPostData] = useState(data.posts);
  const deletePost = (id) => {
    toast({
      title: "Post Deleted",
      status: "error",
      duration: 2000,
      isClosable: true,
    });

    setPostData(postData.filter((elem) => elem.id !== id));
  };

  return (
    <>
      <Box display="flex" justifyContent="center" marginY="20px">
        <Heading as="h1" fontSize="50px" color="#2e8c81">
          Blog
        </Heading>
      </Box>
      <Box
        padding="1rem"
        marginX="1rem"
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        cursor="pointer"
      >
        {postData.map((item) => {
          return (
            <Box
              key={item.id}
              margin="10px"
              padding="1rem"
              width="500px"
              border="1px solid aliceblue"
              borderRadius="10px"
              boxShadow="5px 5px powderblue"
              transition="border 0.3s ease-in,box-shadow 0.3s ease-in"
              _hover={{
                border: "1px solid powderblue",
                boxShadow: "10px 10px powderblue",
              }}
              display="flex"
              flexDirection="column"
              backgroundColor="#fefbd8"
            >
              <Box marginY="10px" minHeight="165px">
                <Link href={`/posts/${item.id}/${slugify(item.title)}`}>
                  <Text color="#618685" fontWeight={700} fontSize="30px">
                    <FaQuoteLeft />
                    {item.title}
                  </Text>
                </Link>
              </Box>
              <Box marginY="10px">
                <Box>
                  {userData.map((user) => {
                    if (user.id === item.userId) {
                      return (
                        <Text
                          key={user.id}
                          fontSize="20px"
                          color="#618685"
                          fontWeight={700}
                        >
                          <span style={{ color: "#80ced6" }}>Author: </span>
                          {user.name}
                        </Text>
                      );
                    }
                  })}
                </Box>
                <Box marginY="10px">
                  <Text fontSize="20px" color="#618685" fontWeight={700}>
                    <span style={{ color: "#80ced6" }}>
                      <ChatIcon /> No of Comments :
                    </span>{" "}
                    {
                      commentData.comments.filter(
                        (elem) => elem.postId === item.id
                      ).length
                    }
                  </Text>
                </Box>
                <Box marginY="10px">
                  <Button
                    background="#f4f4f4"
                    color="#80ced6"
                    cursor="pointer"
                    borderRadius="5%"
                    border="none"
                    padding="1rem"
                    fontSize="20px"
                    onClick={() => {
                      deletePost(item.id);
                    }}
                    _hover={{
                      background: "#f0110a",
                      color: "white",
                    }}
                    gap="5px"
                  >
                    Delete
                    <DeleteIcon />
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
}

export async function getStaticProps() {
  const url1 = `${baseUrl}/api/get-posts`;
  const url2 = "https://jsonplaceholder.typicode.com/users";
  const url3 = `${baseUrl}/api/get-comments`;

  const { data } = await axios.get(url1);
  const { data: userData } = await axios.get(url2);
  const { data: commentData } = await axios.get(url3);

  return {
    props: { data, userData, commentData },
  };
}
