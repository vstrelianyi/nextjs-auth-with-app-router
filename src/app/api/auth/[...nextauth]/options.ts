
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';

export const options: NextAuthOptions = {
  providers: [
    // https://next-auth.js.org/configuration/providers/credentials
    CredentialsProvider( {
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'your user name', },
        password: { label: 'Password', type: 'password', placeholder: 'your password', },
      },
      async authorize (
        credentials
        // req
      ) {
        // EXAMPLE 1
        // const res = await fetch("/your/endpoint", {
        // 	method: 'POST',
        // 	body: JSON.stringify(credentials),
        // 	headers: { "Content-Type": "application/json" }
        // })
        // const user = await res.json()
        // if (res.ok && user) {
        // 	return user
        // }
        // return null

        // EXAMPLE 2
        const user = { id: '24', name: 'viktor', password: '1234', };
        if ( credentials?.username === user.name && credentials?.password === user.password ){
          return user;
        }

        return null;
      },
    } ),
    // https://next-auth.js.org/configuration/providers/oauth
    GitHubProvider( {
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    } ),
  ],
  pages: {
    signIn: '/signIn',
    error: '/signInError',
    // signOut: "/auth/signout",
    // verifyRequest: "/auth/verify-request",
    // newUser: undefined
  },

};