# TODO - Admin credentials update

## Steps
1. Update the admin seed password in source code (src/lib/supabase.js) to the new password.
2. Update the admin seed password in SQL schema files (supabase-schema.sql and create-db.cjs) to the same new password.
3. Re-deploy / re-run DB initialization so the admin user password is set to the new value.
4. Commit the changes to a new branch and push to GitHub.
5. Verify login with the updated credentials.

