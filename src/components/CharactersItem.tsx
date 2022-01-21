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
            <p>{props.character.description}</p>
            <img src={`${props.character.thumbnail.path}.${props.character.thumbnail.extension}`} alt="" />
            <p>ID #{props.character.id}</p>
        </li>
    );
}