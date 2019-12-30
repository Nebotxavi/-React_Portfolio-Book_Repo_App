import http from "./httpService";
import { refreshToken, getJwt } from "./authService";

const apiEndpoint = "books/";

function updateToken() {
  refreshToken();
  http.setJwt(getJwt());
}

export async function getBooks() {
  updateToken();
  const { data: books } = await http.get(apiEndpoint);
  return books;
}

export async function getBook(id) {
  updateToken();
  const { data: book } = await http.get(apiEndpoint + id);
  return book;
}

export async function deleteBook(id) {
  updateToken();
  return await http.delete(apiEndpoint + id + "/delete/");
}

export async function updateBook(id, book) {
  updateToken();
  return await http.put(apiEndpoint + id + "/edit/", book);
}

export async function saveBook(book) {
  updateToken();
  return await http.post(apiEndpoint + "new/", book);
}
