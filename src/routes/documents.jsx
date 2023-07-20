import { axiosPrivate } from "../api/axios";

export async function loader() {
  const data = await axiosPrivate.get("/documents");

  console.log(data);

  return data;
}

export default function Document() {
  return <div>Document Page</div>;
}
