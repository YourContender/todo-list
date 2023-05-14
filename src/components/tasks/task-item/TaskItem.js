import { faEdit, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TaskItem = ({ 
    item, updateCurrentTask, removeCurrentTask, editCurrentTask
}) => {
    const { titleTask, descrTask, id, stateTask } = item;

    const classBgBtn = stateTask ? 'tasks_content-item-done' : 'tasks_content-item-process';
    const classStateTask = stateTask ? 'tasks_content-item success' : 'tasks_content-item';
    const textDecoration = stateTask ? 'tasks_content-item-text success-text' : "tasks_content-item-text";
    
    const changeStateTask = (uid) => {
        editCurrentTask(uid);
    }

    return (
        <div className={classStateTask} key={id}>
            <button 
                className={classBgBtn}
                onClick={() => changeStateTask(id)}
            >
            </button>
            <div className={textDecoration}>
                <h4>{titleTask}</h4>
                <span>{descrTask}</span>
            </div>

            <div className="tasks_content-item-btns">
                <button onClick={() => updateCurrentTask(id)}>
                    <FontAwesomeIcon icon={faEdit}/>
                </button>
                <button onClick={() => removeCurrentTask(id)}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
        </div>
    )
}

export default TaskItem;