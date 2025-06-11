export interface Film {
  id: number;
  title: string;
  releaseYear: number;
  format: "VHS" | "DVD" | "Blu-ray";
  stars: string[];
}
