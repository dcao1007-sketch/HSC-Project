# Engineering architecture

## Today

The prototype is a Vite-served single-page app. UI state is held in memory, profile preferences use local storage, and source papers are local PDFs. Flashcards store a paper ID, part ID, topic, exam page and solution page so the source formatting remains authoritative.

## Target boundaries

1. Web client: attempt, marking, bank and progress UI.
2. Content service: paper metadata, question hierarchy, page regions, mark allocations and syllabus tags.
3. Student service: profiles, attempts, marks and review history.
4. Tutor service: question-specific explanations grounded in an approved solution.
5. Analytics: privacy-conscious product events and aggregate learning measures.

Use stable IDs for papers, questions and attempts. Persist raw marks and elapsed seconds; calculate averages from attempts rather than storing only the latest result. Before accounts launch, add authentication, row-level access controls, migrations, backups and deletion/export flows.
