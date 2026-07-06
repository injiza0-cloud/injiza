import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ssqlfbirfifeclrhwttq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzcWxmYmlyZmlmZWNscmh3dHRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NTkwODUsImV4cCI6MjA5NjQzNTA4NX0.UQbtW2slFvWn2-fX1V9Er5W76UqNe2dlNpgXiztzF4w'
const supabase = createClient(supabaseUrl, supabaseKey)

try {
  const { data, error } = await supabase.from('users').select('id,avatar_url').limit(1)
  console.log('select result:', JSON.stringify({ data, error }, null, 2))
} catch (err) {
  console.error('exception:', err)
}
