# Scoring System Update

## Summary

The scoring system has been completely redesigned to be much simpler and more intuitive. Instead of tracking detailed scores for each player, the system now focuses on tracking **winners only**.

## New Rules

1. **Daily Points**: Each game played per day can award a maximum of 1 point
2. **Winner Selection**: Only winners are tracked (no more score entry for everyone)
3. **Ties Supported**: Multiple winners can be selected for a single game (all get 1 point)
4. **Automatic Tracking**: Everyone in the group is assumed to play - if they don't win, they don't get a point
5. **Historical Entry**: You can enter scores for past dates
6. **Duplicate Prevention**: Cannot enter scores for the same date twice

## What Changed

### New Component: `DailyScoreEntry.tsx`

Replaced the old `InlineScoreTracker.tsx` with a cleaner interface:

- **Side-by-side layout**: Zip and Queens winners displayed next to each other
- **Checkbox selection**: Simple checkbox interface for selecting winners
- **Visual feedback**: Selected winners are highlighted with colored backgrounds
- **Summary display**: Shows count of winners before saving
- **Date picker**: Select any past or current date for score entry
- **Responsive design**: Works great on mobile and desktop

### New Server Action: `addDailyScores()`

Created a new streamlined server action in `app/actions/scores.ts`:

- Accepts an array of winner selections (userId + game + date)
- All winners get exactly 1 point per game
- Prevents duplicate entries for the same date
- Validates group membership for all players
- Transaction-based for data consistency

### Schema Unchanged

The database schema remains the same - we're just using it differently:

- `points` field: Always 1 for winners (0 points never stored)
- `time` and `backtracks`: Optional fields (not currently used but available)
- Unique constraint: `groupId_userId_game_date` prevents duplicates

## User Experience Improvements

### Before
- Had to enter scores for every player
- Confusing increment/decrement buttons
- Separate entry for each game type
- Unclear what "points" meant

### After
- Just select the winners with checkboxes
- Clear visual distinction between Zip and Queens
- Side-by-side layout for quick entry
- Obvious that 1 winner = 1 point
- Support for ties (multiple winners)

## Migration Notes

No database migration needed! The existing schema supports this new workflow perfectly. Old scores remain intact and will display correctly in:

- Leaderboards (sum of all points)
- Trend charts (cumulative over time)
- Score history (individual game results)

## Technical Details

### Files Created
- `/components/DailyScoreEntry.tsx` - New score entry component

### Files Modified
- `/app/actions/scores.ts` - Added `addDailyScores()` server action
- `/app/group/[id]/GroupClient.tsx` - Replaced `InlineScoreTracker` with `DailyScoreEntry`

### Files Deprecated (Not Deleted)
- `/components/InlineScoreTracker.tsx` - Can be removed in future cleanup
- `/components/AddScoreDialog.tsx` - Can be removed in future cleanup

### TypeScript Fixes Applied
- Used `Array.from()` for Set iteration to avoid downlevelIteration requirement
- Maintained type safety with `as const` for game types

## Testing Checklist

- [x] Build passes without errors
- [x] TypeScript compilation succeeds
- [ ] Test winner selection on desktop
- [ ] Test winner selection on mobile
- [ ] Test date picker for past dates
- [ ] Test duplicate prevention
- [ ] Test tie scenarios (multiple winners)
- [ ] Verify leaderboard calculations
- [ ] Verify trend charts
- [ ] Verify score history display

## Next Steps

1. Test the new interface in development
2. Verify all scoring flows work correctly
3. Optionally clean up deprecated components
4. Deploy to production

## Benefits

✅ **Simpler UX**: Checkbox selection is intuitive
✅ **Faster entry**: No need to track every player's score
✅ **Clearer meaning**: 1 point = 1 win
✅ **Tie support**: Multiple winners allowed naturally
✅ **Mobile friendly**: Side-by-side layout works on all screens
✅ **No migration**: Existing data remains compatible

