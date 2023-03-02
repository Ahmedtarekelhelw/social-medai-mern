import { createContext, useContext, useState } from "react";

const postContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [post, setPost] = useState(null);
  const [desc, setDesc] = useState("");
  const [picPath, setPicPath] = useState("");

  return (
    <postContext.Provider
      value={{
        post,
        setPost,
        desc,
        setDesc,
        picPath,
        setPicPath,
      }}
    >
      {children}
    </postContext.Provider>
  );
};

export const usePostContext = () => useContext(postContext);
