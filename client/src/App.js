import { useMemo, lazy, Suspense } from "react";

// React Router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  useLocation,
} from "react-router-dom";

// My Components
import SuspenseSkeleton from "./components/skeleton/SuspenseSkeleton";

// Redux
import { useSelector } from "react-redux";
import { users } from "./features/users/usersSlice";

//Context
import { useModeContext } from "./context/DarkmodeContext";

// MUI
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";

// Layout
import RootLayout from "./layout/RootLayout";

// pages
const Home = lazy(() => import("./pages/Home"));
const Auth = lazy(() => import("./pages/Auth"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const Search = lazy(() => import("./pages/Search"));

const ProtectRoute = ({ children }) => {
  const { user } = useSelector(users);
  const location = useLocation();
  if (!user) return <Navigate to="/auth" state={{ from: location }} replace />;
  return children;
};

const ProtectAuth = ({ children }) => {
  const { user } = useSelector(users);
  if (user) return <Navigate to="/" />;
  return children;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route
        path="/"
        element={
          <ProtectRoute>
            <Suspense fallback={<SuspenseSkeleton />}>
              <Home />
            </Suspense>
          </ProtectRoute>
        }
      />
      <Route
        path="profile/:id"
        element={
          <ProtectRoute>
            <Suspense fallback={<SuspenseSkeleton />}>
              <Profile />
            </Suspense>
          </ProtectRoute>
        }
      />
      <Route
        path="settings"
        element={
          <ProtectRoute>
            <Suspense fallback={<SuspenseSkeleton />}>
              <Settings />
            </Suspense>
          </ProtectRoute>
        }
      />
      <Route
        path="search"
        element={
          <ProtectRoute>
            <Suspense fallback={<SuspenseSkeleton />}>
              <Search />
            </Suspense>
          </ProtectRoute>
        }
      />

      <Route
        path="auth"
        element={
          <ProtectAuth>
            <Suspense fallback={<SuspenseSkeleton />}>
              <Auth />
            </Suspense>
          </ProtectAuth>
        }
      />
    </Route>
  )
);

const App = () => {
  const { mode } = useModeContext();

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
