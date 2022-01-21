import { useEffect } from "react";
import axios from "axios";
import md5 from "md5";

import "./styles/app.scss";

const baseUrl = 'http://gateway.marvel.com/v1/public/characters?';
const time = Number(new Date());
const hash = md5(time + `${process.env.REACT_APP_PRIVATEKEY}` + `${process.env.REACT_APP_PUBLICKEY}`);

export function App() {

  useEffect(() => {
    axios.get(`${baseUrl}ts=${time}&apikey=${process.env.REACT_APP_PUBLICKEY}&hash=${hash}`)
    .then((response)=> console.log(response.data.data))
    .catch((err) => console.log(err));
  }, [])

  return (
    <>
      <h1>Marvel Api</h1>
    </>
  );
}