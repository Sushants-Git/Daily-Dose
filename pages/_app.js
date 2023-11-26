import "../styles/globals.css";
import Link from "next/link";
import AuthProvider from "../contexts/AuthContext";
import TransactionProvider from "../contexts/TransactionContext";

function MyApp({ Component, pageProps }) {
  return (
    <div className="nav-container">
      <main>
        <TransactionProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </TransactionProvider>
      </main>
    </div>
  );
}

export default MyApp;
