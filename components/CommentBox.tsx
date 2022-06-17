import React from "react";
import { Post } from "../typings";

interface Props {
  post: Post;
//   name: string;
}

export default function CommentBox({ post}: Props) {
    // console.log("Name: ",name)
  return (
    <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow shadow-yellow-500 space-y-2">
      <h3 className="text-4xl">Comments</h3>
      <hr className="pb-2" />

     
        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p>
              <span className="text-yellow-500">{comment.name}: </span>
              {comment.comment}
            </p>
          </div>
        ))}
    </div>
  );
}
