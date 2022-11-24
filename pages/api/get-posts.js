export default async function handler(request, response) {
  const responseData = {
    success: false,
    posts: [],
  };
  try {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const result = await fetch(url);
    const data = await result.json();
    responseData.success = true;
    responseData.posts = data.filter((elem) => elem.id <= 20);
    response.status(200).json(responseData);
  } catch (error) {
    responseData.error = error.message;
    responseData.success = false;
    response.status(500).json(responseData);
  }
}
