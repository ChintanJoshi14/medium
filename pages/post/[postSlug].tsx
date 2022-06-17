import { GetStaticProps } from "next";
import React, { useState } from "react";
import PortableText from "react-portable-text";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import { useForm, SubmitHandler } from "react-hook-form";
import CommentBox from "../../components/CommentBox";

interface Props {
  post: Post;
}
interface FormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}
function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");

  console.log(post);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (formData) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then(() => {
        console.log(formData);
        setSubmitted(true);
        setName(formData.name);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });

    setValue("name", "");
    setValue("email", "");
    setValue("comment", "");
  };
  return (
    <main>
      <img
        className="w-full h-40 object-cover"
        src={urlFor(post.mainImage).url()!}
        alt=""
      />

      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-gray-500 text-xl font-light mb-2">
          {post.description}
        </h2>

        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt=""
          />
          <p className="font-extralight text-sm">
            Blog post by
            <span className="text-green-600 font-bold hover:underline cursor-pointer">
              {" " + post.author.name + " "}
            </span>
            - Published at{" "}
            {new Date(post._createdAt).toLocaleString("en-IN", {
              hour12: true,
            })}
          </p>
        </div>

        {/* sanity creates rich text content using PortableText, rich text is basically an array of objects and these objects can be an image, a h1 tag, etc..  */}
        {/* a serializer will tell portable text component how to handle the different objects present inside the rich text */}

        <div className="mt-10">
          <PortableText
            // className="max-w-3xl mx-auto p-5"
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold my-5" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="text-xl font-bold my-5" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
              // img: (porps: any) => (
              //   <img className="mt-5" />
              // )
            }}
          />
        </div>
      </article>

      <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />
      {submitted ? (
        <div className="flex flex-col p-10 my-10 bg-yellow-500 mx-auto max-w-3xl text-white animation-wiggle">
          <h3 className="text-2xl font-bold">
            Thankyou for submitting the comment {name}!
          </h3>
          <p>Your comment will be visible once it is checked and approved!</p>
          <p className="text-sm">(Come back after a while or Refresh to see the changes)</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-5 max-w-2xl mb-10 mx-auto"
        >
          <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
          <h4 className="text-3xl font-bold">Leave a comment below!</h4>
          <hr className="py-3 mt-2" />

          <input
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
          />

          <label className="mb-5 block">
            <span className="text-gray-700">Name</span>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Chintan Joshi"
              className="shadow py-2 px-3 rounded border outline-none focus:ring-1 ring-yellow-500 form-input mt-1 block w-full"
            />
          </label>

          <label className="mb-5 block">
            <span className="text-gray-700">Email</span>
            <input
              {...register("email", { required: true })}
              type="text"
              placeholder="your@email.com"
              className="shadow py-2 px-3 rounded border outline-none focus:ring-1 ring-yellow-500 form-input mt-1 block w-full"
            />
          </label>

          <label className="mb-5 block">
            <span className="text-gray-700">Comment</span>
            <textarea
              {...register("comment", { required: true })}
              placeholder="Enter some long form content"
              rows={8}
              className="shadow py-2 px-3 rounded border outline-none focus:ring-1 ring-yellow-500 form-textarea mt-1 block w-full"
            />
          </label>

          <div className="flex flex-col p-5">
            {errors.name && (
              <span className="text-red-500">- Name field is required</span>
            )}
            {errors.email && (
              <span className="text-red-500">- Email is required</span>
            )}
            {errors.comment && (
              <span className="text-red-500">- Comment is required</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-yellow-500 py-3 px-2 rounded-md text-white font-bold shadow hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
      )}

      {/* Comments */}
      <CommentBox post={post}/>
    </main>
  );
}
export default Post;

//using getStaticProps() we are telling nextjs which pages to prepare or prefetch or pre-build. The paths will be as per the data inside the slug object. This method will return an array of objects, and each object contains a "params" key which itself will hold a object and inside this object we would have "slug" as a key and its value will be the slug content
/*eg:
[
    {
        params: {
            slug: "post-1"
        } 
    }
]
*/

export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
        _id,
        slug {
        current
      }
      }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      postSlug: post.slug.current, //CHANGE
    },
  }));
  console.log("paths: ", paths);

  return {
    paths,
    //If fallback is 'blocking' , new paths not returned by getStaticPaths will wait for the HTML to be generated, identical to SSR (hence why blocking), and then be cached for future requests so it only happens once per path.
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log("params: ", params);
  const query = `*[_type == "post" && slug.current == $postSlug][0] {
        _id,
        _createdAt,
        title,
        author-> {
            name,
            image
        },
        'comments': *[
          _type == "comment" && 
          post._ref == ^._id && 
          approved == true],
        description,
        mainImage,
        slug,
        body
    }`;

  const post = await sanityClient.fetch(query, {
    postSlug: params?.postSlug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 10, //after 60 seconds it will update the old cached version
  };
};
