import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentTaskFromDatabase } from "../../redux/actions/actions";

const EditTaskModalForm = (uid) => {
    const [editTitle, setEditTitle] = useState('');
    const [editDescr, setEditDescr] = useState('');

    const tasks = useSelector(elem => elem.tasks.data);
    const dispatch = useDispatch();

    const enterUpdateTitle = (e) => {
        setEditTitle(e.target.value);
    }

    const enterUpdateDescr = (e) => {
        setEditDescr(e.target.value);
    }

    const editCurrentTask = () => {
        const updateListTask = Object.values(tasks).map(item => {
            if (item.id === uid.uid) {
                return {
                    titleTask: editTitle,
                    descrTask: editDescr,
                    id: uid.uid,
                    stateTask: false
                }
            } else {
                return item
            }
        })
        
        dispatch(updateCurrentTaskFromDatabase(updateListTask, uid, editTitle, editDescr));
    }

    return (   
        <div>
            <input 
                type="text" 
                placeholder="edit title"
                value={editTitle}
                onChange={enterUpdateTitle}
            />

            <input 
                type="text" 
                placeholder="edit descr"
                value={editDescr}
                onChange={enterUpdateDescr}
            />

            <button onClick={editCurrentTask}>Submit</button>
        </div>
    )
}

export default EditTaskModalForm;