import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const baseUrl = "http://localhost:7000/data";

function AddData() {

    const [data, setData] = useState({ temperature: 0, batteryLevel: 0, timeStamp: '' });
    const [sTag, setSTag] = useState('false');

    const sendData = () => {
        axios.post(`${baseUrl}`, data).then(res => {
            console.log("data send");
            setSTag('true');
        });
    }

    console.log(data);
    return (
        <div className="AddData">
            {sTag == 'true' && <p className="btn btn-outline-success">Data Added Successfully</p>}
            <h1>Add Data</h1>
            <form
                className="form-group"
                onSubmit={e => e.preventDefault()}
                onChange={e => setData({ ...data, [e.target.id]: e.target.value })}
            >
                <input className="form-control" id="temperature" type="number" placeholder="Enter Temperature" />
                <input className="form-control" id="batteryLevel" type={"number"} placeholder="Enter Battery Level" />
                <p>Enter Record Date</p>
                <input
                    className="form-control"
                    id="timeStamp"
                    type="date"
                    placeholder="Enter Record Date"
                    min="2014-01-01"
                    max="2023-12-31"
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

export default AddData;