import type { NextApiRequest, NextApiResponse } from "next";

export type PostResponseData = {
  success: boolean;
  posts: PostData[];
  error?: string;
};

export type PostData = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const responseData: PostResponseData = {
    success: false,
    posts: [],
  };
  try {
    const url: RequestInfo = "https://jsonplaceholder.typicode.com/posts";
    const result: Response = await fetch(url);
    const data: PostData[] = await result.json();
    responseData.success = true;
    responseData.posts = data.filter((elem) => elem.id <= 20);
    response.status(200).json(responseData);
  } catch (error) {
    responseData.error = error.message;
    responseData.success = false;
    response.status(500).json(responseData);
  }
}
