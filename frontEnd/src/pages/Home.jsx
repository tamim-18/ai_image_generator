import React, { useState, useEffect } from "react";
import { Loader, FormField, Card } from "../components";
const RenderCards = ({ data, title }) => {
  if (data?.length > 0)
    return data.map((item) => <Card key={item._id} {...item} />);
  return (
    <h2 className=" mt-5 font-bold text-[#6449ff] text-xl uppercase">
      {title}
    </h2>
  );
};
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [search, setSearch] = useState("abc");
  // const fetchPosts = async () => {
  //   setLoading(true);

  //   try {
  //     const response = await fetch("http://localhost:8080/api/v1/post", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       setAllPosts(result.data.reverse());
  //     }
  //   } catch (err) {
  //     alert(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  return (
    <div>
      <section className=" max-w-7xl mx-auto">
        <div>
          <h1 className=" font-extrabold text-[32px] text-[#222328]">
            Community ShowCase
          </h1>
          <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
            Browse through a collection of imaginative and visually stunning
            images genrated by DALL-E AI
          </p>
        </div>
        <div className=" mt-16">
          <FormField />
        </div>
        <div className="mt-10">
          {loading ? (
            <div className=" flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {search && (
                <h2 className=" font-medium text-[#666e75] text-xl mb-3">
                  Showing results for{" "}
                  <span className=" text-[#222328]">{search}</span>
                </h2>
              )}
              <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-3">
                {search ? (
                  <RenderCards data={[]} title="No results found" />
                ) : (
                  <RenderCards data={[]} title="No posts found" />
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
