interface CharactersProps {
    character: {
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
}

const image_size = "portrait_xlarge"

export function Character(props: CharactersProps) {
    return (
        <div className="container-result">
            <img src={`${props.character.thumbnail.path}/${image_size}.${props.character.thumbnail.extension}`} alt="hero-avatar" />
            <h4>{props.character.name}</h4>
            <button><a target="_blank" href={props.character.urls[0].url} rel="noreferrer">Read about hero</a></button>
        </div>
    );
}