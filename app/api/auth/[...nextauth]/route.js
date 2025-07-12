import NextAuth from "next-auth";
import GoogleProviders from "next-auth/providers/google";

import {connectToDB} from '@utils/database'
import User from '@models/user'



const handler = NextAuth({
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks:{
     async session({ session }) {
    const sessionUser = await User.findOne({
        email:session.user.email
    })

      session.user.id = sessionUser._id.toString();
    return session
  },
  async signIn({ profile }) {
    try {
      await connectToDB();
      const userExists = await User.findOne({ email: profile.email });
      if (!userExists) {
        console.log("Creating new user:", profile.email);
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture
        });
      } else {
        console.log("User exists:", profile.email);
      }
      return true;
    } catch (err) {
      console.error("SignIn error:", err);
      return false;
    }
  }

  }
 
});

export {handler as GET, handler as POST}