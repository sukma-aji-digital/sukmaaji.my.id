-- Database Validation and Testing Queries
-- Untuk memastikan semua data tersimpan dengan benar

-- 1. Check table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'game_sessions'
ORDER BY ordinal_position;

-- 2. Check if game_type column exists and has correct values
SELECT DISTINCT game_type, COUNT(*) as count
FROM game_sessions
GROUP BY game_type
ORDER BY count DESC;

-- 3. Validate data integrity - check for required fields
SELECT 
  COUNT(*) as total_sessions,
  COUNT(CASE WHEN user_id IS NULL THEN 1 END) as missing_user_id,
  COUNT(CASE WHEN game_type IS NULL THEN 1 END) as missing_game_type,
  COUNT(CASE WHEN score IS NULL THEN 1 END) as missing_score,
  COUNT(CASE WHEN level_reached IS NULL THEN 1 END) as missing_level,
  COUNT(CASE WHEN correct_answers IS NULL THEN 1 END) as missing_correct_answers,
  COUNT(CASE WHEN total_questions IS NULL THEN 1 END) as missing_total_questions,
  COUNT(CASE WHEN accuracy_percentage IS NULL THEN 1 END) as missing_accuracy
FROM game_sessions;

-- 4. Check user relationships
SELECT 
  gs.game_type,
  COUNT(gs.id) as total_sessions,
  COUNT(DISTINCT gs.user_id) as unique_users,
  COUNT(CASE WHEN u.id IS NULL THEN 1 END) as orphaned_sessions
FROM game_sessions gs
LEFT JOIN users u ON gs.user_id = u.id
GROUP BY gs.game_type;

-- 5. Check score distribution by game type
SELECT 
  game_type,
  MIN(score) as min_score,
  MAX(score) as max_score,
  AVG(score) as avg_score,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY score) as median_score
FROM game_sessions
GROUP BY game_type;

-- 6. Check recent sessions with user details
SELECT 
  gs.id,
  gs.game_type,
  gs.score,
  gs.level_reached,
  gs.accuracy_percentage,
  gs.created_at,
  u.name as user_name,
  u.email as user_email
FROM game_sessions gs
JOIN users u ON gs.user_id = u.id
ORDER BY gs.created_at DESC
LIMIT 10;

-- 7. Validate accuracy calculations
SELECT 
  id,
  game_type,
  correct_answers,
  total_questions,
  accuracy_percentage,
  ROUND((correct_answers::numeric / NULLIF(total_questions, 0)) * 100, 2) as calculated_accuracy,
  CASE 
    WHEN total_questions = 0 THEN 'Division by zero'
    WHEN ABS(accuracy_percentage - ROUND((correct_answers::numeric / total_questions) * 100, 2)) > 0.1 THEN 'Accuracy mismatch'
    ELSE 'OK'
  END as validation_status
FROM game_sessions
WHERE total_questions > 0
ORDER BY created_at DESC
LIMIT 20;

-- 8. Check for duplicate or suspicious sessions
SELECT 
  user_id,
  game_type,
  score,
  created_at,
  COUNT(*) as duplicate_count
FROM game_sessions
GROUP BY user_id, game_type, score, DATE_TRUNC('minute', created_at)
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;

-- 9. Performance check - top players by game type
SELECT 
  game_type,
  u.name,
  MAX(gs.score) as best_score,
  MAX(gs.level_reached) as highest_level,
  COUNT(gs.id) as total_games,
  AVG(gs.accuracy_percentage) as avg_accuracy
FROM game_sessions gs
JOIN users u ON gs.user_id = u.id
GROUP BY game_type, u.id, u.name
ORDER BY game_type, best_score DESC;

-- 10. Check time-based data consistency
SELECT 
  game_type,
  COUNT(*) as total_sessions,
  AVG(time_played) as avg_time_played,
  AVG(game_duration) as avg_game_duration,
  COUNT(CASE WHEN time_played > game_duration THEN 1 END) as time_inconsistencies
FROM game_sessions
GROUP BY game_type;