import { useState, useEffect } from "react";
import axios from "axios";
import md5 from "md5";

interface Character {
    id: number;
    name: string;
    description: string;
    thumbnail: {
        path: string,
        extension: string
    };
}

export const SearchCharacter = () => {
    const [characterName, setCharacterName] = useState("");
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        requestCharacters();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const requestCharacters = async () => {
        const baseUrl = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${characterName}`;
        const time = Number(new Date());
        const hash = md5(time + `${process.env.REACT_APP_PRIVATEKEY}` + `${process.env.REACT_APP_PUBLICKEY}`);

        const { data } = await axios.get(`${baseUrl}&ts=${time}&apikey=${process.env.REACT_APP_PUBLICKEY}&hash=${hash}`);
        console.log(data);
        setCharacters(data.data.results);
    }
    return (
        <div className="search-character">
            <form onSubmit={(e) => {
                e.preventDefault();
                requestCharacters();
            }}>
                <label htmlFor="character-name">
                    Name
                    <input id="name" value={characterName} placeholder="Type Character's Name" onChange={(e) => setCharacterName(e.target.value)} />
                </label>
                <button>Search</button>
            </form>
        </div>
    )
}