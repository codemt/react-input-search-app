import React,{ useState, useEffect } from 'react';
import SearchInput,{ createFilter } from 'react-search-input'
import axios from 'axios'
import './App.css';

function App() {

  const [users,setUsers] = useState(null)
  const [filteredUsers,setFilter] = useState(null)
  const KEYS_TO_FILTER = ['name.first','name.last']

  useEffect(()=>{
      const getRandomUsers = async()=>{

            await axios.get('https://randomuser.me/api/')
            .then(res =>{
                console.log(res.data)
                setUsers(res.data)
            })
            .catch(err=>{
              console.log(err)
            })

      }
      getRandomUsers();
      console.log(users)
  },[users !=null])

   const searchUpdated = (term) =>{
      const filtered = users.results.filter(createFilter(term,KEYS_TO_FILTER))
      setFilter(filtered)
      console.log(filtered)
      console.log(filteredUsers)
    }

    return (
      <div className="App">
        <SearchInput className="search-input"  onChange={searchUpdated} />
        {filteredUsers ? 

          filteredUsers.map((data)=>(
             <React.Fragment>
                  <p> {data.name.first} {data.name.last} </p>
              </React.Fragment>

           )) : <p>Loading ...</p> 
      
      }
        
      </div>
    );

   
}
export default App;
