export default async function handler(request, response) {
  const responseData = {
    success: false,
    comments: [],
  };
  try {
    const url = "https://jsonplaceholder.typicode.com/comments";
    const result = await fetch(url);
    const data = await result.json();
    responseData.success = true;
    responseData.comments = data.filter((elem) => elem.postId <= 20);
    response.status(200).json(responseData);
  } catch (err) {
    responseData.error = err.message;
    responseData.success = false;
    response.status(500).json(responseData);
  }
}
