import React, { useState, useEffect } from "react";
import { fetchPosts, deletePost } from "../services/api";
import Form from "./Form";

const Posts = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingPost, setEditingPost] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetchPosts();
            const posts = response.data.results || response.data;
            setData(posts);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await deletePost(id);

            if (res.status === 200) {
                const newUpdatedData = data.filter(
                    (post) => post.id !== id
                );
                setData(newUpdatedData);
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const handleEdit = (post) => {
        setEditingPost(post);
    };

    if (loading) return <p>Loading...</p>;


    return (
        <>
            <section data={data} setData={setData}>
                <Form setData={setData} editingPost={editingPost} setEditingPost={setEditingPost} />

            </section>
            <section className="max-w-4xl mx-auto p-6">
                <ol className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4">
                    {data.map(({ id, title, body }) => (
                        <li key={id} className="bg-white rounded-lg shadow-md p-6 border">
                            <h3 className="text-xl font-semibold mb-2">{title}</h3>
                            <p className="text-gray-600 mb-4">{body}</p>

                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => handleEdit({ id, title, body })}>
                                    Edit
                                </button>

                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded"
                                    onClick={() => handleDelete(id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ol>
            </section></>

    );
};

export default Posts;
