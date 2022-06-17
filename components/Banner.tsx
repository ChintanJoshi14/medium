import React from "react";
import { sanityClient, urlFor } from '../sanity'

export default function Banner() {
    return (
        <div className="flex justify-between items-center  bg-yellow-400 border-y border-black py-10 lg:py-0">
        {/* change the padding below if Medium keyword is not properly assigned----tune hi likha hain yeh-CJ */}
        <div className="px-10 space-y-5">
          <h1 className="text-6xl font-serif max-w-xl"><span className="underline decoration-green-600 decoration-4">Medium</span> is a place to write, read, and connect</h1>
          <h2 className="text-l font-serif">It's easy and free to post your thinking on any topic and connect with millions of readers</h2>
        </div>
        <div>
          <img className="hidden md:inline-flex h-32 lg:h-full" src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" alt="" />
        </div>
      </div>
    );
}

