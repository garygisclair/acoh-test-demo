export const USER = {
  name: 'Gary',
  email: 'gary@example.com',
  avatar: 'G',
}

export const PARTNER = {
  name: 'Alex',
  email: 'alex@example.com',
  avatar: 'A',
}

export const FOCUS_AREAS = [
  { id: 1, name: 'Communication', score: 78, trend: 'up' as const, alignment: 'High' },
  { id: 2, name: 'Quality Time', score: 65, trend: 'stable' as const, alignment: 'Medium' },
  { id: 3, name: 'Health & Energy', score: 82, trend: 'up' as const, alignment: 'High' },
  { id: 4, name: 'Intimacy', score: 55, trend: 'down' as const, alignment: 'Low' },
  { id: 5, name: 'Personal Growth', score: 71, trend: 'stable' as const, alignment: 'High' },
]

export const HABITS = [
  { id: 1, name: '10-min check-in', focusArea: 'Communication', frequency: 'Daily', type: 'Shared', completed: true, streak: 12 },
  { id: 2, name: 'Express appreciation', focusArea: 'Communication', frequency: 'Daily', type: 'Personal', completed: false, streak: 5 },
  { id: 3, name: 'No-phone time together', focusArea: 'Quality Time', frequency: 'Daily', type: 'Shared', completed: false, streak: 8 },
  { id: 4, name: 'Date night planning', focusArea: 'Quality Time', frequency: 'Weekly', type: 'Shared', completed: true, streak: 20 },
  { id: 5, name: 'Exercise together', focusArea: 'Health & Energy', frequency: '3x/week', type: 'Shared', completed: false, streak: 3 },
  { id: 6, name: 'Cook a healthy meal', focusArea: 'Health & Energy', frequency: 'Weekly', type: 'Personal', completed: false, streak: 6 },
  { id: 7, name: 'Read together', focusArea: 'Personal Growth', frequency: 'Daily', type: 'Shared', completed: true, streak: 2 },
  { id: 8, name: 'Express appreciation', focusArea: 'Intimacy', frequency: 'Daily', type: 'Shared', completed: true, streak: 15 },
]

export const TODAYS_HABITS = HABITS.filter(h => h.frequency === 'Daily')

export const PARTNER_COMPLETIONS = [
  { habitName: '10-min check-in', focusArea: 'Communication', completed: true },
  { habitName: 'Date night planning', focusArea: 'Quality Time', completed: false },
  { habitName: 'Put phones away at dinner', focusArea: 'Quality Time', completed: false },
  { habitName: 'Express appreciation', focusArea: 'Intimacy', completed: true },
]

export const SPARKS = [
  { id: 1, type: 'flame', from: 'Alex', message: 'Great job on the check-in today!', time: '2 hours ago', habitName: 'Daily check-in conversation' },
  { id: 2, type: 'star', from: 'Alex', message: 'You crushed it this week!', time: '5 hours ago', habitName: null },
  { id: 3, type: 'thumbs-up', from: 'Alex', message: 'Love that you remembered!', time: 'Yesterday', habitName: 'Express appreciation' },
  { id: 4, type: 'heart', from: 'Alex', message: '', time: 'Yesterday', habitName: 'Put phones away at dinner' },
  { id: 5, type: 'target', from: 'Alex', message: '12 day streak!', time: '2 days ago', habitName: 'Daily check-in conversation' },
]

export const APPROVALS = [
  { id: 1, title: 'Partner wants to add "Finances"', description: 'New focus area · Requires your approval', time: '2h ago', expires: '4d 22h' },
  { id: 2, title: 'New shared habit proposed', description: '"Weekly budget review" · Finances', time: '5h ago', expires: '2d 3h' },
  { id: 3, title: 'Priority change requested', description: 'Move "Communication" from #2 to #1', time: '1d ago', expires: '6d 1h' },
]

export const GOALS = [
  { id: 1, name: 'Communicate openly every day', focusArea: 'Communication', habits: ['Daily check-in conversation', 'Active listening practice'] },
  { id: 2, name: 'Prioritize quality time weekly', focusArea: 'Quality Time', habits: ['Weekly date night', 'Put phones away at dinner'] },
  { id: 3, name: 'Build healthy routines together', focusArea: 'Health & Energy', habits: ['Morning walk together', 'Meal prep Sunday'] },
  { id: 4, name: 'Stay financially aligned', focusArea: 'Finances', habits: ['Review budget together'] },
]

export const WEEKLY_HISTORY = [
  { week: 'Mar 31', scores: { Communication: 75, 'Quality Time': 62, 'Health & Energy': 80, Finances: 50, Intimacy: 68 } },
  { week: 'Mar 24', scores: { Communication: 72, 'Quality Time': 60, 'Health & Energy': 78, Finances: 52, Intimacy: 65 } },
  { week: 'Mar 17', scores: { Communication: 70, 'Quality Time': 58, 'Health & Energy': 75, Finances: 55, Intimacy: 63 } },
  { week: 'Mar 10', scores: { Communication: 68, 'Quality Time': 55, 'Health & Energy': 73, Finances: 48, Intimacy: 60 } },
  { week: 'Mar 3', scores: { Communication: 65, 'Quality Time': 52, 'Health & Energy': 70, Finances: 45, Intimacy: 58 } },
  { week: 'Feb 24', scores: { Communication: 62, 'Quality Time': 50, 'Health & Energy': 68, Finances: 42, Intimacy: 55 } },
  { week: 'Feb 17', scores: { Communication: 60, 'Quality Time': 48, 'Health & Energy': 65, Finances: 40, Intimacy: 52 } },
  { week: 'Feb 10', scores: { Communication: 58, 'Quality Time': 45, 'Health & Energy': 62, Finances: 38, Intimacy: 50 } },
]

export const NOTIFICATIONS = [
  { id: 1, group: 'Today', icon: 'sparkles', text: 'Spark received', time: '2m ago', target: '/home/sparks' },
  { id: 2, group: 'Today', icon: 'circle-check', text: 'Partner completed a habit', time: '1h ago', target: '/home/partner-progress' },
  { id: 3, group: 'Today', icon: 'alert-circle', text: 'Approval requested', time: '3h ago', target: '/home/approvals' },
  { id: 4, group: 'Yesterday', icon: 'calendar', text: 'Weekly check-in reminder', time: '1d ago', target: '/us/weekly-check-in' },
  { id: 5, group: 'Yesterday', icon: 'sparkles', text: 'Spark received', time: '1d ago', target: '/home/sparks' },
  { id: 6, group: 'Yesterday', icon: 'heart', text: 'Onboarding complete', time: '1d ago', target: '/home' },
  { id: 7, group: 'Earlier', icon: 'user-check', text: 'Partner accepted invitation', time: '3d ago', target: '/profile/partnership' },
]

export const FOCUS_AREA_PRESETS = [
  'Communication', 'Quality Time', 'Intimacy', 'Health & Energy',
  'Finances', 'Household', 'Parenting', 'Personal Growth',
]

export const SPARK_TYPES = [
  { icon: 'flame', label: 'Fire' },
  { icon: 'star', label: 'Star' },
  { icon: 'thumbs-up', label: 'Nice!' },
  { icon: 'heart', label: 'Love' },
  { icon: 'target', label: 'Goal!' },
  { icon: 'hand-heart', label: 'Heart' },
  { icon: 'handshake', label: 'Team' },
  { icon: 'sparkles', label: 'Spark' },
]

export const FOCUS_AREA_DETAIL = {
  name: 'Communication',
  score: 78,
  breakdown: [
    { input: 'Habit Completion', weight: '40%', value: '85%' },
    { input: 'Check-in Average', weight: '30%', value: '7.2/10' },
    { input: 'Alignment Score', weight: '20%', value: 'High' },
    { input: 'Consistency', weight: '10%', value: '92%' },
  ],
}
