import axios from 'axios';
import { useState, useEffect } from "react";
import { updatePost } from '../services/api';

const Form = ({ setData, editingPost, setEditingPost }) => {
    const [addData, setAddData] = useState({
        title: "",
        body: ""
    });

    useEffect(() => {
        if (editingPost) {
            setAddData({ title: editingPost.title, body: editingPost.body });
        }
    }, [editingPost]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingPost) {
                const response = await updatePost(editingPost.id, addData);
                setData((prevData) => 
                    prevData.map((post) => 
                        post.id === editingPost.id ? response.data : post
                    )
                );
                setEditingPost(null);
            } else {
                const response = await axios.post(
                    "https://jsonplaceholder.typicode.com/posts",
                    addData
                );
                setData((prevData) => [response.data, ...prevData]);
            }
            setAddData({ title: "", body: "" });
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    {editingPost ? "Edit Post" : "Add Post"}
                </h2>


                <div className="mb-4">
                    <label className="block mb-1 font-medium">
                        Add Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={addData.title}
                        onChange={(e) => setAddData({ ...addData, title: e.target.value })}
                        placeholder="Enter title..."
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>


                <div className="mb-4">
                    <label className="block mb-1 font-medium">
                        Add Post
                    </label>
                    <textarea
                        name="post"
                        value={addData.body}
                        onChange={(e) => setAddData({ ...addData, body: e.target.value })}
                        placeholder="Write your post..."
                        rows="4"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>


                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    {editingPost ? "UPDATE" : "ADD"}
                </button>
            </form>
        </div>
    );
}

export default Form;

