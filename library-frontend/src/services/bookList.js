export const getBooks = async () => {
  const result = await fetch("http://localhost:8080/api/books");

  const books = await result.json();
  console.log(books);
  return books;
};
export const searchBooks = async (searchText) => {
  const result = await fetch(
    `http://localhost:8080/api/books?search=${searchText}`
  );

  const books = await result.json();
  console.log(books);
  return books;
};

export const postBooks = async () => {
  const result = await fetch("http://localhost:8080/api/books", {
    method: "POST",
    body: JSON.stringify({ username: "example" }),
  });

  const postResult = result.json();
  return postResult;
};
