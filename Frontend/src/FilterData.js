import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const baseUrl = "http://localhost:7000/data";

function FilterData() {

    const [filterDate, setFilterDate] = useState({ start: '', end: '' });
    const [display, setDisplay] = useState('false');
    const [data, setData] = useState(null);
    const [totalDocuments, setTotalDocuments] = useState(null);

    const filter = (f) => {
        setFilterDate({ ...filterDate, [f.id]: f.value })
    }

    const filterData = () => {
        setDisplay(true);
        axios.get(`${baseUrl}?start=${filterDate.start}&end=${filterDate.end}`).then(res => {
            setData(res.data);
        })
    }
    console.log(data);

    return (

        <div className="FilterData">
            <h1>Filter Data</h1>
            <form
                className="form-group"
                onChange={e => filter(e.target)}
            >
                Enter start Date : <input id="start" type="date" className="form-control" placeholder="Enter start Date"
                    min="01-01-2014"
                />
                Enter end Date : <input id="end" type="date" className="form-control" placeholder="Enter end Date"
                    max="31-01-2023" />
            </form>
            <button
                disabled={!filterDate.start || !filterDate.end}
                className="btn btn-outline-dark"
                onClick={filterData}
            >Show Data</button>
            <button
                    className="btn btn-outline-dark"
                ><Link to={"/"}>Back</Link></button>
            {display == true && data ? <div className="filterDisplay">
                <h2>Display Data</h2>
                <h4>From : {filterDate.start} | To : {filterDate.end}</h4>
                <p>Total Documents : {data.length} </p>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tempreature</th>
                            <th scope="col">Battery Level</th>
                            <th scope="col">Record Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((d, i) => {
                            return <tr>
                                <th scope="row">{i + 1}</th>
                                <td>{d.temperature}</td>
                                <td>{d.batteryLevel}</td>
                                <td>{d.timeStamp}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div > : display == true && <div className="noRecords">No records are present between the selected dates</div>}
        </div>
    )
}

export default FilterData;