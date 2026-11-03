"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createBook } from "@/lib/books-api";

export default function AddBookForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    image: "",
    totalCopies: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const bookData = {
        ...formData,
        totalCopies: Number(formData.totalCopies),
      };

      await createBook(bookData);

      toast.success("Book added successfully!");

      setFormData({
        title: "",
        author: "",
        category: "",
        description: "",
        image: "",
        totalCopies: "",
      });

      router.push("/books");
      router.refresh();
    } catch (error) {
      console.error("Create book error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium">
          Book Title
        </label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          minLength={2}
          placeholder="Enter book title"
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Author
        </label>
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          minLength={2}
          placeholder="Enter author name"
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full rounded-lg border px-4 py-3"
        >
          <option value="">Select category</option>
          <option value="Technology">Technology</option>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="Business">Business</option>
          <option value="Literature">Literature</option>
          <option value="Self Development">Self Development</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          minLength={10}
          rows={5}
          placeholder="Write book description"
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Book Image URL
        </label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
          placeholder="https://example.com/book.jpg"
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Total Copies
          </label>
          <input
            type="number"
            name="totalCopies"
            value={formData.totalCopies}
            onChange={handleChange}
            required
            min="1"
            step="1"
            placeholder="5"
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[#244B3C] px-6 py-3 font-semibold text-white transition hover:bg-[#19382C] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Adding Book..." : "Add Book"}
      </button>
    </form>
  );
}