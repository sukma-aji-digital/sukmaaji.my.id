import NextAuth, { type AuthOptions, type User, type Account, type Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { type Session } from "next-auth";
import { type JWT } from "next-auth/jwt";
import { supabaseAdmin } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile;
    }) {
      if (account?.provider === "google") {
        try {
          // Check if user exists in our database
          const { data: existingUser, error: selectError } = await supabaseAdmin
            .from("users")
            .select("*")
            .eq("google_id", user.id)
            .single();

          if (selectError && selectError.code !== "PGRST116") {
            console.error("Error checking user:", selectError);
            return false;
          }

          // If user doesn't exist, create them
          if (!existingUser) {
            const newUserId = uuidv4();
            console.log("Creating new user with ID:", newUserId);

            const { data: insertedUser, error: insertError } = await supabaseAdmin
              .from("users")
              .insert({
                id: newUserId,
                google_id: user.id,
                email: user.email!,
                name: user.name!,
                avatar_url: user.image,
              })
              .select()
              .single();

            if (insertError) {
              console.error("Error creating user:", insertError);
              return false;
            }

            console.log("Successfully created user:", insertedUser);
          } else {
            // Update user info (in case name or avatar changed)
            const { error: updateError } = await supabaseAdmin
              .from("users")
              .update({
                name: user.name!,
                avatar_url: user.image,
                updated_at: new Date().toISOString(),
              })
              .eq("google_id", user.id);

            if (updateError) {
              console.error("Error updating user:", updateError);
            }
          }

          return true;
        } catch (error) {
          console.error("SignIn error:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user?.email) {
        try {
          // Get user data from our database
          const { data: userData, error } = await supabaseAdmin
            .from("users")
            .select("*")
            .eq("email", session.user.email)
            .single();

          if (userData && !error) {
            // Add our database user info to the session
            (session.user as any).id = userData.id;
            (session.user as any).google_id = userData.google_id;
            (session.user as any).dbUserId = userData.id; // Add explicit dbUserId for clarity
            console.log("Session user ID set to:", userData.id);
          } else {
            console.error("Failed to get user data for session:", error);
          }
        } catch (error) {
          console.error("Session error:", error);
        }
      }
      return session;
    },
    async jwt({ token, user, account }: { token: JWT; user?: User; account?: Account | null }) {
      if (account && user) {
        token.google_id = user.id;

        // Also get the database user ID and store it in the token
        try {
          const { data: userData, error } = await supabaseAdmin
            .from("users")
            .select("id")
            .eq("google_id", user.id)
            .single();

          if (userData && !error) {
            token.dbUserId = userData.id;
          }
        } catch (error) {
          console.error("JWT callback error:", error);
        }
      }
      return token;
    },
  },
  // Configure domain settings
  useSecureCookies: process.env.NODE_ENV === "production",
  secret: process.env.NEXTAUTH_SECRET,
  // Remove custom pages to use NextAuth default pages
  // pages: {
  //   signIn: "/auth/signin",
  //   error: "/auth/error",
  // }
};

export default NextAuth(authOptions);
