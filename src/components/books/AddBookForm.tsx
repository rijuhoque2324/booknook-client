
"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { createBook } from "@/lib/books-api";
import { authClient } from "@/lib/auth-client";

interface BookFormData {
  title: string;
  author: string;
  category: string;
  description: string;
  image: string;
  totalCopies: string;
}


const initialFormData: BookFormData = {
  title: "",
  author: "",
  category: "",
  description: "",
  image: "",
  totalCopies: "",
};

export default function AddBookForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] =
    useState<BookFormData>(initialFormData);

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      // 1. Generate JWT token using Better Auth
      const { data, error } = await authClient.token();

      console.log("JWT DEBUG:", {
        hasData: Boolean(data),
        hasToken: Boolean(data?.token),
        error: error?.message,
      });

      if (error || !data?.token) {
        throw new Error(
          "Authentication token not found. Please login again."
        );
      }

      // 2. Prepare book data
      const bookData = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        category: formData.category,
        description: formData.description.trim(),
        image: formData.image.trim(),
        totalCopies: Number(formData.totalCopies),
      };

      // 3. Send book data WITH JWT token
      const result = await createBook(
        bookData,
        data.token
      );

      console.log("Book creation successful:", result);

      // 4. Show success message
      toast.success("Book added successfully!");

      // 5. Reset form
      setFormData(initialFormData);

      // 6. Navigate to My Books
      router.push("/my-books");
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
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Book Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium"
        >
          Book Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={150}
          placeholder="Enter book title"
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      {/* Author */}
      <div>
        <label
          htmlFor="author"
          className="mb-2 block text-sm font-medium"
        >
          Author
        </label>

        <input
          id="author"
          name="author"
          type="text"
          value={formData.author}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={100}
          placeholder="Enter author name"
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      {/* Category Dropdown */}
      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-sm font-medium"
        >
          Category
        </label>

        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full rounded-lg border bg-white px-4 py-3"
        >
          <option value="">Select category</option>
          <option value="Technology">Technology</option>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="Business">Business</option>
          <option value="Literature">Literature</option>
          <option value="Self Development">
            Self Development
          </option>
          <option value="Biography">Biography</option>
          <option value="Education">Education</option>
          <option value="Children">Children</option>
          <option value="Mystery">Mystery</option>
          <option value="Fantasy">Fantasy</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          placeholder="Write book description"
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      {/* Book Image */}
      <div>
        <label
          htmlFor="image"
          className="mb-2 block text-sm font-medium"
        >
          Book Image URL
        </label>

        <input
          id="image"
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
          placeholder="https://example.com/book.jpg"
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      {/* Total Copies */}
      <div>
        <label
          htmlFor="totalCopies"
          className="mb-2 block text-sm font-medium"
        >
          Total Copies
        </label>

        <input
          id="totalCopies"
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

      {/* Submit Button */}
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
