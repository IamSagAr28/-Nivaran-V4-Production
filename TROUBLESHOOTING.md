# Troubleshooting Newsletter & Emails

## Issue: "On subscribing newsletter no mail coming with discount code"

Your website uses Shopify's Customer API to subscribe users (`accepts_marketing: true`). However, the **Server** itself does not send emails. Shopify sends them based on your Marketing settings.

### How to Fix

1.  **Log in to Shopify Admin**.
2.  **Go to Settings -> Notifications**.
3.  **Check "Customer Marketing Confirmation"**: Ensure that "Double Opt-in" is enabled if you want them to confirm first, OR check "Marketing" section for "Welcome" emails.
4.  **Go to Marketing -> Automations**:
    *   Create a "Welcome New Subscriber" automation.
    *   Set the trigger to "Customer subscribed to email marketing".
    *   Add an action to "Send marketing email".
    *   **Important**: Edit the email content to include your **Discount Code**.

### Issue: "Discount Code not working"
1.  **Go to Discounts** in Shopify Admin.
2.  Create a discount code (e.g., `WELCOME10`).
3.  Ensure the code matches what you wrote in the email.

### Notes for Developers
*   The file `server/newsletter.js` calls `subscribeToNewsletter` in `server/shopify.js`.
*   This uses the Shopify Admin API to set `accepts_marketing = true`.
*   It does *not* trigger an email via code (Node.js). It relies on Shopify's internal automation hooks.
