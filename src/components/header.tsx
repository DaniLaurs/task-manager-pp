import { Plus } from 'lucide-react';
import logo from '../assets/tasks.png';
import { Button } from '../components/ui/button'
import { ModeToggle } from './mode-toggle';

export function Header() {
  return (
    <header className='w-full flex justify-center items-center h-16'>
           <div className="w-full h-full max-w-screen-lg flex items-center justify-between">
             <div className='flex items-center'>
              <img  className='w-16 h-16' src={logo}  alt="Logotipo Task Manager"/>
              <h1 className='font-semibold text-2xl'>Task Manager</h1>
             </div>

            <Button size="icon" className='rounded-full'>
              <Plus className=' text-white'/>
            </Button>
            <ModeToggle />
             </div>
      </header>
  )
}
