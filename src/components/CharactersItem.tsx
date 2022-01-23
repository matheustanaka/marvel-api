interface CharactersItemProps {
    character: {
        id: number;
        name: string;
        description: string;
        thumbnail: {
            path: string,
            extension: string
        }
    }
}

export function CharactersItem(props: CharactersItemProps) {
    return (
        <li>
            <h2>{props.character.name}</h2>
            <img src={`${props.character.thumbnail.path}.${props.character.thumbnail.extension}`} alt="" />
        </li>
    );
}