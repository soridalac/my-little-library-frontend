export const getBooks = async () => {
  const result = await fetch("http://localhost:8080/api/books");

  const books = result.json();
};

export const postBooks = async () => {
  const result = await fetch("http://localhost:8080/api/books", {
    method: "POST",
    body: JSON.stringify({ username: "example" }),
  });

  const postResult = result.json();
  return postResult;
};
