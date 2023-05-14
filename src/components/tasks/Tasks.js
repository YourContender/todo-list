import { 
    getFullListTasksFromDatabase, 
    removeCurrentTaskFromDatabase, 
    updateCurrentTaskFromDatabase 
} from "../../redux/actions/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyListTasks from "./empty-list-tasks/EmptyListTaks";
import StartWork from "../start-work/StartWork";
import TaskItem from "./task-item/TaskItem";
import Forms from "../forms/Forms";
import './Tasks.scss';

const Tasks = ({ setShowEditForm, setCurrentUidTask, changeTheme }) => { 
    const [showForms, setShowForms] = useState(false);
    const [filteredTasksList, setFilteredTasksList] = useState([]);

    const dayOrNightClass = changeTheme ? 'tasks_day' : 'tasks';
    const themeTaskContent = changeTheme ? 'tasks_content_light' : 'tasks_content';

    const dispatch = useDispatch();
    const tasks = useSelector(elem => elem.tasks.data);

    // get tasks
    useEffect(() => {
        dispatch(getFullListTasksFromDatabase());
    }, [])

    // remove task
    const removeCurrentTask = (id) => {
        const newListTask = Object.values(tasks).filter(item => item.id !== id);
        setFilteredTasksList(newListTask);

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
        setFilteredTasksList(updateListTask);

        dispatch(
            updateCurrentTaskFromDatabase(
                updateListTask, 
                currentTask,
                uid
            )
        );
    }

    const changeFIlterTasks = (activeFilter) => {
        if (activeFilter === 'done') {
            return setFilteredTasksList(
                [...Object.values(tasks)].filter(elem => {
                    return elem.stateTask === true 
                })
            )
        } else if (activeFilter === 'proc') {
            return setFilteredTasksList(
                [...Object.values(tasks)].filter(elem => {
                    return elem.stateTask === false
                })
            )
        } else {
            setFilteredTasksList([...Object.values(tasks)])
        }
    }

    const testFunc = () => {
        if (filteredTasksList.length === 0) {
            return Object.values(tasks);
        } else {
            return filteredTasksList;
        }
    }

    return (
        <div className={dayOrNightClass}>
            <div className='tasks_content'>
                {
                    showForms ? 
                        <Forms setShowForms={setShowForms}/> 
                        : 
                        <StartWork setShowForms={setShowForms} changeFIlterTasks={changeFIlterTasks}/>
                }

                <div className="tasks_container">
                    {
                        testFunc().map(item => {
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