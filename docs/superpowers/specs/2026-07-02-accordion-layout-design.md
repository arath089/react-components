# Accordion Layout for Component Showcase

## Problem

The app (`src/App.jsx`) renders all components (`TodoList`, `UserSearchFilter`, `BMICalculator`) stacked vertically and fully expanded at all times. As more components are added, the page requires increasing amounts of scrolling. The user wants each component collapsed into a clickable FAQ-style dropdown, with only one open at a time, plus a large stylized page heading.

## Goals

- Each component is hidden behind a clickable heading; clicking reveals it.
- Only one component's content can be open at a time — opening one closes any other that was open.
- Clicking an already-open heading closes it (no component ends up permanently expanded).
- The first section (To Do List) is open by default on initial page load.
- A large "My React Components" heading appears above the accordion, styled as bold, letter-spaced, monospace text (retro typewriter look, no animation) in white.

## Non-goals

- No automated tests (project has no test framework configured — verification is manual via dev server).
- No changes to the internal logic/state of `TodoList`, `UserSearchFilter`, or `BMICalculator` beyond removing their internal `<h3>` title elements.
- No new dependencies (no icon library, no animation library) — implemented with plain CSS/Tailwind.

## Architecture

New `Accordion` component pair in `src/Accordion/`:

- **`Accordion.jsx`** — container component. Owns `openIndex` state (number index of the currently open item, or `null` if none). Accepts a `defaultOpenIndex` prop (used to open the first section by default) and `children` (a list of `AccordionItem` elements). Iterates children with `React.Children.map`, cloning each to inject `isOpen` (`openIndex === index`) and `onToggle` (sets `openIndex` to `index`, or `null` if it's already open) props.
- **`AccordionItem.jsx`** — presentational component. Props: `title` (string), `isOpen` (bool), `onToggle` (function), `children` (the wrapped component, e.g. `<TodoList />`). Renders:
  - A clickable header row (card-styled) showing `title` and a chevron (▾) that rotates 180° when `isOpen`.
  - A content wrapper that expands/collapses via a CSS grid-rows transition (`grid-template-rows: 0fr` → `1fr`), which animates smoothly regardless of the wrapped component's rendered height (avoids hardcoding `max-height`).

### Data flow

`Accordion` is the single source of truth for which section is open. Since `openIndex` is one piece of state (not per-item state), only one `AccordionItem` can report `isOpen === true` at any time — this is what enforces "only one open at a time," not a convention each item has to honor.

## Component changes

- `TodoList` (`src/TodoList/ToDoList.jsx`), `UserSearchFilter` (`src/UserSearch/UserSearchFilter.jsx`), `BMICalculator` (`src/BMI Calculator/BMICalculator.jsx`): remove their internal `<h3>` title element (e.g. "React To Do List", "User Search Filter", "BMI Calculator"). The outer card wrapper (`rounded-lg bg-white p-6 shadow-md`) stays, since it's still the expanded content's container. Titles move to `AccordionItem`'s `title` prop instead, avoiding duplicate headings.
- `App.jsx`: renders the new `"My React Components"` heading, then wraps the three components in `Accordion`/`AccordionItem`:

```jsx
import Accordion from "./Accordion/Accordion";
import AccordionItem from "./Accordion/AccordionItem";
import TodoList from "./TodoList/ToDoList";
import UserSearchFilter from "./UserSearch/UserSearchFilter";
import BMICalculator from "./BMI Calculator/BMICalculator";

export default function App() {
  return (
    <div className="app">
      <h1 className="typewriter-heading">My React Components</h1>
      <Accordion defaultOpenIndex={0}>
        <AccordionItem title="React To Do List">
          <TodoList />
        </AccordionItem>
        <AccordionItem title="User Search Filter">
          <UserSearchFilter />
        </AccordionItem>
        <AccordionItem title="BMI Calculator">
          <BMICalculator />
        </AccordionItem>
      </Accordion>
    </div>
  );
}
```

## Visual style

- **Accordion header row**: white rounded card matching the existing card look (`rounded-lg bg-white shadow-md`), title in `font-semibold text-gray-800` on the left, chevron on the right, subtle hover background (`hover:bg-gray-50`), full-width clickable `<button>`.
- **Chevron**: a `▾` character rotated via `transform: rotate(180deg)` with a CSS transition when open.
- **Expand/collapse animation**: content wrapper uses a CSS grid-rows trick — `grid-template-rows: 0fr` collapsed, `1fr` expanded, `transition: grid-template-rows 200ms ease`, with an inner `overflow: hidden` div. This animates open/closed smoothly without JS height measurement.
- **"My React Components" heading**: `h1`, bold, monospace font stack (`ui-monospace, "Courier New", monospace`), wide letter-spacing (`tracking-widest` or equivalent), large size (`text-4xl` or similar), white text color so it stands out against the `steelblue` page background, centered above the accordion.

## Error handling / edge cases

None — this is pure client-side UI state (an index toggle), no async operations, no external data. No error handling beyond what the wrapped components already have.

## Testing / verification plan

No test framework is configured in this project (`package.json` only has `oxlint` for linting, no Jest/Vitest). Verification will be manual:

1. Run `npm run dev` and open in browser.
2. Confirm To Do List is open by default; User Search Filter and BMI Calculator are collapsed.
3. Click each collapsed heading — confirm it opens and any previously open section closes.
4. Click an already-open heading — confirm it closes and none remain open.
5. Confirm the wrapped components (add/toggle/delete todo, search filter, BMI calculate) still work correctly inside the accordion with no regressions.
6. Confirm the "My React Components" heading renders in the intended monospace/letter-spaced style.
