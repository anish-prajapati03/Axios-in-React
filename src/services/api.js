import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

// GET all posts
export const fetchPosts = () => api.get("/posts");

//  CREATE
export const createPost = (newPost) => api.post("/posts", newPost);

//  UPDATE
export const updatePost = (id, updatedPost) =>
    api.put(`/posts/${id}`, updatedPost);

//  DELETE
export const deletePost = (id) => api.delete(`/posts/${id}`);
