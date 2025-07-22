import { Injectable, UnauthorizedException } from "@nestjs/common";
import { createClient, SupabaseClient, User } from "@supabase/supabase-js";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(private prisma: PrismaService) {
    this.supabase = createClient(
      process.env.SUPABASE_URL || "http://127.0.0.1:54321",
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU"
    );
  }

  async validateToken(token: string): Promise<User> {
    try {
      const {
        data: { user },
        error,
      } = await this.supabase.auth.getUser(token);

      if (error || !user) {
        throw new UnauthorizedException("Invalid token");
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException("Token validation failed");
    }
  }

  async getOrCreateProfile(user: User) {
    try {
      // Check if profile exists
      let profile = await this.prisma.profile.findUnique({
        where: { id: user.id },
      });

      // If not, create from Supabase auth user
      if (!profile) {
        profile = await this.prisma.profile.create({
          data: {
            id: user.id,
            email: user.email!,
            pseudo: user.user_metadata?.pseudo || user.email!.split("@")[0],
            level: 5, // Default intermediate level
            preferred_side: "both",
            is_verified: user.email_confirmed_at ? true : false,
          },
        });
      }

      return profile;
    } catch (error) {
      throw error;
    }
  }

  async signUp(email: string, password: string, userData: any = {}) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });

    if (error) throw error;
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }

  async signOut(token: string) {
    const { error } = await this.supabase.auth.admin.signOut(token);
    if (error) throw error;
  }

  async refreshToken(refreshToken: string) {
    const { data, error } = await this.supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error) throw error;
    return data;
  }
}
