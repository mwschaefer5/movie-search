export interface MovieDetail {
  id: string;
  title: string;
  duration: string;
  directors: string[];
  mainActors: string[];
  datePublished: string;
  ratingValue: number;
  bestRating: number;
  worstRating: number;
  genres: {
    id: string;
    title: string;
  }[]
}

export const mockMovieDetail: MovieDetail = {
  id: "7GQMaTpw7B0MInjOHis5yu",
  title: "'The Descent': Beneath the Scenes",
  duration: "PT42M",
  directors: ["Emma Farrell"],
  mainActors: ["MyAnna Buring","Craig Conway","Simon Bowles"],
  datePublished: "2006-12-26",
  ratingValue: 6.9,
  bestRating: 10,
  worstRating: 1,
  genres: [
    {"id":"1L1TCrOS4GQojaQHgT9D35","title":"Documentary"},
    { "id":"LBi850i0fN345kziTbJIm","title":"Short"}
  ],
}
