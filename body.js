import React, { useEffect } from 'react';
import reactDOM from 'react-dom/client';
function Body(){
    let [Profile,setProfile] = React.useState([]);
    let [Number,setNumber] = React.useState(10);
    let [Name,setName] = React.useState("");
    async function getProfile(count,name,flag){
        let ran = Math.floor(Math.random()*10000);
        if(!flag){//for searching by number
        try{
        let api = await fetch(`https://api.github.com/users?since=${ran}&per_page=${count}`);
        let data = await api.json();
        setProfile(data);
        }catch(err){
            console.log(err);
            reactDOM.render(<h1>Something Went Wrong</h1>,document.getElementById('root'));
        }}else{//for searching by name
            try{
                let api = await fetch(`https://api.github.com/users/${name}`);
                let data = await api.json();
                if (data.message === "Not Found") {
                    alert("User not found! Try another username.");
                    return;
                }
                setProfile([data]);
                }catch(err){
                    console.log(err);
                    reactDOM.render(<h1>Something Went Wrong</h1>,document.getElementById('root'));
                }
        }
    }
    useEffect(()=>{
        getProfile(Number,Name,false);
    },[]);
    return(
       <>
       <div className='search'>
         <input className='searchNumber' type="number" max={50} onChange={(e)=>setNumber(e.target.value)} placeholder="See Number Of Profiles..."/>
         <button className='NumberButton'onClick={()=>getProfile(Number,Name,false)}>Search</button>
         <input className='searchName' type="text" onChange={(e)=>setName(e.target.value)} placeholder="Search By Name..."/>
         <button className='NameButton'onClick={()=>getProfile(Number,Name,true)}>Search</button>
       </div>
        <div className="Profiles">
            {
                Profile.map((user)=>{
                    return(
                        <>
                        <div className='card'>
                            <img src={user.avatar_url} alt="profile-pic"/>
                            <h2>{user.login}</h2>
                            <a href={user.html_url} target='_blank'>View Profile</a>
                        </div>
                        </>
                    );
            })
        }
        </div>
       </>
    );
}
export default Body;