import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState} from 'react';
import axios from 'axios';


function HomePage() {
  // add-in
  const [runList, setRunList] = useState([]);
  const dispatch = useDispatch();
  const runs = useSelector(store => store.runs);

    useEffect(() => {
    // //dispatch({ type: 'FETCH_RUNS' });
        fetchRuns();
    }, []);

    const fetchRuns = () => {
        axios.get('api/runs')
        .then((response) => {
            setRunList(response.data);
          }).catch(error => {
            console.log('ERROR: Get all runs', error);
            alert('Something is wrong');
          });
    }
        

  return (
    <div className="container">
      <h2>HomePage</h2>
      {runList.map(run => {
                    return (
                        <div>{run.name}</div>
                    );
                })}
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default HomePage;