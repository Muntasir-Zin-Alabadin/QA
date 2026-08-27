import { test, expect } from "@playwright/test";

/**
 * Flutter Web Automation Portfolio Test
 *
 * CHALLENGE: Flutter Web renders UI elements directly onto a 2D/3D Canvas element,
 * bypassing the standard HTML DOM. When testing third-party apps with semantics disabled,
 * standard HTML queries, text tags, and ARIA roles completely fail to load.
 *
 * SOLUTION: This test suite implements a multi-layered production automation strategy:
 * Strategy 1: Visual Structural Baseline Regression Testing.
 * Strategy 2: Dynamic Percentage-Based Bounds Target Calculation paired with Visual State Verification.
 */
test.describe("Advanced Flutter Web Automation Strategies", () => {
    test.beforeEach(async ({ page }) => {
        // Extend execution timeout to account for cross-browser engine setup spikes
        test.setTimeout(90_000);

        await page.goto("https://flutter-angular.web.app/", {
            waitUntil: "domcontentloaded",
        });
    });

    test("Strategy 1: Validate Flutter app stability via Visual Regression Testing", async ({
        page,
    }) => {
        const flutterHost = page.locator("ng-flutter");
        await expect(flutterHost).toBeVisible({ timeout: 25_000 });

        const canvasElement = flutterHost.locator("canvas").first();
        await canvasElement.waitFor({ state: "visible", timeout: 25_000 });

        console.log(
            "📸 Capturing and matching canvas layout against baseline snapshots...",
        );

        // ASSERTION: Ensures the canvas graphics stack matches our reference files pixel-for-pixel
        await expect(canvasElement).toHaveScreenshot(
            "flutter-app-home-baseline.png",
            {
                maxDiffPixels: 250, // Permissive threshold for variable sub-pixel font anti-aliasing text curves
            },
        );
    });

    test("Strategy 2: Interact using Dynamic Fluid-Percentage Layout Coordinates", async ({
        page,
    }) => {
        const flutterHost = page.locator("ng-flutter");
        await expect(flutterHost).toBeVisible({ timeout: 25_000 });

        const canvasElement = flutterHost.locator("canvas").first();
        await canvasElement.waitFor({ state: "visible", timeout: 25_000 });

        console.log("📐 Calculating canvas responsive layout dimensions...");

        // BEST PRACTICE: Read the container bounds dynamically to handle scaling and viewpoint mutations gracefully
        const bounds = await canvasElement.boundingBox();
        if (!bounds)
            throw new Error(
                "Target Canvas bounding layout boundary box is unavailable.",
            );

        // Target the bottom-right quadrant section where the Floating Action Plus Button sits
        const clickX = bounds.width * 0.85; // 85% across the width
        const clickY = bounds.height * 0.88; // 88% down the height

        console.log(
            `Clicking dynamic percentage boundary coordinates: X: ${clickX.toFixed(1)}, Y: ${clickY.toFixed(1)}`,
        );

        // Perform the click interaction directly onto the canvas mapping zone
        await canvasElement.click({
            position: { x: clickX, y: clickY },
            force: true,
        });

        // Give the UI rendering context thread a split second to repaint the canvas graphics
        await page.waitForTimeout(2000);

        console.log(
            "📸 Verifying canvas state mutation via a visual state snapshot...",
        );

        // FIX: Verify against a unique snapshot matching the "incremented/clicked" state of the app
        // This ensures cross-browser stability for assertions without using negative matching.
        await expect(canvasElement).toHaveScreenshot(
            "flutter-app-incremented-state.png",
            {
                maxDiffPixels: 250,
            },
        );

        console.log(
            "🎯 Success! The Canvas state matched the expected incremented snapshot target state!",
        );
    });
});
