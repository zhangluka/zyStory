## ADDED Requirements

### Requirement: Single-page poster delivery

The system SHALL deliver the invitation as one self-contained HTML document that displays the full poster without requiring a backend, build step, or external data.

#### Scenario: Open poster in browser

- **WHEN** the user opens the HTML file in a browser or loads it via URL
- **THEN** the complete poster is visible in one page with no blank or missing sections

---

### Requirement: Protagonist and invitation copy in Chinese

The poster SHALL display the protagonists as "Bobby & Yang" and SHALL include an invitation sentence in Chinese stating that they sincerely invite the guest to the pre-wedding bachelor/bachelorette party.

#### Scenario: Protagonist and invite copy visible

- **WHEN** the user views the poster
- **THEN** the names "Bobby" and "Yang" (or "Bobby & Yang") are shown and a Chinese invitation phrase (e.g. 诚挚邀请你参加我们的婚前单身夜派对) is present

---

### Requirement: Placeholder for time, location, and villa name

The poster SHALL display time, location, and villa name using placeholder template text so that the content can be replaced later without changing structure (e.g. "2025年X月X日", "XX市XX区", "XX别墅").

#### Scenario: Placeholder text present and replaceable

- **WHEN** the user views the poster
- **THEN** time, location, and villa name appear as readable placeholder text (e.g. 2025年X月X日 周X XX:00 起, XX市XX区 XX路, XX别墅) that can be found and replaced in the source

---

### Requirement: Activity summary in Chinese

The poster SHALL display a short activity summary in Chinese that describes the party (e.g. 别墅派对 · 唱K · 桌游 · 泳池 · 才艺小舞台 · 畅饮).

#### Scenario: Activity summary visible

- **WHEN** the user views the poster
- **THEN** at least one line of Chinese text describes the party activities (such as karaoke, board games, pool, talent show, drinks)

---

### Requirement: Theme sentence (blessing) in Chinese and English

The poster SHALL display the theme sentence in both Chinese and English: "祝 有爱者更爱 独立者更自由" and "May the loved love more, and the independent become free."

#### Scenario: Theme sentence visible in both languages

- **WHEN** the user views the poster
- **THEN** the Chinese line "祝 有爱者更爱 独立者更自由" and the English line "May the loved love more, and the independent become free." are both present

---

### Requirement: Hand-drawn minimal visual style

The poster SHALL use a hand-drawn minimal style with cream/beige background (#F5F0E8 or equivalent), black or dark lines/text (#1a1a1a or equivalent), and limited pink/red accent (#c45c5c / #e8a0a0 or equivalent). Optional decorative elements (e.g. disco ball, wavy border) MAY be present.

#### Scenario: Style tokens applied

- **WHEN** the user views the poster
- **THEN** the main background is cream/beige, primary text and lines are dark, and at least one accent uses pink or red; the overall impression is minimal and hand-drawn rather than corporate or neon

---

### Requirement: Mobile portrait and print friendly

The poster SHALL be readable on mobile portrait view and SHALL be suitable for printing (e.g. viewport meta, max-width, print media rules so content fits and is legible).

#### Scenario: Readable on narrow viewport

- **WHEN** the user opens the poster on a narrow viewport (e.g. 375px width) in portrait
- **THEN** all text and key elements are visible and readable without horizontal overflow

#### Scenario: Print does not truncate content

- **WHEN** the user prints the page (or uses print preview)
- **THEN** the poster content fits within the print area with appropriate margins and no critical content is cut off
