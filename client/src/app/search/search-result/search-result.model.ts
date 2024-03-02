export interface MovieResult {
  id: string;
  title: string;
  posterUrl?: string;
  rating?: string;
}

export const mockData: MovieResult[] = [
  {
    id: "7GQMaTpw7B0MInjOHis5yu",
    title: "'The Descent': Beneath the Scenes",
  },
  {
    id: "5QMbuAa6H8uMAEbR2agDbe",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjEzMjczOTIxMV5BMl5BanBnXkFtZTgwOTUwMjI3NzE@._V1_.jpg",
    rating: "14A",
    title: "10 Cloverfield Lane",
  }
]
