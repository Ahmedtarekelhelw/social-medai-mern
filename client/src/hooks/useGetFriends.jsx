import axiosInstance from "../axiosInstance";
import { useDispatch } from "react-redux";
import {
  endLoadFriends,
  setUserFriends,
  startLoadFriends,
} from "../features/users/usersSlice";
import { useState } from "react";
const useGetFriends = (id) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const getFriends = async () => {
    try {
      dispatch(startLoadFriends());
      const res = await axiosInstance.get(`users/${id}/friends`);
      dispatch(setUserFriends(res.data));
      dispatch(endLoadFriends());
    } catch (error) {
      setError(true);
      dispatch(endLoadFriends());
    }
  };

  return {
    getFriends,
    error,
  };
};

export default useGetFriends;
