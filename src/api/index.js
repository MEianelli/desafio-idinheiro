const fetch = require("node-fetch");

export async function fetchPosts() {
  const postsJson = await fetch("https://jsonplaceholder.typicode.com/posts");
  const postsArray = await postsJson.json();
  return postsArray;
}

export async function fetchUsers() {
  const usersJson = await fetch("https://jsonplaceholder.typicode.com/users ");
  const usersArray = await usersJson.json();
  return usersArray;
}

