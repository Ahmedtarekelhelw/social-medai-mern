//Context
import { createContext, useContext, useState } from "react";

// Redux
import { useSelector } from "react-redux";
import { users } from "../features/users/usersSlice";

const FriendsContext = createContext();

export const FriendsContextProvider = ({ children }) => {
  const { user } = useSelector(users);

  const [friendsIds, setFriendsIds] = useState(
    user?.friends?.length === 0 ? [] : user?.friends
  );
  const [addFriendLoading, setAddFriendLoading] = useState(false);
  return (
    <FriendsContext.Provider
      value={{
        friendsIds,
        setFriendsIds,
        addFriendLoading,
        setAddFriendLoading,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriendsContext = () => useContext(FriendsContext);
