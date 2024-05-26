import { FaTimes } from "react-icons/fa";

function GoalItem({ goal }) {
  return (
    <div className="flex justify-between align-middle items-center bg-gray-400 p-2 px-5 mb-5 hover:shadow-md hover:cursor-pointer duration-200">
      <div className="">
        <h1 className="text-xl font-bold">{goal.text}</h1>
        <span className="text-gray-100">{new Date(goal.createdAt).toLocaleString('en-US')}</span>
      </div>
      <div>
        <FaTimes />
      </div>
    </div>
  )
}

export default GoalItem