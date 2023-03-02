import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { FriendsContextProvider } from "./context/FriendsContext";
import { PostContextProvider } from "./context/PostContext";
import store from "./store";
import { ModeContextProvider } from "./context/DarkmodeContext";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ModeContextProvider>
      <FriendsContextProvider>
        <PostContextProvider>
          <PersistGate loading={null} persistor={persistStore(store)}>
            <App />
          </PersistGate>
        </PostContextProvider>
      </FriendsContextProvider>
    </ModeContextProvider>
  </Provider>
);
