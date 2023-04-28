import { useState } from "react";
import EditTaskModalForm from "./components/edit-modal/EditTaskModalForm";
import Header from "./components/header/Header";
import Tasks from "./components/tasks/Tasks";

function App () {
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentUidTask, setCurrentUidTask] = useState('');

    return (
        <>
            <Header/>
            <Tasks 
                setShowEditForm={setShowEditForm} 
                showEditForm={showEditForm} 
                setCurrentUidTask={setCurrentUidTask}/>
            {
                showEditForm && 
                    <EditTaskModalForm 
                        setShowEditForm={setShowEditForm} 
                        uid={currentUidTask}
                    />
            }
        </>
    )
}

export default App;