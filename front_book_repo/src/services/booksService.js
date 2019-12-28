import http from "./httpService";

const apiEndpoint = "books/";

export async function getBooks() {
  const { data: books } = await http.get(apiEndpoint);
  return books;
}

export async function getBook(id) {
  const { data: book } = await http.get(apiEndpoint + id);
  return book;
}

export async function deleteBook(id) {
  return await http.delete(apiEndpoint + id + "/delete/");
}

export async function updateBook(id, book) {
  return await http.put(apiEndpoint + id + "/edit/", book);
}

export async function saveBook(book) {
  return await http.post(apiEndpoint + "new/", book);
}
