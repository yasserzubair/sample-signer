import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WalletProvider } from "@suiet/wallet-kit";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </StrictMode>
);
