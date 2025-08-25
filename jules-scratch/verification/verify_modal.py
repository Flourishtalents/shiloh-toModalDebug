import asyncio
from playwright.async_api import async_playwright, expect
import re

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        try:
            await page.goto("http://localhost:5173/shilohexperience/tours", timeout=60000)

            # Find a "Book Now" button and click it.
            # We'll take the first one we find.
            book_now_button = page.get_by_role("button", name="Book Now").first
            await book_now_button.click()

            # Wait for the booking modal to appear.
            # The title of the modal is dynamic, so we'll look for a heading that starts with "Book".
            booking_modal_header = page.get_by_role("heading", name=re.compile(r"^Book"))
            await expect(booking_modal_header).to_be_visible()

            # Take a screenshot.
            await page.screenshot(path="jules-scratch/verification/verification.png")

            print("Screenshot taken successfully.")

        except Exception as e:
            print(f"An error occurred: {e}")
            await page.screenshot(path="jules-scratch/verification/error.png")

        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
