import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFullListTasksFromDatabase, removeCurrentTaskFromDatabase } from "../../redux/actions/actions";
import { faEdit, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditTaskModalForm from "../edit-modal/EditTaskModalForm";
import Forms from "../forms/Forms";
import './Tasks.scss';
import StartWork from "../start-work/StartWork";

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
        setShowEditForm(!showEditForm);
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
                            <div className="tasks_content-item" key={item.id}>
                                <button className="tasks_content-item-done"></button>
                                <div className="tasks_content-item-text">
                                    <h4>{item.titleTask}</h4>
                                    <span>{item.descrTask}</span>
                                </div>

                                <div className="tasks_content-item-btns">
                                    <button onClick={() => updateCurrentTask(item.id)}>
                                        <FontAwesomeIcon icon={faEdit}/>
                                    </button>
                                    <button onClick={() => removeCurrentTask(item.id)}>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
                {showEditForm && <EditTaskModalForm uid={currentUidTask}/>}
            </div>
        </div>
    )
}

export default Tasks;