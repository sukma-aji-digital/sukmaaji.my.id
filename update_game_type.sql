-- Update script untuk memastikan game_type field ada dan terisi dengan benar
-- Jalankan script ini di Supabase SQL Editor

-- 1. Pastikan kolom game_type ada (jika belum ada)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'game_sessions' 
        AND column_name = 'game_type'
    ) THEN
        ALTER TABLE game_sessions ADD COLUMN game_type VARCHAR(50) DEFAULT 'math';
        RAISE NOTICE 'Column game_type added to game_sessions table';
    ELSE
        RAISE NOTICE 'Column game_type already exists';
    END IF;
END $$;

-- 2. Update existing records yang belum punya game_type
UPDATE game_sessions 
SET game_type = 'math' 
WHERE game_type IS NULL OR game_type = '';

-- 3. Buat index untuk performa yang lebih baik
CREATE INDEX IF NOT EXISTS idx_game_sessions_game_type ON game_sessions(game_type);
CREATE INDEX IF NOT EXISTS idx_game_sessions_score_desc ON game_sessions(score DESC);
CREATE INDEX IF NOT EXISTS idx_game_sessions_user_game_type ON game_sessions(user_id, game_type);
CREATE INDEX IF NOT EXISTS idx_game_sessions_created_at ON game_sessions(created_at DESC);

-- 4. Buat constraint untuk memastikan game_type tidak kosong
ALTER TABLE game_sessions 
ADD CONSTRAINT check_game_type_not_empty 
CHECK (game_type IS NOT NULL AND game_type != '');

-- 5. Update RLS policies jika diperlukan
-- Policy untuk SELECT
DROP POLICY IF EXISTS "Enable read access for all users" ON game_sessions;
CREATE POLICY "Enable read access for all users" ON game_sessions
    FOR SELECT USING (true);

-- Policy untuk INSERT (hanya user yang login)
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON game_sessions;
CREATE POLICY "Enable insert for authenticated users only" ON game_sessions
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy untuk UPDATE (hanya pemilik data)
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON game_sessions;
CREATE POLICY "Enable update for users based on user_id" ON game_sessions
    FOR UPDATE USING (auth.uid()::text = user_id);

-- 6. Refresh materialized views jika ada
-- (Uncomment jika ada materialized views)
-- REFRESH MATERIALIZED VIEW CONCURRENTLY mv_leaderboard;

-- 7. Verify the changes
SELECT 
    'game_sessions' as table_name,
    COUNT(*) as total_records,
    COUNT(DISTINCT game_type) as distinct_game_types,
    string_agg(DISTINCT game_type, ', ') as game_types
FROM game_sessions;

-- 8. Show sample data
SELECT 
    id,
    user_id,
    game_type,
    score,
    level_reached,
    accuracy_percentage,
    created_at
FROM game_sessions
ORDER BY created_at DESC
LIMIT 5;

COMMIT;