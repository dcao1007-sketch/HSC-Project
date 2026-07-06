# Paper import architecture

## Student uploads

The browser accepts a PDF, validates its type and size, creates a private local preview, and submits the file plus course metadata to `POST /api/papers/import`. The static prototype intentionally leaves the paper in an `AI scan pending` state when that service is unavailable; it does not pretend that extraction succeeded.

The production importer should:

1. Virus-scan the upload and store it privately.
2. Split exam and solution sections where needed.
3. Extract question hierarchy, mark allocations, source pages and diagrams.
4. Map questions to NESA course and syllabus areas.
5. Validate unique IDs and total marks.
6. Require a student or moderator review before enabling marking and flashcards.
7. Persist the approved manifest and student-only access controls.

## THSC Online connector feasibility

THSC Online exposes stable course listing pages and JSON resource indexes. Listing links call a viewer function with an index number; that function requests `/s/index/{index}.json`, which resolves paper titles to one or more resources. The site also returns permissive cross-origin headers, so catalogue discovery is technically possible.

A production connector should run server-side rather than downloading the full catalogue in each browser. It should cache metadata, deduplicate by source URL and file hash, respect source terms and takedown requests, and send each selected paper through the same reviewed ingestion pipeline as a student upload. No THSC papers are imported automatically in this release.
