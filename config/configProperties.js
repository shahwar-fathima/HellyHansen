const TestConfig = {
    TEST_ENV: process.env.TEST_ENV || 'qa',
    browser: process.env.browser || 'chromium',



};

module.exports = { TestConfig };