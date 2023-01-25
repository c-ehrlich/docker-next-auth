import { type GetServerSideProps } from "next";
import { getProviders, signIn } from "next-auth/react";
import { type ClientSafeProvider, type LiteralUnion } from "next-auth/react";
import { type BuiltInProviderType } from "next-auth/providers";
import { getServerAuthSession } from "../server/auth";

type Providers = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const providers = await getProviders();

  return {
    props: { providers },
  };
};

type SignInProps = {
  providers: Providers;
};

const SignIn = ({ providers }: SignInProps) => {
  if (!providers) return null;
  return (
    <main className="mt-40 flex justify-center">
      <h1 className="text-5xl text-red-500">Custom signin page</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={() => signIn(provider.id)}
            className="rounded-full border bg-blue-600 px-8 py-5 text-2xl font-medium text-white transition hover:bg-blue-500"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </main>
  );
};

export default SignIn;
