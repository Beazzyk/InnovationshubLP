import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Inkubator } from "./screens/Inkubator/Inkubator";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Inkubator />
  </StrictMode>,
);
