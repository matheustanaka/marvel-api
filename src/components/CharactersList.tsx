/* eslint-disable no-useless-concat */
import { useEffect, useState } from "react";
import axios from "axios";
import md5 from "md5";
import { CharactersItem } from "./CharactersItem";

import "../styles/charactersList.scss"


const baseUrl = 'http://gateway.marvel.com/v1/public/characters?';
const time = Number(new Date());
const hash = md5(time + `${process.env.REACT_APP_PRIVATEKEY}`+`${process.env.REACT_APP_PUBLICKEY}`);

interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string,
    extension: string
  };
}

export function CharactersList() {

  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    axios.get(`${baseUrl}ts=${time}&apikey=${process.env.REACT_APP_PUBLICKEY}&hash=${hash}`)
      .then((response) => setCharacters(response.data.data.results))
      .catch((err) => console.log(err));
  }, [])

  return (
    <div className="characters-list">

      <header>
        <h1>Characters List</h1>
      </header>

      <div className="result-character">
        <ul>
          {characters.map(character => {
            return <div className="card-character">
              <CharactersItem key={character.name} character={character} />
            </div>

          })}
        </ul>
      </div>
    </div>

  )
}