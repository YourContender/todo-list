import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTaskToDatabase } from '../../redux/actions/actions';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import './Forms.scss';

const Forms = ({ setShowForms }) => {
    const [titleTask, setTitleTask] = useState('');
    const [descrTask, setDescrTask] = useState('');
    
    const dispatch = useDispatch();
    const tasks = useSelector(elem => elem.tasks.data); 
    
    const {
        register,
        formState: {
            errors, isValid
        }, 
        handleSubmit
    } = useForm({ mode: 'onBlur' });

    // add task
    const createTaskToDatabase = () => {
        const uid = uuidv4();

        let task = {
            titleTask,
            descrTask,
            id: uid,
            stateTask: false
        }

        const added = [task, ...Object.values(tasks)];

        dispatch(addNewTaskToDatabase(task, added, uid))

        setTitleTask('');
        setDescrTask('');
        setShowForms(false);
    }

    const enterTextInTitle = (e) => {
        setTitleTask(e.target.value);
    }

    const enterTextInDescr = (e) => {
        setDescrTask(e.target.value);
    }

    return (
        <form className="forms" onSubmit={handleSubmit(createTaskToDatabase)}>
            <button 
                className="forms_close"
                onClick={() => setShowForms(false)}    
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="forms_input_box">
                <input 
                    {...register('titleTask', {
                        minLength: 2,
                        maxLength: 45
                    })}
                    type="text" 
                    required='required' 
                    value={titleTask}
                    onChange={enterTextInTitle}
                    autoComplete="off"
                />
                <span>Enter title task</span>

                <div className="errors" >
                    {errors ?. titleTask && <p>min length 2 chars</p>}
                </div>
            </div>

            <div className="forms_input_box">
                <input 
                    {...register('descrTask', {
                        minLength: 2
                    })}
                    type="text" 
                    required='required' 
                    value={descrTask}
                    onChange={enterTextInDescr}
                    autoComplete="off"
                />
                <span>Enter description task</span>

                <div className="errors" style={{color: 'red'}}>
                    {errors ?. descrTask && <p>min length 2 chars</p>}
                </div>
            </div>

            <input 
                className='forms_btn'
                type='submit'
                disabled={!isValid}
                value='Submit'
            />
        </form>
    )
}

export default Forms;