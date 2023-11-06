import React, { useState } from "react";
import { preview } from "../assets";
import { useNavigate } from "react-router-dom";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";
const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generateImg, setGenerateImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert("Success");
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate an image with proper details");
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = () => {
    const prompt = getRandomPrompt();
    setForm({ ...form, prompt });
  };
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGenerateImg(true);
        const response = await fetch("http://localhost:8080/api/v1/delle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGenerateImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };
  return (
    <section className=" max-w-7xl mx-auto">
      <div>
        <h1 className=" font-extrabold text-[32px] text-[#222328]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Create a collection of imaginative and visually stunning images
          genrated through DALL-E AI and share them with the community
        </p>
      </div>
      <form className=" mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className=" flex flex-col gap-5">
          <FormField
            labelName="Name"
            type="text"
            placeholder="Enter name"
            name="name"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            placeholder="A plush toy robbot sitting against a yellow wall"
            name="prompt"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.preview}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generateImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className=" mt-5 flex-5 gap-5">
          <button
            className=" bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center text-white"
            type="button"
            onClick={generateImage}
          >
            {generateImg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className=" mt-2 text-[#666e75] text-[14px]">
            Once you have crated the image, you can share it with the community
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
//http://localhost:8080/api/v1/delle
