import './App.css'
import AllMovies from './MainPage/AllMovies'
import Header from './MainPage/Header'
import Search from './MainPage/Search'

function App() {
  return (
    <main>
      <div className='pattern'>
    <div className='wrapper'>
          <Header />
          <AllMovies />
    </div>
      </div>
      </main>
  )
}

export default App
