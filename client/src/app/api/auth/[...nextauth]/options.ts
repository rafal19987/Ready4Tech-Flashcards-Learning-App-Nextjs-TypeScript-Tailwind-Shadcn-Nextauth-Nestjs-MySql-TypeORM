import { type NextAuthOptions } from 'next-auth';
import { type JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(`${process.env.API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });
  console.log('refreshed');

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY!,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      return await refreshToken(token);
    },

    session: async ({ token, session }) => {
      console.log('session:', session);
      console.log('token', token);
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
  secret: process.env.SECRET!,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      authorize: async (credentials, req) => {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;

        try {
          const res = await fetch(`${process.env.API_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });

          if (!res.ok) {
            console.log(res.statusText);
            return null;
          }

          const user = await res.json();
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
};
