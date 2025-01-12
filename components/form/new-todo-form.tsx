import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function NewTodoForm(){
    return (
        <form action="">
            <div className="flex mt-12 gap-3">
                <Input type='text' name='title' placeholder='Enter a task'/>
                <Button type='submit'>Add Todo</Button>
            </div>
        </form>

    )
}