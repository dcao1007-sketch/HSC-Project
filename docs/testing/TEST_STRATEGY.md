# Test strategy

## Automated gate

Run `npm test` and `npm run build` on every pull request. Checks cover the empty initial bank, history-based progress measures, PDF-backed cards, unique question IDs and a 70-mark schema total.

## Manual release checks

- Start a fresh attempt and confirm all questions are undone.
- Confirm the timer starts only after Start and solutions remain locked until Finish.
- Enter blank, zero, maximum and above-maximum marks for several parts.
- Select Redo and verify one card appears with the correct exam and solution page.
- Remove/re-add a Redo selection and ensure there are no duplicates.
- Save two attempts and verify average mark and time.
- Test current Chrome and Safari at desktop and mobile widths.
- Check keyboard navigation, visible focus, labels and readable contrast.

Record defects with browser, steps, expected result, actual result and severity.
