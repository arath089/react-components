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
