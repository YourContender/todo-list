import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentTaskFromDatabase } from "../../redux/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import './EditTaskModalForm.scss';

const EditTaskModalForm = ({ uid, setShowEditForm }) => {
    const [editTitle, setEditTitle] = useState('');
    const [editDescr, setEditDescr] = useState('');
    const [prevTitle, setPrevTitle] = useState([]);
    const [prevDescr, setPrevDescr] = useState([]);

    const tasks = useSelector(elem => elem.tasks.data);
    const dispatch = useDispatch();

    const {
        register,
        formState: {
            errors, isValid
        }, 
        handleSubmit
    } = useForm({ mode: 'onBlur' });

    const enterUpdateTitle = (e) => {
        setEditTitle(e.target.value);
    }

    const enterUpdateDescr = (e) => {
        setEditDescr(e.target.value);
    }           

    useEffect(() => {
        Object.values(tasks).filter(item => {
            if (item.id === uid) {
                setPrevTitle(item.titleTask);
                setPrevDescr(item.descrTask);
            }
        })

    }, [])

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

        const currentTask = updateListTask.filter(item => item.id === uid);

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
            <form className="edit_container" onSubmit={handleSubmit(editCurrentTask)}>
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
                            {...register('editTitle', {
                                minLength: 2
                            })}
                            type="text" 
                            required
                            value={editTitle}
                            onChange={enterUpdateTitle}
                            autoComplete="off"
                        />
                        <span>{prevTitle}</span>

                        <div className="errors" >
                            {errors ?. editTitle && <p>min length 2 chars</p>}
                        </div>
                    </div>

                    <div className="edit_input-box">
                        <input 
                            {...register('editDescr', {
                                minLength: 2
                            })}
                            type="text" 
                            required
                            value={editDescr}
                            onChange={enterUpdateDescr}
                            autoComplete="off"
                        />
                        <span>{prevDescr}</span>

                        <div className="errors" style={{color: 'red'}}>
                            {errors ?. editDescr && <p>min length 2 chars</p>}
                        </div>
                    </div>
                </div>

                
                <input 
                    className="edit_container-btn" 
                    // onClick={editCurrentTask}
                    type="submit"
                    value='Submit'
                    disabled={!isValid}
                />
            </form>
        </div>
    )
}

export default EditTaskModalForm;