const routes = [
  {
    path: '/',
    component: () => import('layouts/LandingLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LandingPage.vue') },
      { path: 'about', component: () => import('pages/AboutPage.vue') },
      { path: 'contact', component: () => import('pages/ContactPage.vue') }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Dashboard.vue')},
      {path: '/home', component: () => import('pages/Dashboard.vue')},
      {path: '/students', component: () => import('src/pages/LearnersPage.vue')},
      {path: '/lessonplans', component: () => import('src/pages/LessonPlanPage.vue')},
      {path: '/users', component: () => import('src/pages/AppUsers.vue')},
      {path: '/projects', component: () => import('pages/WokoverseProjects.vue')},
      {path: '/calendar', component: () => import('pages/Calendar.vue')},
      {path: '/wokoverse', component: () => import('pages/Wokoverse.vue')},
      {path: '/gallery', component: () => import('pages/ResourceGallery.vue')},
      {path: '/profile', component: () => import('pages/Profile.vue')},
      {path: '/settings', component: () => import('pages/Settings.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  },
  {
    path: '/Maintenance',
    component: () => import('pages/Maintenance.vue')
  },
  {
    path: '/login',
    component: () => import('src/pages/LoginPage.vue')
  },
  {
    path: '/request-password-reset',
    name: 'RequestPasswordReset',
    component: () => import('pages/RequestPasswordResetPage.vue')
  },
  {
    path: '/verify-otp',
    name: 'VerifyOTP',
    component: () => import('pages/VerifyOTPPage.vue')
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('pages/ResetPasswordPage.vue')
  },
  {
    path: '/Lock',
    component: () => import('pages/LockScreen.vue')
  },
  {
    path: '/Lock-2',
    component: () => import('pages/LockScreen-2.vue')
  }
]

export default routes
