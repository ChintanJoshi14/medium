import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

//using interface instead of type as interface an be extended to another one
interface Props {
  posts: [Post];
}
export default function Home({ posts }: Props) {

  console.log("Posts are: ", posts);
  return (
    <div className="max-w-6xl mx-auto">
      <Head>
        <title>Medium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Header /> */}

      <Banner />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 lg:p-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="border rounded-lg group cursor-pointer overflow-hidden">
              <img className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src={urlFor(post.mainImage).url()!} //! used because to make sure that we have a url otherwise it will be null, just kind of to create a protective block
                alt="this is a post mainImage"
              />
              <div className="flex justify-between p-5 bg-white">
              <div>
                <p className="text-lg font-semibold">{post.title}</p>
                <p className="text-sm">
                  {post.description} by <span className="font-semibold text-green-600">{post.author.name}</span>
                </p>
              </div>

              <img className="h-12 w-12 rounded-full" src={urlFor(post.author.image).url()!} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
    _id,
    title,
    slug,
    mainImage,
    description,
    author -> {
    name,
    image
  }
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
