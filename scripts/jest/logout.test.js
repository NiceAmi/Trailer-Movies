const log_out = require('./logout.js');

// Mock localStorage.clear() and window.location.href
global.localStorage = {
    clear: jest.fn()
};

global.window = {
    location: { href: '' }
};

test('log_out function clears localStorage and redirects to login page', () => {
    log_out();

    // Expect localStorage.clear() to be called
    expect(localStorage.clear).toHaveBeenCalled();

    // Expect window.location.href to be set to the login page
    expect(global.window.location.href).toBe('../pages/login.html');
});
