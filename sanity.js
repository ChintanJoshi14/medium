import {
    createCurrentUserHook,
    createClient,
}
from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2021-03-25",
    useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(config);

//to get the image url from the response
export const urlFor = (source) => imageUrlBuilder(config).image(source);

//helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config);