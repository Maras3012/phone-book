import  React, { useState , useEffect } from 'react';
import './DateTime.css';

const DateTime = () => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return(
        <div className="Display">
            <b><p className="Display1">{date.toLocaleTimeString()}</p></b>
            <b><p className="Display2">{date.toLocaleDateString()}</p></b>
        </div>
    )
}

export default DateTime