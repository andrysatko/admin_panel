import { useEffect, useState } from 'react'
import Header from './components/Header'
import Item from './components/Bycicle/Bycicle'
import Footer from './components/Footer'
import './App.css'
import CreatePostForm from './components/CreatePostForm'
import Statistic from './components/statistic/Statistic'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBicycles } from './features/bicycleSlice';
import axios from 'axios'

function App() {
  const [statistic , setStatistic] = useState({total:0,available:0,booked:0,averagePrice:0})
  const dispatch = useDispatch();
  const bicycles = useSelector((state) => state.bicycles.bicycles);
  const status = useSelector((state) => state.bicycles.status);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllBicycles());
    }
  }, [status, dispatch]);
  useEffect(()=>{
    axios.get('http://localhost:4000/api/bicycles/stats').then(data=>{
      setStatistic(data.data)
    })
  },[bicycles])
  const sortedBicycles = [...bicycles].sort((a, b) => {
    const statusOrder = ['available', 'busy', 'unavailable'];
    return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
  });
  return (
    <div className='AdminPanel'>
      <Header></Header>
      <div className='content'>
        <div className='left'>
          {sortedBicycles.map(item=><Item key={item.id} id={item.id} name={item.name} type={item.type} color={item.color} price={item.price} status={item.status}></Item>)}
        </div>
        <div className='divider'></div>
       <div className='right'>
          <CreatePostForm></CreatePostForm>
        <div className='horizontal_divider'></div>
        <Statistic availableBikes={statistic.available} averageCost={statistic.averagePrice} bikes={statistic.total} bookedBikes={statistic.booked}></Statistic>
       </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App
