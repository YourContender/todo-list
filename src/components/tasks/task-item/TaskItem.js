import { faEdit, faXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TaskItem = ({ item, updateCurrentTask, removeCurrentTask}) => {
    const { titleTask, descrTask, id } = item;
    
    return (
        <div className="tasks_content-item" key={id}>
            <button className="tasks_content-item-done"></button>
            <div className="tasks_content-item-text">
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