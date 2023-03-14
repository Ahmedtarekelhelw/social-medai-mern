//Context
import { createContext, useContext, useEffect, useState } from "react";

// Redux
import { useSelector } from "react-redux";
import { users } from "../features/users/usersSlice";

const FriendsContext = createContext();

export const FriendsContextProvider = ({ children }) => {
  const { user } = useSelector(users);

  const [friendsIds, setFriendsIds] = useState(user?.friends || []);

  useEffect(() => {
    if (user?.friends) {
      setFriendsIds(user?.friends);
    }
  }, [user?.friends]);

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
