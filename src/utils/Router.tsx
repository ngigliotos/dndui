import { createHashRouter } from "react-router-dom";
import Pages from "../pages/pages";

const router = createHashRouter([
  {
    path: "*",
    element: <Pages />,
  },
]);

export default router;
