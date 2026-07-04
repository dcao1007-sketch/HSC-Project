# Arc - HSC Mathematics Practice

Developers: Dan and Sean

Arc is a browser-based NSW HSC mathematics study app. The current prototype includes the Abbotsleigh 2025 Extension 1 and Ascham 2024 Advanced trial papers, timed attempts, self-marking, selective mistake-bank practice, persistent attempt history, and NESA-aligned progress mapping.

## Run locally

Install Node.js 18 or newer, then run `npm install` and `npm run dev`. Use `npm test` for the zero-dependency project checks and `npm run build` before a release.

## Project map

- `app.js`, `styles.css`, `index.html`: current web prototype
- `assets/papers`: licensed/source paper and solution files
- `tests`: automated content and regression checks
- `docs/product`: user problem, scope and success measures
- `docs/business`: customers, positioning and revenue assumptions
- `docs/engineering`: architecture and data model
- `docs/content`: paper ingestion and quality-control workflow
- `docs/testing`: release test strategy
- `docs/legal`: copyright, privacy and AI safeguards
- `docs/operations`: roadmap, ownership and release process

## Working together

1. Clone the repository.
2. Create a branch for each change: `git switch -c feature/short-description`.
3. Commit the change with a clear message.
4. Push the branch and open a pull request.
5. Ask a teammate to review before merging into `main`.

Avoid committing secrets or student information. The included past paper and worked solutions remain the property of their respective owner and are included for prototype development.
