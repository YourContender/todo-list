import { useState } from "react";
import EditTaskModalForm from "./components/edit-modal/EditTaskModalForm";
import Header from "./components/header/Header";
import Tasks from "./components/tasks/Tasks";

function App () {
    const [showEditForm, setShowEditForm] = useState(false);
    const [changeTheme, setChangeTheme] = useState(false);
    const [currentUidTask, setCurrentUidTask] = useState('');

    return (
        <>
            <Header 
                changeTheme={changeTheme} 
                setChangeTheme={setChangeTheme}/>
            <Tasks 
                setShowEditForm={setShowEditForm} 
                showEditForm={showEditForm} 
                setCurrentUidTask={setCurrentUidTask}
                changeTheme={changeTheme}/>
            {
                showEditForm && 
                    <EditTaskModalForm 
                        setShowEditForm={setShowEditForm} 
                        uid={currentUidTask}/>
            }
        </>
    )
}

export default App;