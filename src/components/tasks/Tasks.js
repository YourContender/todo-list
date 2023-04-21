import { ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import EditTaskModalForm from "../edit-modal/EditTaskModalForm";
import { useDispatch, useSelector } from "react-redux";
import { getFullListTasksFromDatabase } from "../../redux/actions/actions";

const Tasks = () => {
    const [showEditForm, setShowEditForm] = useState(false); 
    const [currentUidTask, setCurrentUidTask] = useState('');

    const dispatch = useDispatch();
    const tasks = useSelector(elem => elem.tasks.data);

    // get tasks
    useEffect(() => {
        dispatch(getFullListTasksFromDatabase());
    }, [])

    // remove task
    const removeCurrentTask = (id) => {
        remove(ref(db, id));
    }

    // edit task
    const updateCurrentTask = (uid) => {
        setShowEditForm(!showEditForm);
        setCurrentUidTask(uid);
    }

    return (
        <div className="tasks">
            {
                Object.values(tasks).map(item => {
                    return (
                        <li key={item.id}>
                            <span>{item.titleTask}</span>
                            <span>{item.descrTask}</span>

                            <button onClick={() => updateCurrentTask(item.id)}>edit</button>
                            <button>done</button>
                            <button onClick={() => removeCurrentTask(item.id)}>remove</button>
                        </li>
                    )
                })
            }
            {showEditForm && <EditTaskModalForm uid={currentUidTask}/>}

        </div>
    )
}

export default Tasks;