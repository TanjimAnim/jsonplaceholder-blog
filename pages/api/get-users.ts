import type { NextApiRequest, NextApiResponse } from "next";

export type UserResponseData = {
  success: boolean;
  users: UserData[];
  error?: string;
};

export type UserData = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const responseData: UserResponseData = {
    success: false,
    users: [],
  };
  try {
    const url: RequestInfo = "https://jsonplaceholder.typicode.com/users";
    const result: Response = await fetch(url);
    const data = await result.json();
    responseData.success = true;
    responseData.users = data.filter((elem: UserData) => elem.id <= 20);
    response.status(200).json(responseData);
  } catch (error) {
    responseData.error = error.message;
    responseData.success = false;
    response.status(500).json(responseData);
  }
}
