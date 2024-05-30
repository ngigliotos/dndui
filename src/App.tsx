import { RouterProvider } from "react-router-dom";
import router from "./utils/Router";
import { ConfigProvider, theme } from "antd";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        data-theme="dark"
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <RouterProvider router={{ ...router, basename: "/" }} />
      </ConfigProvider>
    </Provider>
  );
}

export default App;
