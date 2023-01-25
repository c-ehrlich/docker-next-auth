import { type GetServerSideProps } from "next";
import { getServerAuthSession } from "../server/auth";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/sign/in",
      },
    };
  }

  return {
    props: { session },
  };
};

export default function Authed() {
  return (
    <main className="mt-40 flex justify-center">
      <h1 className="text-5xl text-red-500">Authed page</h1>
    </main>
  );
}
