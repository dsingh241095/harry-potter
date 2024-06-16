export interface movieList {
  budget: string;
  duration: string;
  id: string;
  release_date: string;
  title: string;
}

export interface movieDetail {
  id?: string;
  title?: string;
  duration?: string;
  budget?: string;
  release_date?: string;
  box_office?: string;
  cinematographers?: string[];
  poster?: string;
  producers?: string[];
  summary?: string;
}
