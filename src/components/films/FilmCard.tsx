import { Film } from "types/films.interface";

export default function FilmCard() {
  const mockedData: Film[] = [
    {
      id: 1,
      title: "Blazing Saddles",
      releaseYear: 1974,
      format: "VHS",
      stars: [
        "Mel Brooks",
        "Clevon Little",
        "Harvey Korman",
        "Gene Wilder",
        "Slim Pickens",
        "Madeline Kahn",
      ],
    },
    {
      id: 2,
      title: "Casablanca",
      releaseYear: 1942,
      format: "DVD",
      stars: [
        "Humphrey Bogart",
        "Ingrid Bergman",
        "Claude Rains",
        "Peter Lorre",
      ],
    },
    {
      id: 3,
      title: "Charade",
      releaseYear: 1953,
      format: "DVD",
      stars: [
        "Audrey Hepburn",
        "Cary Grant",
        "Walter Matthau",
        "James Coburn",
        "George Kennedy",
      ],
    },
  ];

  return (
    <div>
      {mockedData.map((film) => (
        <div>
          <h2>{film.title}</h2>
          <p>{film.format}</p>
          <p>{film.releaseYear}</p>
          <ul>
            {film.stars.map((actor, index) => (
              <li key={index}>{actor}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
