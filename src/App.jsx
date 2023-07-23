import useSWR from "swr";
import Episode from "./Episode";

function fetcher(url) {
  return fetch(url).then((res) => res.json());
}

function App() {
  const {
    data: episodes,
    error,
    isLoading,
  } = useSWR("https://rickandmortyapi.com/api/episode", fetcher);

  // Only display when data is fetched and there are no errors
  if (error) return <div>Error...</div>;
  if (isLoading) return <div>Loading App...</div>;

  // Take the first 20 episodes
  const firstTwentyEpisodes = episodes.results.slice(0, 20);

  return (
    <div>
      {firstTwentyEpisodes.map((episode) => (
        <Episode key={episode.id} episode={episode} />
      ))}
    </div>
  );
}

export default App;
