export const LocatorRepository: Record<string, string[]> = {
  username: [
    '#username',
    'input[name="username"]'
  ],
  password: [
    '#password',
    'input[name="password"]'
  ],
  loginButton: [
    'button[type="submit"]',
    'button:has-text("Login")'
  ],
  successMessage: [
    '#flash',
    'div.flash.success'
  ],
  logoutButton: [
    'a[href="/logout"]',
    'a:has-text("Logout")'
  ]
};