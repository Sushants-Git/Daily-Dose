import Head from "next/head";
import Landing from "../components/Landing";
import Transaction from "../components/Transaction";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Daily Dose of Productivity</title>
        <meta name="description" content="My first web3 app on Flow!" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <Transaction />
        <div>
          <Landing />
        </div>
      </main>
    </div>
  );
}
