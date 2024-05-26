import {useState} from "react";
import {useDispatch} from "react-redux";
import {createGoal, reset} from "../features/goals/goalSlice";

function GoalForm() {
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const onSumbit = (e) => {
        e.preventDefault();

        dispatch(createGoal({text: text}));
        setText('');
    }
    return (
        <>
            <form onSubmit={onSumbit}>
                <div className="mb-5 w-full flex justify-start align-middle items-center">
                    <input type="text" className="w-full h-10 px-1 border border-gary-300" name="text" id="text" placeholder="Enter Your Goal" value={text} onChange={(e) => setText(e.target.value)} />
                    <button type="submit" className=" font-bold w-32 h-10 bg-black text-white text-center">Add Goal</button>
                </div>
            </form>
        </>
    )
}

export default GoalForm