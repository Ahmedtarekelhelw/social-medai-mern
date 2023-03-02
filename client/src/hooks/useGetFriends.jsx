import axiosInstance from "../axiosInstance";
import { useDispatch } from "react-redux";
import {
  endLoadFriends,
  setUserFriends,
  startLoadFriends,
} from "../features/users/usersSlice";
const useGetFriends = (id) => {
  const dispatch = useDispatch();

  const getFriends = async () => {
    try {
      dispatch(startLoadFriends());
      const res = await axiosInstance.get(`users/${id}/friends`);
      dispatch(setUserFriends(res.data));
      dispatch(endLoadFriends());
    } catch (error) {
      console.log(error);
      dispatch(endLoadFriends());
    }
  };

  return {
    getFriends,
  };
};

export default useGetFriends;
