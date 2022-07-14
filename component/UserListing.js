import React,{useState, useEffect,useRef} from 'react';
import firebaseApp from '../firebaseConfig'
import { auth } from '../firebaseConfig';
import { collection, ref, push, addDoc, setDoc, doc, docs, getDocs, deleteDoc, arrayUnion, getDoc, updateDoc, query, Timestamp, orderBy} from "firebase/firestore";
import { getFirestore, onSnapshot } from "firebase/firestore";
import Router from 'next/router';
import Layout from './Layout';
import Link from 'next/link'
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
const db = getFirestore();
// import { DownloadTableExcel } from 'react-export-table-to-excel';
import { CSVLink, CSVDownload } from "react-csv";
// import ReactExport from "react-export-excel";
// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function UserListing() {
    const [userdetail, setUserdetail] = useState('');
    const [userLoginData, setUserLoginData] = useState([]);
    const [loginlogData, setloginlogData] = useState([]);

   

    useEffect(()=>{
        // get all data from firebase
        const getAllDocument = async () => {

            const q = query(collection(db, "UJBLOGIN"), orderBy('Date', 'asc'))
            onSnapshot(q, (snapshot) => {
                console.log("user Login details", snapshot);
                setUserLoginData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            })
        }

        getAllDocument();
    });


  return (
    <section className='c-userlist box'>
        
              <h2>User Details

              <CSVLink    
                    data={userLoginData}
                    filename={"Attendance.csv"}
                    className="btn btn-primary"
                    target="_blank">Download me
                </CSVLink>

              </h2>

              {/* <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef.current}
                >

                   <Button> Export excel </Button>

                </DownloadTableExcel> */}

            

              {/* <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef.current}
                >

                   <Button> Export excel </Button>

                </DownloadTableExcel> */}

                
{/* 
    <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="Attandece Sheet"
        sheet="tablexls"
        buttonText="Download Sheet"/> */}

        {/* <ExcelFile element={<a> Download</a>}>
                <ExcelSheet data={userLoginData} name="Data">
                {userLoginData.map((tabledata,key=j) => (
                    <ExcelColumn

                    key={tabledata.currentuser}
                    label={tabledata.Date}
                    value={tabledata.currentTime}
                    />
                ))}
                </ExcelSheet>
            </ExcelFile> */}
 
        
        <table className='table-class'  id="table-to-xls">
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Username</th>
                                    <th>Login Date</th>
                                    <th>Login Time</th> 
                                    {/* <th>Login-Logout Data</th> */}
                                </tr>
                            </thead>

                    <tbody>

                

                    {/* // map the function */}
                 
                {
                    userLoginData && userLoginData.map((userdetail, key=i) => {
                        console.log("user all data", userdetail);
                        
                        return (
                            <>

                                  
                                



                                    <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{userdetail.currentuser}</td>
                                        <td>{userdetail.Date}</td>
                                        <td>{userdetail.currentTime}</td>
                                        {/* <td>{userdetail.loginlog.logintm}</td> */}
                                    {/* {
                                        loginlogData.map((item)=>{
                                            <td>{item.}</td>
                                        })
                                    } */}                                                   
                                        
                                    
                                    </tr> 
                                   
                             
                          
                          </>                  
                        )

                    })
                }

                </tbody>
        </table>
        



    </section>
  )
}

export default UserListing;
