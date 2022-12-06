import type { NextApiRequest, NextApiResponse } from "next";

export type CommentResponseData = {
  success: boolean;
  comments: CommentData[];
  error?: string;
};

export type CommentData = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const responseData: CommentResponseData = {
    success: false,
    comments: [],
  };
  try {
    const url = "https://jsonplaceholder.typicode.com/comments";
    const result = await fetch(url);
    const data = await result.json();
    responseData.success = true;
    responseData.comments = data.filter(
      (elem: CommentData) => elem.postId <= 20
    );
    response.status(200).json(responseData);
  } catch (err) {
    responseData.error = err.message;
    responseData.success = false;
    response.status(500).json(responseData);
  }
}
