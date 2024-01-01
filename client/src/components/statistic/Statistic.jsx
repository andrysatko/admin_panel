import './statistic.css'
export default function Statistic({bikes,availableBikes,bookedBikes,averageCost}){
return (
    <div className="statistic">
        <h1 className='text'>STATISTICS</h1>
        <h3 className='key'>Total Bikes: <span className='value'>{bikes}</span></h3>
        <h3 className='key'>Available Bikes : <span className='value'>{availableBikes}</span></h3>
        <h3 className='key'>Booked Bikes: <span className='value'>{bookedBikes}</span></h3>
        <h3 className='key'>Average bike cost: <span className='value'>{averageCost}</span> UAH/hr. </h3>
    </div>
)
}