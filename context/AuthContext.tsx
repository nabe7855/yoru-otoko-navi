"use client";

import { createClient } from "@/lib/supabase/client";
import { Profile, Role } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: Profile | null;
  login: (email: string, password: string) => Promise<{ error: Error | null }>;
  signup: (
    email: string,
    password: string,
    role: Role,
    displayName: string,
  ) => Promise<{ error: Error | null }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const supabase = createClient();
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = React.useCallback(
    async (userId: string): Promise<Profile | null> => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .single();

        if (error) {
          if (error.code === "PGRST116") {
            console.log("No profile found for user:", userId);
          } else {
            console.error("Error fetching profile:", error);
          }
          return null;
        }
        return data as Profile;
      } catch (e) {
        console.error("Unexpected error in fetchProfile:", e);
        return null;
      }
    },
    [supabase],
  );

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      if (authUser) {
        const profile = await fetchProfile(authUser.id);
        setUser(profile);
      }
      setIsLoading(false);
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        setUser(profile);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, fetchProfile]);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error as Error | null };
  };

  const signup = async (
    email: string,
    password: string,
    role: Role,
    displayName: string,
  ) => {
    console.log("Starting sign up process for:", email);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
          role: role,
        },
      },
    });

    if (error) {
      console.error("Sign up failed:", error);
      return { error: error as Error | null };
    }

    console.log(
      "User signed up successfully. Profile will be created via database trigger.",
    );
    return { error: null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
