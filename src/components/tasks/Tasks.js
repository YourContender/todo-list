import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFullListTasksFromDatabase, removeCurrentTaskFromDatabase, updateCurrentTaskFromDatabase } from "../../redux/actions/actions";
import Forms from "../forms/Forms";
import StartWork from "../start-work/StartWork";
import TaskItem from "./task-item/TaskItem";
import EmptyListTasks from "./empty-list-tasks/EmptyListTaks";
import './Tasks.scss';

const Tasks = ({ setShowEditForm, setCurrentUidTask }) => { 
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

    const editCurrentTask = (uid) => {
        const updateListTask = Object.values(tasks).map(item => {
            if (item.id === uid) {
                return {
                    titleTask: item.titleTask,
                    descrTask: item.descrTask,
                    id: uid,
                    stateTask: !item.stateTask
                }
            } else {
                return item
            }
        })

        const currentTask = updateListTask.filter(item => item.id === uid)

        dispatch(
            updateCurrentTaskFromDatabase(
                updateListTask, 
                currentTask,
                uid
            )
        );
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
                                    editCurrentTask={editCurrentTask}
                                />
                            )
                        })
                    }

                    {Object.values(tasks).length === 0 && <EmptyListTasks/>}
                </div>
            </div>
        </div>
    )
}

export default Tasks;