import { Button } from '@mui/material'
import React from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Nav from '../components/Nav'
import { auth } from "../redux/user/userSlice"
import { useDispatch } from 'react-redux'

function Home() {
  const dispatch = useDispatch();
  return (
    <div>
        <Nav />
        <section className="todoapp">
            <Header />
            <Content />
            
        </section>
        
        <div className='cikis_button'><Button variant="contained" onClick={() => { dispatch(auth())}}>çıkış yap</Button></div>

        <Footer />
        
        
    </div>
  )
}

export default Home