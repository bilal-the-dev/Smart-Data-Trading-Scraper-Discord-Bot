export interface customFetchOptions {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any[] | Record<any, any>;
  additionalHeaders?: Record<any, any>;
}

export interface AnnouncementResponse {
  component: string;
  props: {
    announcements: {
      current_page: number;
      data: Announcement[];
      first_page_url: string;
      from: number;
      last_page: number;
      last_page_url: string;
      links: PaginationLink[];
      next_page_url: string | null;
      path: string;
      per_page: number;
      prev_page_url: string | null;
      to: number;
      total: number;
    };
  };
}

export interface Announcement {
  id: number;
  user_id: number;
  type_id: number;
  room_id: number | null;
  is_public: number;
  title: string;
  content: string;
  push: number;
  sms: number;
  sms_custom_message: number;
  email: number;
  webhook: number;
  published: number;
  publish_at: string | null;
  trade_id: number | null;
  suppressed_subscriptions: null;
  hidden: boolean;
  created_at: string;
  updated_at: string;
  user: User;
  type: AnnouncementType;
  subscriptions: Subscription[];
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  profile_photo_path: string;
  profile_photo_url: string;
  two_factor_enabled: boolean;
  two_factor_allowed: boolean;
}

export interface AnnouncementType {
  id: number;
  label: string;
  label_color: string;
}

export interface Subscription {
  id: number;
  name: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}
