import './App.css'
import { useEffect, useState } from 'react'
import { Login } from './pages/Login.jsx'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { supabase } from './supabase/client.jsx'
import {TaskContextProvider} from './context/TaskContext.jsx'
import { NavBar } from './components/NavBar.jsx'

function App() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session) {
        navigate('/login');
      }
    });
  
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="App">
     <TaskContextProvider>
      <NavBar />
      <div className="container">
        <Routes>
            <Route path='/' element={session ? <Home /> : <Login />} />
            <Route path='/login' element={session ? <Home /> : <Login />}/>
            <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
     </TaskContextProvider>
    </div>
  )
}

export default App
