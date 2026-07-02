import TodoList from "./TodoList/ToDoList";
import UserSearchFilter from "./UserSearch/UserSearchFilter";
import BMICalculator from "./BMI Calculator/BMICalculator";

export default function App() {
  return (
    <div className="app">
      <TodoList />
      <UserSearchFilter />
      <BMICalculator />
    </div>
  );
}
