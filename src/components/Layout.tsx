import type { ReactNode } from 'react'
import { Box, CssBaseline } from '@mui/material'
import Sidebar from './Sidebar'
import TopBar from './Topbar'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <TopBar />

      <Box
        component="main"
        sx={{
          flex: '1 1 0%',   // ocupa todo o espaço restante
          minWidth: 0,      // permite encolher corretamente
          minHeight: '100vh',
          p: 3,
          pt: 10,           // espaço para o AppBar (64px)
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
