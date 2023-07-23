import useSWR from "swr";
function fetcher(url) {
  return fetch(url).then((res) => res.json());
}

function Episode({ episode }) {
  const characters = [];
  episode.characters.slice(0, 10).map((characterUrl, characterIndex) => {
    const {
      data: characterData,
      error,
      isLoading,
    } = useSWR(characterUrl, fetcher);

    if (error) {
      characters[characterIndex] = {
        message: "error character" + characterIndex,
      };
    }
    if (isLoading) {
      characters[characterIndex] = {
        message: "loading character" + characterIndex,
      };
    }
    if (characterData) {
      characters[characterIndex] = characterData;
    }
  });

  return (
    <div>
      <h3>
        {episode.name} - {episode.episode}
      </h3>
      <p>Air Date: {episode.air_date}</p>
      <p>Characters:</p>
      <ul>
        {characters.map((character, index) => (
          <li key={index}>
            {character.message}
            {character.name && `${character.name} - ${character.species}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Episode;
