---
description: Project rules – TDD, Ralph loop, README, wiki, push when done, no extra MD, multi-agent
alwaysApply: true
---

# Project Rules

## TDD for New Features

When adding **new features**:

1. **Write tests first** – Before implementation, add or update tests that define the expected behavior (unit, integration, or e2e as appropriate).
2. **Implement to pass** – Write the minimal code needed to make those tests pass.
3. **Run the tests** – Execute the test suite (e.g. `npm test`, `pytest`, `cargo test`) and confirm all new and existing tests pass before considering the feature done.
4. **Fix failures** – If any test fails, fix the code or the test until the suite is green; do not leave failing tests.

For small fixes or refactors, add or update tests when behavior changes, and always run the relevant tests before finishing.

---

## Ralph Loop – Tasks Until Done

When working on a task:

1. **Loop until done** – Keep iterating on the task until it is fully complete. Do not stop with partial implementations or "good enough" states.
2. **Verify before claiming completion** – Before saying the task is done:
   - Run the relevant verification (tests, build, lint).
   - Read the output and confirm it actually passed.
   - Only then treat the task as complete.
3. **No partial completion** – Deliver the full scope. If verification fails or something is missing, fix it and re-verify; do not leave failing tests or broken builds.
4. **Use a todo list** – For multi-step work, track items (e.g. with a todo list) and ensure every item is completed before finishing.

Do not claim completion without fresh verification evidence (e.g. test/build output showing success).

---

## README & Wiki Before Commit

Before committing changes:

1. **Look at the codebase** – Review what changed (new features, APIs, structure, scripts, or config) so docs stay in sync.
2. **Update README** – Add or edit README.md so it reflects current setup, usage, and behavior (e.g. new commands, env vars, or features). Keep it accurate and useful for someone cloning the repo.
3. **Update the GitHub Wiki** – Push corresponding updates to the repo's GitHub wiki (`https://github.com/davidagustin/coding-drills/wiki`). Use `gh api` or clone the wiki repo (`coding-drills.wiki.git`) to create/update pages. The wiki should mirror major README sections with additional detail (e.g. per-feature pages, architecture docs, how-to guides). At minimum, keep the wiki Home page in sync with the README overview.

Do this **before** staging and committing. If the change is trivial and doesn't affect setup or usage, a README/wiki update may be unnecessary.

---

## Push When Done

When you finish a task that changes files:

1. **Stage** the relevant files (`git add`).
2. **Commit** with a clear message describing the work.
3. **Push** to the remote (`git push`).

Do this as the final step before telling the user the task is complete. If the user says "don't push" or the repo has no remote, skip the push step.

---

## No Extra Markdown Files

- **Do not** create additional `.md` files (e.g. CONTRIBUTING.md, CHANGELOG.md, docs/*.md) unless they have **functional value** for the app.
- **Consolidate** all informational documentation into **README.md**.
- **Exception:** Create a separate markdown file only when the app or tooling **uses it at runtime** (e.g. a template, config schema doc consumed by code, or required by a tool). Purely informational content belongs in README.md.

---

## Multi-Agent Unique Tasks

When spawning or orchestrating multiple agents (e.g. parallel workers, swarm, autopilot, pipeline, or any multi-agent flow):

1. **Assign distinct work** – Each agent must have a clearly different responsibility. No two agents should be given the same task, file, or subtask.
2. **Partition by scope** – Split work by file, feature, layer, or step so there is no overlap (e.g. one agent on frontend, one on backend; or one per file/component).
3. **Avoid duplicate effort** – Before spawning, confirm the task list has no duplicate entries. If using a shared task list, use atomic claiming or similar so only one agent takes each item.
4. **Name or tag tasks** – When creating tasks for multiple agents, label them so it's obvious which agent does what (e.g. "Agent A: auth API", "Agent B: login UI").

If you are about to spawn N agents, ensure there are at least N unique tasks (or N non-overlapping scopes); never assign the same task to more than one agent.
