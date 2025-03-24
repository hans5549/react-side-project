import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Button, Container, Typography, Box } from '@mui/material'
import './App.css'

function App() {
  const [count, setCount] = useState(10)

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    setCount(count - 1)
  }

  const reset = () => {
    setCount(0)
  }

  return (
    <Container 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        textAlign: 'center'
      }}
    >
      <Box sx={{ position: 'absolute', top: 20, left: 20 }}>
        <img src={reactLogo} className="logo react" alt="React logo" width="60" />
      </Box>
      
      <Typography variant="h2" component="h1" gutterBottom>
        Counter App
      </Typography>
      
      <Typography variant="h1" component="div" sx={{ fontSize: '4rem', my: 4 }}>
        {count}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={increment}
          sx={{ 
            borderRadius: '50%', 
            minWidth: '60px', 
            height: '60px',
            backgroundColor: '#242938'
          }}
        >
          +
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={decrement}
          sx={{ 
            borderRadius: '50%', 
            minWidth: '60px', 
            height: '60px',
            backgroundColor: '#242938'
          }}
        >
          -
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={reset}
          sx={{ 
            borderRadius: '50%', 
            minWidth: '60px', 
            height: '60px',
            backgroundColor: '#242938'
          }}
        >
          0
        </Button>
      </Box>
    </Container>
  )
}

export default App
