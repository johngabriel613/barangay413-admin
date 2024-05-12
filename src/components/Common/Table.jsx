import React, { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { useParams } from 'react-router-dom';
import { axios } from '../../config/api';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { EyeIcon } from '@heroicons/react/24/solid';

const Table = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [data, setData] = useState();
  const [records, setRecords] = useState()
  const { request } = useParams();

  const columns = [
    {
      name: 'Name',
      selector: row => row.name
    },
    {
      name: 'Purpose',
      selector: row => row.purpose
    },
    {
      name: 'Status',
      cell: row => (
        <span className={`${row.status === 'pending' ? 'bg-yellow-100 text-yellow-900' : row.status === 'declined' ? 'bg-red-100 text-red-900' : 'bg-green-100 text-green-900'} p-1 rounded-md font-medium`}>
          {row.status}
        </span>
      ),
      sortable: true
    },
    {
      name: 'Date',
      selector: row => {
        const date = new Date(row.createdAt);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      }
    },
    {
      name: 'Action',
      cell: row => (
        <button onClick={() => handleView(row)} className="bg-blue-700 px-2 py-1 rounded-md"><EyeIcon className="h-4 w-4 text-white" /></button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  const handleView = (row) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  const getData = async (request) => {
    try {
      const response = await axios.get(`/request?type=${request}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const approveRequest = async (id) => {
    try {
      const response = await axios.get(`/request/${id}?action=approved`);
      const newData = await getData(request);
      setData(newData);
      setRecords(newData);
      setModalOpen(false);
    } catch (error) {
      throw error;
    }
  };

  const declineRequest = async (id) => {
    try {
      const response = await axios.get(`/request/${id}?action=declined`);
      const newData = await getData(request);
      setData(newData);
      setRecords(newData);
      setModalOpen(false)
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getData(request);
      setData(responseData);
      setRecords(responseData);
      
    };
    fetchData()
  }, [request]);

  const handleFilter = (event) => {
    const filteredData =  data?.filter(row => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(filteredData)
    console.log(event.target.value)
  }

  
  return (
    <>
      {data && (
        <>
          <div className='p-2'>
            <div className='text-end mb-2'>
              <input className='bg-gray-100 rounded-sm p-1' type="text" placeholder='Search by name' onChange={handleFilter}/>
            </div>
            <DataTable 
              columns={columns} 
              data={records} 
              pagination
              paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
              selectableRows
              striped
            />
          </div>
          {selectedRow && (
            <Dialog
              open={modalOpen}
              handler={handleView}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
              }}
            >
              <DialogHeader>
                Status:  
                <span className={`${selectedRow.status === 'pending' ? 'bg-yellow-100 text-yellow-900' : selectedRow.status === 'declined' ? 'bg-red-100 text-red-900' : 'bg-green-100 text-green-900'} p-1 rounded-md font-medium text-sm`}>
                {selectedRow.status}
                </span>
              </DialogHeader>
              <DialogBody>
                <ul>
                  <li>
                    Name: {selectedRow.name}
                  </li>
                  <li>
                    House / Block No.: {selectedRow.address1}
                  </li>
                  <li>
                    Street: {selectedRow.address2}
                  </li>
                  <li>
                    Barangay: {selectedRow.address3}
                  </li>
                  <li>
                    Purpose: {selectedRow.purpose}
                  </li>
                  <li>
                    Date Submitted: {selectedRow.createdAt}
                  </li>
                </ul>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={() => declineRequest(selectedRow._id)}
                  className="mr-1"
                >
                  <span>Decline</span>
                </Button>
                {selectedRow.status === 'approved' ? 
                  <Button color="green" onClick={handleView}>
                    <span>Print</span>
                  </Button> :
                  <Button color="green" onClick={() => approveRequest(selectedRow._id)}>
                    <span>Approve</span>
                  </Button>
                }
              </DialogFooter>
            </Dialog>
          )}
        </>
      )}
    </>
  );
};

export default Table;
