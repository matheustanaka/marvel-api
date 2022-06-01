import { useState, useEffect } from "react";
import axios from "axios";
import md5 from "md5";

import { Character } from "./Character";
import "../styles/character.scss"
interface ICharacter {
    id: number;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    }
    urls: {
        [index: string]: {
            url: string;
        }
    }
}

export const SearchCharacter = () => {
    const [characterName, setCharacterName] = useState("");
    const [characters, setCharacters] = useState<ICharacter[]>([]);

    useEffect(() => {
        requestCharacters();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const requestCharacters = async () => {
        const baseUrl = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${characterName}`;
        const time = Number(new Date());
        // eslint-disable-next-line no-useless-concat
        const hash = md5(time + `${process.env.REACT_APP_PRIVATEKEY}` + `${process.env.REACT_APP_PUBLICKEY}`);

        const { data } = await axios.get(`${baseUrl}&ts=${time}&apikey=${process.env.REACT_APP_PUBLICKEY}&hash=${hash}`);
        setCharacters(data.data.results);
    }
    return (
        <div className="search-character">
            <header>
                <h1><span>Hero</span>Finder</h1>
            </header>
            <form onSubmit={(e) => {
                e.preventDefault();
                requestCharacters();
            }}>
                <label htmlFor="character-name">
                    <input id="name" value={characterName} placeholder="Type Character's Name" onChange={(e) => setCharacterName(e.target.value)} />
                </label>
                <button>Search</button>
            </form>
            <section>
                {characters.map((character) => {
                    return <Character character={character} key={character.id} />
                })}
            </section>
        </div>
    )
}