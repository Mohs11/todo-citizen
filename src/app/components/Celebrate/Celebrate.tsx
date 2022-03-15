import img from '../../assets/celebrate-gif.gif'

export default function Celebrate({ handleCelebrated }: any) {
  
  const celebreated = () => {
    handleCelebrated()
  }
  return (
    <div className='celebrate' onClick={() => celebreated()}>      
        <h1>Three Tasks Completed Today!</h1>
        <img src={img} alt="Celebrate" />
    </div>
  )
}
