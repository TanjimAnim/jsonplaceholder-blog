import axios from "axios";

export default async function handler(req, res) {
  const responseData = {
    success: false,
    comments: [],
  };
  try {
    const url = "https://jsonplaceholder.typicode.com/comments";
    const { data } = await axios.get(url);
    responseData.success = true;
    responseData.comments = data.filter((elem) => elem.postId <= 20);
    res.status(200).json(responseData);
  } catch (error) {
    responseData.error = error.message;
    res.status(500).json(responseData);
  }
}
