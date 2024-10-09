import { useState } from "react"

function useTodos<T>(): [T[], (value: T) => void]{
    const [todos, setTodos] = useState<T[]>([]);

    const addTodo = (value: T) => {
        setTodos(curr => [... curr, value]);
    }
    return [todos, addTodo];
}

export const Todos = () => {
    const [todos, addTodo] = useTodos<string>();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const elements = e.currentTarget.elements as typeof e.currentTarget.elements & {
            todo?: HTMLInputElement
        };
        const todoValue = elements.todo?.value;

        if(!todoValue){
            return;
        }

       addTodo(todoValue);

        console.log(elements);
    }
    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)}>
                <input name="todo"/>
                <button type="submit">submit</button>
            </form>
            <ul>
                {todos.map((todo,i) => (<li key={i}>{todo}</li>))}
            </ul>
             
        </div>
    )
}