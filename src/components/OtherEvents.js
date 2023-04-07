import React, { useState, useEffect } from 'react';


export default function OtherEvents() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Import data from local file
        const importedData = require("../otherEvents.json");
        // Update state with imported data and set loading to false
        setData(importedData);
        setIsLoading(false);
    }, []);



    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const renderData = () => {
        if (isLoading) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className='container my-3 '>
                    <div className=" main-card py-3 px-3">
                        <h5 className="fw-bold">Other Events</h5>
                        <div className='widget-card mb-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
                        <div className=" table-responsive">
                            <table className="table table-striped table-hover">
                                <thead >
                                    <tr>
                                        <th nowrap>Meter Serial Number</th>
                                        <th nowrap>Date Time</th>
                                        <th nowrap>Event Code</th>
                                        <th nowrap>Instantaeous_current_L1</th>
                                            <th>Instantaeous_current_L2</th>
                                            <th>Instantaeous_current_L3</th>
                                            <th>Instantaeous_voltage_L1</th>
                                            <th>Instantaeous_voltage_L2</th>
                                            <th>Instantaeous_voltage_L3</th>
                                            <th>Power_fator_L1</th>
                                            <th>Power_fator_L2</th>
                                            <th>Power_fator_L3</th>
                                            <th>Active_egy_import_Q1Q4</th>
                                            <th>Active_egy_export_Q2Q3</th>
                                            <th>Id_india</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.meterSerialNumber}</td>
                                            <td>{item.dateTime}</td>
                                            <td>{item.eventCode}</td>
                                            <td>{item.instantaneous_current_L1}</td>
                                            <td>{item.instantaneous_current_L2}</td>
                                            <td>{item.instantaneous_current_L3}</td>
                                            <td>{item.instantaneous_voltage_L1}</td>
                                            <td>{item.instantaneous_voltage_L2}</td>
                                            <td>{item.instantaneous_voltage_L3}</td>
                                            <td>{item.power_factor_L1}</td>
                                            <td>{item.power_factor_L2}</td>
                                            <td>{item.power_factor_L3}</td>
                                            <td>{item.active_engy_import_Q1Q4}</td>
                                            <td>{item.active_engy_export_Q2Q3}</td>
                                            <td>{item.id_india}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <nav>
                <ul className="pagination">
                    {pageNumbers.map((number) => (
                        <li key={number} className="page-item">
                            <a
                                onClick={(e) => {
                                    e.preventDefault(); // prevent the default behavior of the link
                                    setCurrentPage(number);
                                }}
                                href="/"
                                className="page-link"
                            >
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        );

    };

    return (
        <div>
            {renderData()}
            {renderPagination()}
        </div>
    );
}
