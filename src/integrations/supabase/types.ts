export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      drivers: {
        Row: {
          active: boolean | null
          created_at: string
          email: string | null
          hourly_rate: number | null
          id: string
          name: string
          phone: string | null
          pin: string
          role: Database["public"]["Enums"]["user_role"] | null
          truck_assigned: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          email?: string | null
          hourly_rate?: number | null
          id?: string
          name: string
          phone?: string | null
          pin: string
          role?: Database["public"]["Enums"]["user_role"] | null
          truck_assigned?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string
          email?: string | null
          hourly_rate?: number | null
          id?: string
          name?: string
          phone?: string | null
          pin?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          truck_assigned?: string | null
        }
        Relationships: []
      }
      job_sites: {
        Row: {
          active: boolean | null
          created_at: string
          id: string
          site_code: string
          site_name: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          id?: string
          site_code: string
          site_name: string
        }
        Update: {
          active?: boolean | null
          created_at?: string
          id?: string
          site_code?: string
          site_name?: string
        }
        Relationships: []
      }
      time_entries: {
        Row: {
          clock_in_time: string
          clock_out_time: string | null
          created_at: string
          date: string
          driver_id: string
          hours_worked: number | null
          id: string
          job_address: string | null
          job_site_id: string | null
          truck_number: string
        }
        Insert: {
          clock_in_time: string
          clock_out_time?: string | null
          created_at?: string
          date?: string
          driver_id: string
          hours_worked?: number | null
          id?: string
          job_address?: string | null
          job_site_id?: string | null
          truck_number: string
        }
        Update: {
          clock_in_time?: string
          clock_out_time?: string | null
          created_at?: string
          date?: string
          driver_id?: string
          hours_worked?: number | null
          id?: string
          job_address?: string | null
          job_site_id?: string | null
          truck_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "time_entries_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "admin_driver_overview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "time_entries_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "time_entries_job_site_id_fkey"
            columns: ["job_site_id"]
            isOneToOne: false
            referencedRelation: "job_sites"
            referencedColumns: ["id"]
          },
        ]
      }
      time_entries_archive: {
        Row: {
          archived_at: string
          clock_in_time: string
          clock_out_time: string | null
          created_at: string
          date: string
          driver_id: string
          driver_name: string
          hours_worked: number | null
          id: string
          job_address: string | null
          job_site_id: string | null
          original_entry_id: string
          truck_number: string
          week_end_date: string
          week_start_date: string
        }
        Insert: {
          archived_at?: string
          clock_in_time: string
          clock_out_time?: string | null
          created_at: string
          date: string
          driver_id: string
          driver_name: string
          hours_worked?: number | null
          id?: string
          job_address?: string | null
          job_site_id?: string | null
          original_entry_id: string
          truck_number: string
          week_end_date: string
          week_start_date: string
        }
        Update: {
          archived_at?: string
          clock_in_time?: string
          clock_out_time?: string | null
          created_at?: string
          date?: string
          driver_id?: string
          driver_name?: string
          hours_worked?: number | null
          id?: string
          job_address?: string | null
          job_site_id?: string | null
          original_entry_id?: string
          truck_number?: string
          week_end_date?: string
          week_start_date?: string
        }
        Relationships: []
      }
      todos: {
        Row: {
          id: number
          inserted_at: string
          is_complete: boolean | null
          task: string | null
          user_id: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          task?: string | null
          user_id: string
        }
        Update: {
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          task?: string | null
          user_id?: string
        }
        Relationships: []
      }
      weekly_earnings: {
        Row: {
          created_at: string
          driver_id: string
          id: string
          overtime_hours: number
          regular_hours: number
          total_earnings: number
          total_hours: number
          updated_at: string
          week_end_date: string
          week_start_date: string
        }
        Insert: {
          created_at?: string
          driver_id: string
          id?: string
          overtime_hours?: number
          regular_hours?: number
          total_earnings?: number
          total_hours?: number
          updated_at?: string
          week_end_date: string
          week_start_date: string
        }
        Update: {
          created_at?: string
          driver_id?: string
          id?: string
          overtime_hours?: number
          regular_hours?: number
          total_earnings?: number
          total_hours?: number
          updated_at?: string
          week_end_date?: string
          week_start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "weekly_earnings_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "admin_driver_overview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "weekly_earnings_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_earnings_archive: {
        Row: {
          archived_at: string
          driver_id: string
          driver_name: string
          hourly_rate: number
          id: string
          original_created_at: string
          original_earnings_id: string
          original_updated_at: string
          overtime_hours: number
          regular_hours: number
          total_earnings: number
          total_hours: number
          week_end_date: string
          week_start_date: string
        }
        Insert: {
          archived_at?: string
          driver_id: string
          driver_name: string
          hourly_rate: number
          id?: string
          original_created_at: string
          original_earnings_id: string
          original_updated_at: string
          overtime_hours?: number
          regular_hours?: number
          total_earnings?: number
          total_hours?: number
          week_end_date: string
          week_start_date: string
        }
        Update: {
          archived_at?: string
          driver_id?: string
          driver_name?: string
          hourly_rate?: number
          id?: string
          original_created_at?: string
          original_earnings_id?: string
          original_updated_at?: string
          overtime_hours?: number
          regular_hours?: number
          total_earnings?: number
          total_hours?: number
          week_end_date?: string
          week_start_date?: string
        }
        Relationships: []
      }
    }
    Views: {
      admin_driver_overview: {
        Row: {
          active: boolean | null
          all_time_earnings: number | null
          all_time_hours: number | null
          created_at: string | null
          current_week_earnings: number | null
          current_week_hours: number | null
          email: string | null
          hourly_rate: number | null
          id: string | null
          last_activity: string | null
          name: string | null
          phone: string | null
          pin: string | null
          truck_assigned: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      archive_completed_weeks: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      calculate_weekly_earnings: {
        Args:
          | Record<PropertyKey, never>
          | { p_driver_id: string; p_week_start: string }
        Returns: number
      }
    }
    Enums: {
      user_role: "driver" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["driver", "admin"],
    },
  },
} as const
