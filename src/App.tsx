import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PhoneFrame } from './components/PhoneFrame'

// Auth
import { Welcome } from './screens/auth/Welcome'
import { SignUp } from './screens/auth/SignUp'
import { SignIn } from './screens/auth/SignIn'
import { ForgotPassword } from './screens/auth/ForgotPassword'
import { ResetPassword } from './screens/auth/ResetPassword'
import { AcceptInvitation } from './screens/auth/AcceptInvitation'

// Onboarding
import { SendInvitation } from './screens/onboarding/SendInvitation'
import { WaitingForPartner } from './screens/onboarding/WaitingForPartner'
import { SelectFocusAreas } from './screens/onboarding/SelectFocusAreas'
import { BaselineRatings } from './screens/onboarding/BaselineRatings'
import { InitialGoals } from './screens/onboarding/InitialGoals'
import { ReviewConfirm } from './screens/onboarding/ReviewConfirm'
import { DoThisLater } from './screens/onboarding/DoThisLater'
import { SetupPendingGate } from './screens/onboarding/SetupPendingGate'

// Home
import { Dashboard } from './screens/home/Dashboard'
import { PartnerProgress } from './screens/home/PartnerProgress'
import { SparksFeed } from './screens/home/SparksFeed'
import { QuickActions } from './screens/home/QuickActions'
import { ApprovalBanners } from './screens/home/ApprovalBanners'

// Us
import { FocusAreaOverview } from './screens/us/FocusAreaOverview'
import { WeeklyCheckIn } from './screens/us/WeeklyCheckIn'
import { KeyInsight } from './screens/us/KeyInsight'
import { SuggestedActions } from './screens/us/SuggestedActions'

// Habits
import { HabitList } from './screens/habits/HabitList'
import { Goals } from './screens/habits/Goals'
import { FocusAreaManagement } from './screens/habits/FocusAreaManagement'

// Profile
import { Account } from './screens/profile/Account'
import { Partnership } from './screens/profile/Partnership'
import { NotificationPrefs } from './screens/profile/NotificationPrefs'
import { AppSettings } from './screens/profile/AppSettings'
import { SignOut } from './screens/profile/SignOut'

// Notifications
import { NotificationCenter } from './screens/notifications/NotificationCenter'

// Shared
import { HabitDetail } from './screens/shared/HabitDetail'
import { AddHabit } from './screens/shared/AddHabit'
import { AddGoal } from './screens/shared/AddGoal'
import { FocusAreaDetail } from './screens/shared/FocusAreaDetail'
import { WeeklyCheckInFlow } from './screens/shared/WeeklyCheckInFlow'
import { SendSpark } from './screens/shared/SendSpark'
import { SparkDetail } from './screens/shared/SparkDetail'
import { ApprovalReview } from './screens/shared/ApprovalReview'
import { EditFocusArea } from './screens/shared/EditFocusArea'
import { GoalDetail } from './screens/shared/GoalDetail'
import { HabitSuggestions } from './screens/shared/HabitSuggestions'
import { SuggestAHabit } from './screens/shared/SuggestAHabit'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PhoneFrame />}>
          {/* Auth */}
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/accept-invitation" element={<AcceptInvitation />} />

          {/* Onboarding */}
          <Route path="/onboarding/send-invitation" element={<SendInvitation />} />
          <Route path="/onboarding/waiting" element={<WaitingForPartner />} />
          <Route path="/onboarding/select-focus-areas" element={<SelectFocusAreas />} />
          <Route path="/onboarding/baseline-ratings" element={<BaselineRatings />} />
          <Route path="/onboarding/initial-goals" element={<InitialGoals />} />
          <Route path="/onboarding/review" element={<ReviewConfirm />} />
          <Route path="/onboarding/do-this-later" element={<DoThisLater />} />
          <Route path="/onboarding/setup-pending" element={<SetupPendingGate />} />

          {/* Home tab */}
          <Route path="/home" element={<Dashboard />} />
          <Route path="/home/partner-progress" element={<PartnerProgress />} />
          <Route path="/home/sparks" element={<SparksFeed />} />
          <Route path="/home/quick-actions" element={<QuickActions />} />
          <Route path="/home/approvals" element={<ApprovalBanners />} />

          {/* Us tab */}
          <Route path="/us" element={<FocusAreaOverview />} />
          <Route path="/us/weekly-check-in" element={<WeeklyCheckIn />} />
          <Route path="/us/key-insight" element={<KeyInsight />} />
          <Route path="/us/suggested-actions" element={<SuggestedActions />} />

          {/* Habits tab */}
          <Route path="/habits" element={<HabitList />} />
          <Route path="/habits/goals" element={<Goals />} />
          <Route path="/habits/focus-area-management" element={<FocusAreaManagement />} />

          {/* Profile tab */}
          <Route path="/profile" element={<Account />} />
          <Route path="/profile/partnership" element={<Partnership />} />
          <Route path="/profile/notification-prefs" element={<NotificationPrefs />} />
          <Route path="/profile/app-settings" element={<AppSettings />} />
          <Route path="/profile/sign-out" element={<SignOut />} />

          {/* Notifications */}
          <Route path="/notifications" element={<NotificationCenter />} />

          {/* Shared stack */}
          <Route path="/shared/habit-detail/:id" element={<HabitDetail />} />
          <Route path="/shared/add-habit" element={<AddHabit />} />
          <Route path="/shared/add-goal" element={<AddGoal />} />
          <Route path="/shared/focus-area-detail/:id" element={<FocusAreaDetail />} />
          <Route path="/shared/weekly-check-in-flow" element={<WeeklyCheckInFlow />} />
          <Route path="/shared/send-spark" element={<SendSpark />} />
          <Route path="/shared/spark-detail/:id" element={<SparkDetail />} />
          <Route path="/shared/approval-review" element={<ApprovalReview />} />
          <Route path="/shared/edit-focus-area" element={<EditFocusArea />} />
          <Route path="/shared/goal-detail/:id" element={<GoalDetail />} />
          <Route path="/shared/habit-suggestions" element={<HabitSuggestions />} />
          <Route path="/shared/suggest-a-habit" element={<SuggestAHabit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
