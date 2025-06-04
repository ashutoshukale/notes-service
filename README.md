# Custom Notes Service – Supabase Mini Project

This is a lightweight Supabase backend service for managing personal notes. It supports note creation and retrieval via authenticated RESTful endpoints.

---

## 📐 Design Rationale

- **Primary Key**: UUIDs ensure global uniqueness and are compatible with Supabase defaults.
- **user_id**: Tied to Supabase Auth's `auth.users`, enforces multi-user isolation.
- **Timestamps**: Auto-set `created_at` and `updated_at` for auditing and ordering.
- **POST /notes**: Used POST to create a resource; body carries the note data.
- **GET /notes**: Used GET to retrieve resources for the current authenticated user via header.

---

## Setup & Deploy

### 1. Create Supabase Project

- Go to [Supabase](https://app.supabase.com/), create a project.
- Go to `Settings > API` and note your `SUPABASE_URL`,  `SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY`.

### 2. Set Environment Variables

In your local `.env` :
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
