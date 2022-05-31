interface CharactersProps {
    character: {
        id: number;
        name: string;
        description: string;
        thumbnail: {
            path: string;
            extension: string;
        }
    }
}

const image_size = "portrait_medium"

export function Character(props: CharactersProps) {
    return (
        <div className="container-result">
            <div className="grid-items">
                <img src={`${props.character.thumbnail.path}/${image_size}.${props.character.thumbnail.extension}`} alt="hero-avatar" />
            </div>
        </div>
    );
}