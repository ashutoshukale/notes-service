# Custom Notes Service – Supabase Mini Project

This is a lightweight Supabase backend service for managing personal notes. It supports note creation and retrieval via authenticated RESTful endpoints.

---

## Design Rationale

- **Primary Key**: UUIDs ensure global uniqueness and are compatible with Supabase defaults.
- **user_id**: Tied to Supabase Auth's `auth.users`, enforces multi-user isolation.
- **Timestamps**: Auto-set `created_at` and `updated_at` for auditing and ordering.
- **POST /notes**: Used POST to create a resource; body carries the note data.
- **GET /notes**: Used GET to retrieve resources for the current authenticated user via header.

---

## Setup & Deploy

### 1. Clone the repo

- git clone https://github.com/ashutoshukale/notes-service.git
- cd notes-service

### 2. Install Supabase 

- npm install -g supabase
- npm install supabase@/supabase-js@2.24.3

### 3. Create Supabase Project

- Go to [Supabase](https://app.supabase.com/), create a project.
- Go to `Settings > API` and note your `SUPABASE_URL`,  `SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY`.

### 4. Set Environment Variables

In your local `.env` :
- SUPABASE_URL=https://<your-project>.supabase.co
- SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
- SUPABASE_ANON_KEY=your-anon-key

### 5. Start Local Supabase for Development (Optional)

- supabase start

### 6. Apply Database Schema

- supabase login
- supabase db push

### 7. Deploy Edge Functions

- supabase functions deploy post_notes
- supabase functions deploy get_notes

### 8. API Demo
#### 1.  Create Note - post_notes

curl -X POST https://<your-project_id>.functions.supabase.co/post_notes \
  -H "Authorization: Bearer <anon_key>" \
  -H "Content-Type: application/json" \
  -d '{"title": "My Note", "content": "This is the body of the note."}'
  
Response:
  {
  "id": "06f331d0-a4fj-44cd-ad29-73232fd679241",
  "user_id": "07fa31e0-e4ee-40cb-ab29-75832b679345",
  "title": "My Note",
  "content": "This is the body of the note.",
  "created_at": "2025-06-03 17:12:30.343324+00",
  "updated_at": "2025-06-03 17:12:30.343324+00"
}

#### 2.  Get Notes -get_notes

curl -X POST https://<your-project_id>.functions.supabase.co/get_notes \
  -H "Authorization: Bearer <anon_key>" \
  
Response:
[

  {
    "id": "06f331d0-a4fj-44cd-ad29-73232fd679241",
    "title": "My Note",
    "content": "This is the body of the note.",
    "created_at": "2025-06-03 17:12:30.343324+00",
    "updated_at": "2025-06-03 17:12:30.343324+00"
  },
  
]

