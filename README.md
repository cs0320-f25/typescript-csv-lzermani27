# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

- #### Step 2: Use an LLM to help expand your perspective.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    1. Custom separator and quote options — Functionality; Origin: Both 
    As a user, I can choose the column separator and the quote character so that files from different tools parse correctly without manual edits.

    2. Row-by-row reading for large files — Extensibility; Origin: Me
    As a user working with big CSVs, I can read rows one at a time so the program doesn’t load the whole file into memory and stays responsive on big inputs.

    3. Stop-or-continue error handling with clear messages — Functionality; Origin: Both 
    As a user, I can choose to either stop on the first bad row or keep going and collect errors, with error messages that show the row and column.

    4. Per-column checks and simple conversions — Extensibility; Origin: LLM
    As a user, I can set basic rules per column so the output is cleaner, problems are flagged early, and obvious types can be converted safely.

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    I supported different quotes and added row-by-row reading so big files don’t mess up memory. Prompting the LLM highlighted two things: clear strict error modes and simple per-column rules, which make the tool easier to plug into real workflows. I noticed that asking for edge cases resulted in lists about inputs, while asking for “next-sprint features” pushed toward user options and APIs. The strict/lenient switch and custom delimiter support resonated the most because they remove common blockers. Very niche tweaks didn’t feel worth it right now, so I left them out.

### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
#### Total estimated time it took to complete project:
#### Link to GitHub Repo:  