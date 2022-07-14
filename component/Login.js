import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { auth } from '../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider, OAuthProvider, getAuth, signOut } from 'firebase/auth';
import { collection, ref, push,addDoc, setDoc, doc, docs, getDocs, arrayUnion,getDoc,updateDoc } from "firebase/firestore";
import { getFirestore ,onSnapshot} from "firebase/firestore";
const db = getFirestore();
import moment from 'moment';


// import images
import bgimg from '../public/images/bg.png';
import officeimg from "../public/images/office.png";
import ujblogoimg from '../public/images/ujblogo.png';

const authlog = getAuth();

const Login = () => {

    const [login, setlogin] = useState(true);
  
    const [logout, setlogout] = useState(true);

    const [currentuser, setcurrentuser] = useState('');
    const [date, setdate] = useState();
    const [currentdate, setCurrentdate] = useState('');
    const [currenttime, setCurrentTime] = useState('');
    const [loginlog, setloginlog] = useState([])
    const usersCollectionRef = collection(db, "UJBLOGIN");
    const [userid, setuserid]=useState('');
    // let dt = new Date();
    let dt = moment(new Date()).format("DD/MM/YYYY");
    let tm = new Date().toLocaleTimeString('en-US', { hour12: true });


    
    const handleMicrosoftLogin = async () => {
        const isLogin = localStorage.getItem("ucore");
        const usersDetails = JSON.parse(isLogin);
        const microsoftProvider = new OAuthProvider('microsoft.com');
        const dt=moment(new Date()).format("DD/MM/YYYY");
        const tm = new Date().toLocaleTimeString('en-US', { hour12: true });
        

        //get single document from firebase
        
        //const docSnap = await getDocs(db, "UJBLOGIN","SA");
        // if (docSnap.exists()) {
        //     console.log("Document data:", docSnap.data());
        //   } else {
        //     // doc.data() will be undefined in this case
        //     console.log("No such document!");
        //   }

        //get all document from firebase
        // const querySnapshot = await getDocs(collection(db, "UJBLOGIN"));
        // querySnapshot.forEach((doc) => {
        // // doc.data() is never undefined for query doc snapshots
        //  
        // });
        // console.log("all doc",querySnapshot);


        if (isLogin !== null) {
            console.log("samedate");
            const usersDetails = JSON.parse(isLogin)
            // console.log("user is login", usersDetails.currentuser, usersDetails.currentTime, usersDetails.Date);
            setlogin(false);
            setcurrentuser(usersDetails.currentuser);
            setCurrentdate(usersDetails.Date);
            setCurrentTime(usersDetails.currentTime);
                      
  
            // usersCollectionRef.ref('UJBLOGIN/' + uniqid + '/loginlog').push(data)
        }

        else {
            // 
            signInWithPopup(auth, microsoftProvider).then((res) => {
                // setdate();
                var num = Math.floor(Math.random() * 90000) + 10000;
                const uniqid = res.user.uid+num;
                // const dt=moment(new Date()).format("DD/MM/YYYY");
                let newDate = new Date()
                // let dt = newDate.toDateString();
                // const dt = `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;
                const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(newDate);
                const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(newDate);
                const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(newDate);

                const dt=`${da}-${mo}-${ye}`;
                
                let data = {
                    currentuser: res.user.displayName,
                    currentTime: tm,
                    Date: dt,
                    loginlog:[{logintm:tm,logout:""}],
                    uniqid:uniqid,
                    // user.map((item, index) => {
                    //     loginlog:[{logintm:tm,logout:""}]
                    // });

                }
                

                console.log(dt);
                console.log(tm);
                console.log("response",res );
                console.log(data);

                console.log(data,login);
                // usersCollectionRef.doc(uniqid).set({loginlog: data}, {merge: true});

                console.log(num);
               
              
                setDoc(doc(usersCollectionRef, uniqid ), {
                    currentuser: res.user.displayName,
                    currentTime: tm,
                    Date: dt,
                    uid:uniqid,
                    loginlog:[{logintm:tm,logout:""}],
              
                });
             

                

                setlogin(false);
                setcurrentuser(res.user.displayName);
                setCurrentdate(dt);
                setCurrentTime(tm);
                // window.localStorage.setItem(key, JSON.stringify(data));
                localStorage.setItem('ucore', JSON.stringify(data))

            }).catch((err) => {
                console.log(err);
            })
        }

    }

    useEffect(() => {
        // checking if user already login or not
        const isLogin = localStorage.getItem("ucore");
        const usersDetails = JSON.parse(isLogin);
        let dt = new Date().toLocaleDateString();
        let tm = new Date().toLocaleTimeString();

      
        // let tm = new Date().toLocaleTimeString();
        console.log(isLogin);
        if (isLogin !== null) {
            // if with same date or diffrent date
            if (usersDetails.Date !== dt) {
                console.log("no match dates");
                setlogin(true);
                setcurrentuser("");
                setCurrentdate("");
                setCurrentTime("");
                localStorage.removeItem("ucore");
            }
            else {
                // console.log("user is login", usersDetails.currentuser, usersDetails.currentTime, usersDetails.Date);
                setlogin(false);
                setcurrentuser(usersDetails.currentuser);
                setCurrentdate(usersDetails.Date);
                setCurrentTime(usersDetails.currentTime);
            }


        } 
       
    }, [])

    const logOut = async () => {
        // if (currentdate === dt) {
        //     console.log("dates");
        // }
    

        const isLogin = localStorage.getItem("ucore");
        const usersDetails = JSON.parse(isLogin);
        console.log("logout", usersDetails.loginlog);
        setloginlog(usersDetails.loginlog)
       let logoutTime = new Date().toLocaleTimeString();

       let logoutunid= console.log("logoutid", usersDetails.uniqid,loginlog);
        let logoutdata = {
              
            loginlog:[...loginlog, {logintm:currenttime, logout:logoutTime}]
            // localStorage.setItem("user",loginlog:loginlog)

        }

       console.log(logoutdata);
        await signOut(authlog).then((res) => {
            // Sign-out successful.
            setCurrentdate(usersDetails.Date);
            setCurrentTime(usersDetails.currentTime);

            console.log("logOut");
            console.log("loguttime",logoutTime);
            //const userDoc = doc(db, "UJBLOGIN",logoutunid );
            updateDoc(doc(usersCollectionRef,usersDetails.uniqid),{
              loginlog:logoutdata
            });

            
            setlogin(true);
            setcurrentuser("");
            setCurrentdate("");
            setCurrentTime("");
            // localStorage.removeItem("ucore");
        }).catch((error) => {
            // An error happened.
            console.log("error");
            console.log(error);
        });
    }


    return (
        <div>
            <div class="stars"></div>
            <div class="twinkling"></div>
            <section class="c-background">
                <div class="signin-box">
                    <Image src={ujblogoimg} width={120} height={120} alt="logo" />
                    {
                        login ? <div>

                            <h1>Welcome</h1>
                            <button
                                onClick={() => handleMicrosoftLogin()}    >
                                <Image src={officeimg} alt="images" />
                                <p>Get In</p>
                            </button>
                        </div> : <div>
                            <h5><span>Today Date :</span> <span>{currentdate}</span></h5>
                            <h2>{currentuser}</h2>
                            <div>
                                <h3><span>Login @</span> <span>{currenttime}</span></h3>
                            </div>

                            <button
                                onClick={() => logOut()}    >
                                <Image src={officeimg} width={40} height={40} alt="images" />
                                <p>Get Out</p>
                            </button>

                        </div>
                    }
                </div>
            </section>
        </div>
    )
}

export default Login
