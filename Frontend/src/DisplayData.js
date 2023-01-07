import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import socketClient from 'socket.io-client';
const socketURL = 'http://localhost:7001';

const socket = socketClient(socketURL);

const baseUrl = "http://localhost:7000/data";

function DisplayData() {

    const [data, setData] = useState([]);
    const [updatedData, setUpdatedData] = useState({});
    const [page, setPage] = useState(1);
    const [totalDocuments, setTotalDocuments] = useState(0);
    let totalPages = useRef(1);
    totalPages.current = parseInt((totalDocuments / 20) + 0.9);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getData();
    }, [page]);

    useEffect(() => {
        let temp = data.map(d => {
            if(d._id == updatedData._id) {
                return updatedData
            } else {
                return d
            }
        })
        setData(temp);
    }, [updatedData]);

    socket.on('global-data', uD => {
        setUpdatedData(uD);
    })

    const getData = () => {
        axios.get(`${baseUrl}?skip=${page - 1}&limit=20`).then(res => {
            setData(res.data.data);
            setTotalDocuments(res.data.totalDocuments)
        });
    }

    const dataRow = (r) => {
        console.log(r);
    }

    const linkPage = (p) => {
        if (p == "Next") {
            setPage(page + 1)
        } else if (p == "Previous") {
            setPage(page - 1)
        } else if (p == "First Page") {
            setPage(1);
        } else if (p == "Last Page") {
            setPage(totalPages.current);
        }
    }



    if (data) {
        data && console.log(data, updatedData);
        // totalPages.current = parseInt((totalDocuments / 20) + 0.9);

        return (
            <div className="displayData">
                <h1>Display Data</h1>
                <div className="scroll">
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
                                    <button
                                        onClick={e => dataRow(e.target.id)}
                                        id={d._id}
                                        className="btn btn-outline-warning"
                                    ><Link to={`update?${d._id}`}>Update Data</Link></button>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <nav aria-label="Page navigation example">
                    <div className="homeButtons">
                        <p style={{ textAlign: "start" }}> Total Pages : {totalPages.current} | Documents Per Page : 20 | Total Documents : {totalDocuments}</p>
                        <button className="btn btn-outline-primary"><Link to="add">Add Data</Link></button>
                        <button className="btn btn-outline-info"><Link to="filter">Filter Data</Link></button>
                    </div>
                    <div className="pages">
                        <button
                            disabled={page == 1}
                            className="btn btn-primary"
                            onClick={e => linkPage(e.target.innerText)}
                        >First Page</button>
                        <button
                            disabled={page == 1}
                            className="btn btn-primary"
                            onClick={e => linkPage(e.target.innerText)}
                        >Previous</button>
                        <p>Page : {page}</p>
                        <button
                            disabled={page == totalPages.current}
                            className="btn btn-primary"
                            onClick={e => linkPage(e.target.innerText)}
                        >Next</button>
                        <button
                            disabled={page == totalPages.current}
                            className="btn btn-primary"
                            onClick={e => linkPage(e.target.innerText)}
                        >Last Page</button>
                    </div>
                </nav>
            </div>
        )
    }
}

export default DisplayData;