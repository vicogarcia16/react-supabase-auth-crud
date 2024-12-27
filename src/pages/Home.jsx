import React, { useEffect, useState} from 'react'
import { supabase } from '../supabase/client.jsx'
import { useNavigate } from 'react-router-dom'
import { TaskForm } from '../components/TaskForm.jsx'
import { TaskList } from '../components/TaskList.jsx'


export const Home = () => {
  const [showTaskDone, setShowTaskDone] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/login')
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((e) => {
      if (e === 'SIGNED_OUT') {
        navigate('/login')
      }
    });

    return () => {
      subscription.unsubscribe();
    };
    
  }, [navigate]);
  return (
    <div className='row pt-4'>
      <div className="col-md-4 offset-md-4">
        <TaskForm />
        <header className='d-flex justify-content-between my-3'>
          <span className='h5'> {showTaskDone ? 'Tasks Done' : 'Tasks To Do'} </span>
          <button className='btn btn-dark btn-sm' onClick={() => setShowTaskDone(!showTaskDone)}>
            {showTaskDone ? 'Show Tasks To Do' : 'Show Tasks Done' }</button>
        </header>
        <TaskList done={showTaskDone} />
      </div>
    </div>
  );
}
