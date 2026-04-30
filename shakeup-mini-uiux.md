# ShakeUp Mini UI/UX Specification

## Purpose

ShakeUp Mini is a countertop nutrition kiosk for compact fitness and wellness locations. The touchscreen UX should make a fresh post-workout drink feel fast, clear, and low-risk for first-time users while giving operators predictable recovery states for payment, inventory, and service issues.

This is a UI/UX planning file, not a marketing webpage.

## Design Principles

- One decision per screen.
- Primary action is always visually dominant and placed in the same lower area.
- Each step should confirm what changed before moving forward.
- Use product imagery only where it helps choice confidence.
- Keep copy short enough to read while standing in front of a machine.
- Never expose machine complexity unless the user needs a recovery instruction.

## Ease Of Use Story

The user should understand the whole order path before they touch the machine: start, goal, flavor, pay, making, pickup. This path should appear in marketing material and kiosk UI training material as a six-step strip so operators can immediately explain why the product feels simple.

Key ease cues:

- Six focused screens instead of open-ended browsing.
- One dominant action per screen.
- Large tap targets for tired users after training.
- Goal-first language before ingredient details.
- Price and payment method close together.
- Countdown visible during preparation.
- Clear pickup confirmation before reset.

## Core User Journey

1. Idle / Start
   - Goal: invite interaction from 1-2 meters away.
   - Primary action: `Touch to start`.
   - Content: ShakeUp logo, product benefit, animated touch target.
   - Timeout behavior: remain in idle.

2. Select Goal
   - Goal: translate nutrition into workout intent.
   - Options: Lean Cut, Muscle Gain, Post Workout, Energy Boost.
   - Primary action: enabled after a goal is selected.
   - Secondary action: Back.
   - Validation: one selected goal required.

3. Select Drink
   - Goal: choose flavor and base product.
   - Content per drink: product image, flavor name, nutrition cue, price.
   - Primary action: Next.
   - Secondary action: Back.
   - Optional controls: carousel arrows or swipe.

4. Customize Drink
   - Goal: support add-ons without slowing the default path.
   - Controls: protein level, add-ons, temperature, liquid base.
   - Default state: normal protein, no add-ons, normal temperature, water.
   - Primary action: Continue to payment.
   - Secondary action: Skip customization.

5. Payment
   - Goal: confirm amount and payment method.
   - Methods: card, Samsung Pay, Naver Pay, Kakao Pay.
   - Primary action: Pay.
   - Recovery states: payment failed, payment canceled, network unavailable.

6. Making
   - Goal: reassure user while the machine works.
   - Content: countdown ring, selected drink name, short status line.
   - States: preparing cup, dispensing powder, mixing, finishing.
   - Blocked interactions: no back navigation after payment capture.

7. Pickup
   - Goal: direct attention to the pickup bay.
   - Content: confirmation message, cup bay cue, check mark.
   - Action: Done / automatic reset after timeout.
   - Timeout: return to idle after 8-12 seconds.

## Screen Inventory

| Screen | Primary Component | Secondary Components | Notes |
| --- | --- | --- | --- |
| Idle | Large touch target | Logo, benefit line | Must work as attract screen. |
| Goal | 2x2 goal cards | Back button | Icons should be high contrast. |
| Drink | Flavor card carousel | Price, nutrition cue | Image area should not crop cup labels. |
| Customize | Option groups | Skip action | Default path should be fastest. |
| Payment | Payment method list | Total price | Keep total near Pay button. |
| Making | Countdown ring | Current process label | Prevent uncertainty during wait. |
| Pickup | Ready confirmation | Pickup instruction | Final message should be glanceable. |
| Error | Recovery instruction | Staff callout if needed | Avoid technical machine codes for members. |

## Component Requirements

### Goal Card

- Minimum touch target: 112 x 88 px.
- Selected state: lime border, subtle lime fill, check indicator.
- Unselected state: dark fill, 1 px neutral border.
- Disabled state: 40% opacity with unavailable label.

### Flavor Card

- Cup image with clear flavor color.
- Flavor name in uppercase.
- Short descriptor, max 2 lines.
- Price visible before payment.
- Selected state should persist into payment summary.

### Primary Button

- Height: 48-56 px.
- Radius: 6 px.
- Fill: ShakeUp lime.
- Text: dark, bold, uppercase.
- Disabled: muted fill, no shadow.

### Countdown Ring

- Center number: seconds remaining.
- Ring color: lime progress, gray remainder.
- Status label below ring.
- No user action required.

## Error And Recovery States

### Payment Failed

Message: `Payment did not complete. Try another method.`

Actions:
- Try again.
- Choose another payment method.
- Cancel order.

### Ingredient Unavailable

Message: `This flavor is temporarily unavailable.`

Actions:
- Choose another flavor.
- Return to goal selection.

### Cup Not Detected

Message: `Cup is not ready. Please wait a moment.`

Actions:
- Machine retries automatically.
- If unresolved, show staff assistance message.

### Dispense Interrupted

Message: `We could not finish this drink. Your payment will be handled automatically.`

Actions:
- Show support/staff instruction.
- Log issue for operator dashboard.

## Operator Dashboard Needs

- Sales by day, week, and month.
- Drink count by flavor.
- Low stock warnings by container.
- Unavailable menu item status.
- Payment failures.
- Machine status and last service check.
- Cleaning or maintenance reminders.

## Accessibility And Usability Notes

- Minimum body text: 18 px on kiosk screen.
- Minimum button text: 18-20 px.
- Avoid relying on color alone for selection.
- Keep Korean localization space in mind; labels may expand.
- Avoid long paragraphs on kiosk screens.
- Place Back consistently in the lower-left region.
- Place primary action consistently in the lower-right or full-width lower region.

## Kiosk Copy Draft

- Idle: `Touch to start`
- Goal: `Choose your goal`
- Drink: `Select your flavor`
- Customize: `Customize your drink`
- Payment: `Choose payment`
- Making: `Making your shake`
- Pickup: `Enjoy your shake`

## Open UX Questions

- Should customization be required, optional, or hidden behind an add-ons button?
- Should calories/macros appear on the drink-selection screen or a detail modal?
- Should the dashboard allow remote menu disabling by ingredient?
- Should pickup completion be sensor-based, timer-based, or both?
- What language priority is required for launch: Korean only, English only, or bilingual?
