import http from "./httpService";

export async function getGenres() {
  const { data: books } = await http.get("genres");
  return books;
}
