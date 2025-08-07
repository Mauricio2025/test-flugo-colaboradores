import { Avatar, AppBar, IconButton, Toolbar } from '@mui/material'
import { drawerWidth } from './Sidebar'

export default function TopBar() {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        bgcolor: '#FFFFFF',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton edge="start" color="inherit" onClick={() => { /* opcional toggle */ }}>
        </IconButton>
        <Avatar sx={{ bgcolor: '#E5E7EB', color: '#6B7280' }}>U</Avatar>
      </Toolbar>
    </AppBar>
  )
}
