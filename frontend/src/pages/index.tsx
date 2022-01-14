import type { NextPage } from "next";
import { useHelloWord } from "../hooks/useHelloWorld";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { helloWorld, state } = useHelloWord();

  return (
    <div className={styles.container}>
      {state === "loading" && <p>loading...</p>}
      {state === "error" && <p>Whoops, there was an error reaching the server</p>}
      {state === "success" && <p>{helloWorld}</p>}
    </div>
  );
};

export default Home;
