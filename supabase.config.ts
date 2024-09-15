import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { ConfigService } from "@nestjs/config";
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const SUPABASE_CONFIG: SupabaseClient = createClient(
  configService.getOrThrow('SUPABASE_URL'),
  configService.getOrThrow('SUPABASE_SECRET_KEY'),
  {
    auth: {
      persistSession: false
    }
  }
)