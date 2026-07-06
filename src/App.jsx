import Accordion from "./Accordion/Accordion";
import AccordionItem from "./Accordion/AccordionItem";
import TodoList from "./TodoList/ToDoList";
import UserSearchFilter from "./UserSearch/UserSearchFilter";
import BMICalculator from "./BMI Calculator/BMICalculator";
import ColorPicker from "./ColorPicker/ColorPicker";
import TabSwitcher from "./TabSwitcher/TabSwitcher";
import Stopwatch from "./Stopwatch/Stopwatch";
import StarRating from "./StarRating/StarRating";
import OrderList from "./OrderList/OrderList";
import DebouncedSearch from "./DebounceSearch/DebouncedSearch";
import ThrottledSearch from "./ThrottledSearch/ThrottledSearch";
import AsyncAwait from "./Async/AsyncAwait";

export default function App() {
  return (
    <div className="app">
      <div className="pb-10 sm:pb-20 flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl md:text-8xl font-bold text-white pb-4 sm:pb-6 rock-salt">
          My React Components
        </h1>
        <p className="font-bold text-white rock-salt text-xl sm:text-3xl md:text-4xl">
          - Archit Rathi
        </p>
      </div>
      <Accordion defaultOpenIndex={0}>
        <AccordionItem
          title="React To Do List"
          description="Add, complete, and remove tasks from a simple to-do list."
        >
          <TodoList />
        </AccordionItem>
        <AccordionItem
          title="Debounced Search"
          description="Search users with debounced input, delaying API calls until you stop typing to cut down on redundant requests. eg- 'Leanne', 'Ervin"
        >
          <DebouncedSearch />
        </AccordionItem>
        <AccordionItem
          title="Throttled Submission"
          description="Submit rapidly and watch throttling cap it to one API call per cooldown window, blocking the rest."
        >
          <ThrottledSearch />
        </AccordionItem>
        <AccordionItem
          title="User Search Filter"
          description="Filter a list of users by name in real time."
        >
          <UserSearchFilter />
        </AccordionItem>
        <AccordionItem
          title="BMI Calculator"
          description="Calculate your Body Mass Index from height and weight."
        >
          <BMICalculator />
        </AccordionItem>
        <AccordionItem
          title="Color Picker"
          description="Mix red, green, and blue to preview a color and its hex value."
        >
          <ColorPicker />
        </AccordionItem>
        <AccordionItem
          title="Tab Switcher"
          description="Switch between tabs to reveal different content."
        >
          <TabSwitcher />
        </AccordionItem>
        <AccordionItem
          title="Stopwatch"
          description="A React Stopwatch : Start | Stop | Reset"
        >
          <Stopwatch />
        </AccordionItem>
        <AccordionItem
          title="Star Rating"
          description="Set Star rating using React"
        >
          <StarRating />
        </AccordionItem>
        <AccordionItem
          title="Order List Filtering"
          description="Browse a list of orders and filter them by status — shipped, pending, delivered, or cancelled."
        >
          <OrderList />
        </AccordionItem>
        <AccordionItem
          title="Async/Await Fetch API results"
          description="Look up a user by ID with async/await, cancelling any in-flight request via AbortController when you submit again. eg- '1', '4'"
        >
          <AsyncAwait />
        </AccordionItem>
      </Accordion>
    </div>
  );
}
