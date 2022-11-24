import axios from "axios";

export default async function handler(req, res) {
  const responseData = {
    success: false,
    posts: [],
  };
  try {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const { data } = await axios.get(url);
    responseData.success = true;
    responseData.posts = data.filter((elem) => elem.id <= 20);
    res.status(200).json(responseData);
  } catch (error) {
    responseData.error = error.message;
    res.status(500).json(responseData);
  }
}
