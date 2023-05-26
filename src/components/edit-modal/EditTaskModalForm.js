import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentTaskFromDatabase } from "../../redux/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './EditTaskModalForm.scss';

const EditTaskModalForm = ({ uid, setShowEditForm }) => {
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
            if (item.id === uid) {
                return {
                    titleTask: editTitle.length === 0 ? item.titleTask : editTitle,
                    descrTask: editDescr.length === 0 ? item.descrTask : editDescr,
                    id: uid,
                    stateTask: item.stateTask
                }
            } else {
                return item
            }
        })

        const currentTask = updateListTask.filter(item => item.id === uid)

        setShowEditForm(false);

        dispatch(
            updateCurrentTaskFromDatabase(
                updateListTask, 
                currentTask,
                uid, 
                editTitle, 
                editDescr
            )
        );

        setEditTitle('');
        setEditDescr('');
    }

    return (   
        <div className="edit">
            <div className="edit_container">
                <div className="edit_close">
                    <button 
                        className="edit_close-btn"
                        onClick={() => setShowEditForm(false)}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <div>
                    <div className="edit_input-box">
                        <input 
                            type="text" 
                            required='required' 
                            value={editTitle}
                            onChange={enterUpdateTitle}
                        />
                        <span>update title</span>
                    </div>

                    <div className="edit_input-box">
                        <input 
                            type="text" 
                            required='required' 
                            value={editDescr}
                            onChange={enterUpdateDescr}
                        />
                        <span>update description</span>
                    </div>
                </div>

                <button 
                    className="edit_container-btn" 
                    onClick={editCurrentTask
                }>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default EditTaskModalForm;