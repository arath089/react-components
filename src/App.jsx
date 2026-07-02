import Accordion from "./Accordion/Accordion";
import AccordionItem from "./Accordion/AccordionItem";
import TodoList from "./TodoList/ToDoList";
import UserSearchFilter from "./UserSearch/UserSearchFilter";
import BMICalculator from "./BMI Calculator/BMICalculator";

export default function App() {
  return (
    <div className="app">
      <div className="pb-20 flex flex-col justify-center items-center">
        <h1 className="text-8xl font-bold text-white pb-6 rock-salt">
          My React Components
        </h1>
        <p className="font-bold text-white rock-salt text-4xl">
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
      </Accordion>
    </div>
  );
}
