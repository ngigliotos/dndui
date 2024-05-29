import { RouterProvider } from "react-router-dom";
import router from "./utils/Router";
import { createRoot } from "react-dom/client";
import { ConfigProvider, theme } from "antd";
import { ReactElement, useState } from "react";
import { Provider } from "react-redux";
import { store, storeOptions } from "./store/store";
import { configureStore } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";

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
