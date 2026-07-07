import DiceGame from "@/components/DiceGame";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dice Game</title>
        <meta name="description" content="Dice game test task" />
      </Head>
      <DiceGame />
    </>
  );
}
