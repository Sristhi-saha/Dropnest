import '../App.css'
import Navbar from '../components/navbar.jsx'
import Welcome from '../components/welsome.jsx'
import About from '../components/about.jsx'
import Footer from '../components/footer.jsx'
import GetStart from '../components/getstart.jsx'

function Home() {


  return (
    <>
      <Navbar />
      <Welcome />
      <About />
      <GetStart />
      <Footer />
    </>
  )
}

export default Home
