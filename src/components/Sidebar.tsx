import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

// importe a logo diretamente do seu assets
import logo from '../assets/logo.png'

export const drawerWidth = 240

export default function Sidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: '#FFFFFF',
          borderRight: '1px solid #E5E7EB',
        },
      }}
    >
      {/* Espaço para alinhar com a AppBar */}
      <Toolbar />

      {/* Logo único (ícone + texto já juntos) */}
      <Box sx={{ px: 2, py: 1.5 }}>
        <img src={logo} alt="Flugo" width={120} height="auto" />
      </Box>

      <Divider />

      {/* Itens de navegação */}
      <List disablePadding>
        <ListItemButton
          selected={pathname === '/'}
          onClick={() => navigate('/')}
          sx={{
            px: 2,
            py: 1.5,
            justifyContent: 'flex-start',
            ...(pathname === '/' && { bgcolor: '#E5E7EB' }),
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary="Colaboradores"
            primaryTypographyProps={{ fontWeight: pathname === '/' ? 600 : 400 }}
          />
          <ListItemIcon sx={{ marginLeft: 'auto' }}>
            <ChevronRightIcon />
          </ListItemIcon>
        </ListItemButton>
      </List>
    </Drawer>
  )
}
