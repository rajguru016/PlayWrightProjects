export const SecurePageLocators = {
  pageHeader: [
    'h2',
    'h2:has-text("Secure Area")'
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