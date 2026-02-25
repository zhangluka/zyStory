## ADDED Requirements

### Requirement: Single-page layout with all sections
The application SHALL render a single page that includes, in order: a Hero section, a Statistics section, a Timeline section, and a Gallery section. The application SHALL use Next.js App Router with one route for this page.

#### Scenario: Page loads
- **WHEN** the user opens the application root URL
- **THEN** the page SHALL display the Hero section at the top, followed by Statistics, Timeline, and Gallery sections

#### Scenario: No multi-route navigation in scope
- **WHEN** the application is in its initial release scope
- **THEN** the application SHALL NOT require multiple routes for the core Love Diary experience

---

### Requirement: Hero section
The application SHALL display a Hero section with the title "Love Diary" and the subtitle "记录我们的美好瞬间", using the designated fonts (Archivo, Space Grotesk) and theme colors (cyan/teal).

#### Scenario: Hero visible on load
- **WHEN** the page loads
- **THEN** the Hero section SHALL show the main title and subtitle with the correct typography and theme

---

### Requirement: Statistics section
The application SHALL display a Statistics section showing: days together (computed from a fixed start date to current date), count of memories, count of photos, and a fixed "∞" for "未来可期". Counts SHALL be derived from in-memory state (e.g. memories list and gallery items).

#### Scenario: Days together is computed
- **WHEN** the page loads or the date changes
- **THEN** the "天在一起" stat SHALL show the number of days from the configured start date to the current date

#### Scenario: Memories count reflects list length
- **WHEN** the user adds a new memory via the add-memory flow
- **THEN** the "珍贵回忆" stat SHALL increase by one to reflect the new list length

#### Scenario: Photos count is displayed
- **WHEN** the page loads
- **THEN** the "美好照片" stat SHALL display the number of gallery items (e.g. initial placeholder count or from state)

---

### Requirement: Timeline section
The application SHALL display a Timeline section ("我们的时光") that lists memories. Each memory SHALL show date, title, content text, and optional location and tag. The timeline SHALL support an initial set of memories and SHALL accept new memories added via the add-memory flow.

#### Scenario: Initial memories are shown
- **WHEN** the page loads with initial or seed memories
- **THEN** each memory SHALL be rendered with its date, title, content, and meta (location, tag) where present

#### Scenario: New memory appears in timeline after add
- **WHEN** the user successfully submits the add-memory form
- **THEN** the new memory SHALL appear in the Timeline section with the submitted date, title, content, location, and tag

---

### Requirement: Add memory flow (FAB, Dialog, form, Toast)
The application SHALL provide a floating action button (FAB) that opens a modal dialog for adding a memory. The dialog SHALL contain a form with fields: title (required), date (required), content/回忆 (required), location (optional), and tag (select). On valid submit, the application SHALL add the memory to in-memory state, close the dialog, show a success Toast, and update the timeline and memories count.

#### Scenario: FAB opens dialog
- **WHEN** the user clicks the FAB
- **THEN** the add-memory dialog SHALL open with the form visible

#### Scenario: Form validation
- **WHEN** the user submits the form with missing required fields (title, date, or content)
- **THEN** the system SHALL prevent submit and SHALL indicate validation errors as defined by the form library

#### Scenario: Successful add and feedback
- **WHEN** the user submits the form with all required fields filled
- **THEN** the system SHALL add the memory to state, close the dialog, SHALL show a success Toast (e.g. "回忆添加成功！"), and SHALL update the Timeline and the "珍贵回忆" count

#### Scenario: Dialog can be closed without saving
- **WHEN** the user closes the dialog (e.g. cancel button or overlay) without submitting
- **THEN** the dialog SHALL close and no new memory SHALL be added

---

### Requirement: Gallery section
The application SHALL display a Gallery section ("照片墙") as a grid of photo items. Each item SHALL show an image and an optional caption (e.g. on hover or overlay). Image sources MAY be placeholders or static assets; the application SHALL NOT require backend upload in this capability.

#### Scenario: Gallery displays on load
- **WHEN** the page loads
- **THEN** the Gallery section SHALL display a grid of photo items with images and captions as configured or from state

---

### Requirement: Theming and fonts
The application SHALL use the designated theme colors (primary, secondary, cta, background, etc.) consistent with the original cyan/teal Love Diary style, and SHALL load the Archivo and Space Grotesk fonts (e.g. via next/font).

#### Scenario: Theme and fonts applied
- **WHEN** the application is rendered
- **THEN** the UI SHALL use the configured theme colors and the specified fonts for headings and body as per design

---

### Requirement: No backend or authentication
The love-diary-app capability SHALL operate entirely on the client with in-memory state. It SHALL NOT require a backend API, database, or user authentication for its core behavior.

#### Scenario: App runs without server data
- **WHEN** the application is built and run (e.g. static export or dev server)
- **THEN** all described features (Hero, Stats, Timeline, add memory, Gallery) SHALL work without any backend or auth dependency
