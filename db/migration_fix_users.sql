-- 1. Create the function to handle new user signup
-- This function mimics the metadata usually found in auth.users to public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, role, display_name)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'role', 'guest'),
    COALESCE(new.raw_user_meta_data->>'display_name', 'No Name')
  )
  ON CONFLICT (id) DO UPDATE
  SET
    role = EXCLUDED.role,
    display_name = EXCLUDED.display_name;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create the trigger specifically on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. Backfill existing users from auth.users to public.users
-- This fixes the immediate FK error for existing accounts
INSERT INTO public.users (id, role, display_name, created_at)
SELECT
  id,
  COALESCE(raw_user_meta_data->>'role', 'guest'),
  COALESCE(raw_user_meta_data->>'display_name', 'No Name'),
  created_at
FROM auth.users
ON CONFLICT (id) DO NOTHING;
