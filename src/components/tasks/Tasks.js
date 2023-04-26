import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFullListTasksFromDatabase, removeCurrentTaskFromDatabase } from "../../redux/actions/actions";
import EditTaskModalForm from "../edit-modal/EditTaskModalForm";
import Forms from "../forms/Forms";
import StartWork from "../start-work/StartWork";
import TaskItem from "./task-item/TaskItem";
import './Tasks.scss';
import EmptyListTasks from "./empty-list-tasks/EmptyListTaks";

const Tasks = () => {
    const [showEditForm, setShowEditForm] = useState(false); 
    const [currentUidTask, setCurrentUidTask] = useState('');
    const [showForms, setShowForms] = useState(false);

    const dispatch = useDispatch();
    const tasks = useSelector(elem => elem.tasks.data);

    // get tasks
    useEffect(() => {
        dispatch(getFullListTasksFromDatabase());
    }, [])

    // remove task
    const removeCurrentTask = (id) => {
        const newListTask = Object.values(tasks).filter(item => item.id !== id);

        dispatch(removeCurrentTaskFromDatabase(id, newListTask))
    }

    // edit task
    const updateCurrentTask = (uid) => {
        setShowEditForm(true);
        setCurrentUidTask(uid);
    }

    return (
        <div className="tasks">
            <div className="tasks_content">
                {
                    showForms ? 
                        <Forms setShowForms={setShowForms}/> 
                        : 
                        <StartWork setShowForms={setShowForms}/>
                }

                <div className="tasks_container">
                    {
                        Object.values(tasks).map(item => {
                            return (
                                <TaskItem 
                                    key={item.id} 
                                    item={item} 
                                    removeCurrentTask={removeCurrentTask} 
                                    updateCurrentTask={updateCurrentTask}
                                />
                            )
                        })
                    }

                    {Object.values(tasks).length === 0 && <EmptyListTasks/>}
                </div>
                {
                    showEditForm && 
                        <EditTaskModalForm 
                            setShowEditForm={setShowEditForm} 
                            uid={currentUidTask}
                        />
                }
            </div>
        </div>
    )
}

export default Tasks;