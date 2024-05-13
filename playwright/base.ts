import { test as base, expect } from '@playwright/test';

// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<{ page: void }>({
    page: async ({ page }, use) => {

        const errors: Array<Error> = [];
        page.addListener('pageerror', (error: any) => {
            errors.push(error)
        });

        // Use the fixture value in the test.
        await use(page);

        expect(errors).toHaveLength(0);
    },
});
export { expect } from '@playwright/test';