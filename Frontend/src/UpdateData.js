import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import socketClient from 'socket.io-client';
const socketURL = 'http://localhost:7001';

const socket = socketClient(socketURL);

const baseUrl = "http://localhost:7000/data";

function UpdateData() {

    const [data, setData] = useState({temperature:0,batteryLevel:0,timeStamp:''});
    const [sTag, setSTag] = useState('false');

    useEffect(()=>{
        axios.get(`${baseUrl}?updateId=${window.location.search.split('?')[1]}`).then(res => {
            setData(res.data[0])
        })
    }, []);

    const sendData = () => {
        socket.emit('updateRealtime',  {
            _id: window.location.search.split('?')[1],
            temperature: parseInt(data.temperature),
            batteryLevel: parseInt(data.batteryLevel),
            timeStamp: data.timeStamp
        })
        axios.put(`${baseUrl}?updateId=${window.location.search.split('?')[1]}`, {
            temperature: parseInt(data.temperature),
            batteryLevel: parseInt(data.batteryLevel),
            timeStamp: data.timeStamp
        }).then(res => {
            console.log(res.data);
            setSTag('true');
        });
    }

    // console.log(data.timeStamp);
    return (
        
        <div className="UpdateDate AddData">
            {sTag == 'true' && <p className="btn btn-outline-success">Data Updated Successfully</p>}
            <h1>Update Data</h1>
            <form
            className="form-group"
            onSubmit={e => e.preventDefault()}
            onChange={e => setData( {...data, [e.target.id] : e.target.value})}
            >
                <input value={data.temperature} className="form-control" id="temperature" type="number" placeholder="Enter Temperature" />
                <input value={data.batteryLevel} className="form-control" id="batteryLevel" type={"number"} placeholder="Enter Battery Level" />
                <p>Enter Record Date</p>
                <input 
                value={data.timeStamp}
                className="form-control" 
                id="timeStamp" 
                type="date" 
                placeholder="Enter Record Date"                
                min="01-01-2014" 
                max="31-12-2023"
                // data-date-format="DD MMMM YYYY"
                />
                <button
                className="btn btn-outline-success"
                onClick={sendData}
                disabled={data && data.temperature == 0 || data.batteryLevel == 0 || data.timeStamp == '' ? true : false}
                >Save</button>
                <button
                className="btn btn-outline-dark"                
                ><Link to={"/"}>Back</Link></button>
            </form>            
        </div>
    )
}

export default UpdateData;