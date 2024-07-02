import './App.css'
import Calendar from './components/Calendar';
import { useEffect, useState } from 'react';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import useDevice from './hooks/hooks';
import { merge } from '../utils/tw-merge';
import Inputs from './components/Inputs';
import { useCalendarStore } from './store/CalendarStore';

function App() {
    const [open ,isOpen] = useState<boolean>(false)
    const device = useDevice();
    const eventsJson = useCalendarStore((state) => state.eventsJson)

    useEffect(() => {
      if (eventsJson.length != 0) {
        isOpen(true);
      }
    },[eventsJson])

    const toggle = () => {
        isOpen(prev => !prev)
    }

    function getDrawerDimensions() {
      return device.width < 768 ? { width:"100%", height:"75%"}: { width: "90%", height:"60%"}
    }


  return (
    <div className="w-full flex flex-row">
      <div className="w-full md:w-1/3 px-10 pt-10 md:pt-20 flex flex-col">
          <Inputs toggle={toggle}/>
      </div>

      <div className={merge("md:w-2/3", device.width > 768 ? "my-10 p-10 rounded-l-xl shadow-xl shadow-slate-400" : "")}>
        {device.width < 768 ?
          <Drawer
            open={open}
            onClose={toggle}
            direction={device.width < 768 ? "bottom" : "right"}
            style={{
              width: getDrawerDimensions().width,
              height: getDrawerDimensions().height
            }}
            className={merge("p-10 rounded-l-xl shadow-xl shadow-slate-400", device.width < 768 ? "" : "my-10")}>
              <Calendar />
          </Drawer>
         : <Calendar />}
      </div>
    </div>
  )
}

export default App
