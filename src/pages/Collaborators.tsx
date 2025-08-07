import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  TableSortLabel,
  Avatar,
  LinearProgress,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { db } from '../services/firebase'
import { collection, getDocs } from 'firebase/firestore'
import type { RegistrationData } from '../contexts/RegistrationContext'

type Order = 'asc' | 'desc'
type HeadCell = {
  id: 'nome' | 'email' | 'departamento' | 'ativo'
  label: string
}

const headCells: HeadCell[] = [
  { id: 'nome', label: 'Nome' },
  { id: 'email', label: 'E-mail' },
  { id: 'departamento', label: 'Departamento' },
  { id: 'ativo', label: 'Status' },
]

export default function Collaborators() {
  const [rows, setRows] = useState<RegistrationData[]>([])
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<HeadCell['id']>('nome')
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    getDocs(collection(db, 'colaboradores'))
      .then((snap) => {
        const mapped = snap.docs.map((doc) => {
          const d = doc.data() as any
          return {
            basicInfo: {
              nome: d.nome,
              email: d.email,
              ativo: d.ativo,
              avatarUrl: d.avatarUrl,
            },
            departamento: d.departamento,
          } as RegistrationData
        })
        setRows(mapped)
      })
      .finally(() => setLoading(false))
  }, [])

  const comparator = (a: RegistrationData, b: RegistrationData) => {
    let aVal: string | boolean = ''
    let bVal: string | boolean = ''
    switch (orderBy) {
      case 'nome':
        aVal = a.basicInfo.nome.toLowerCase()
        bVal = b.basicInfo.nome.toLowerCase()
        break
      case 'email':
        aVal = a.basicInfo.email.toLowerCase()
        bVal = b.basicInfo.email.toLowerCase()
        break
      case 'departamento':
        aVal = a.departamento.toLowerCase()
        bVal = b.departamento.toLowerCase()
        break
      case 'ativo':
        aVal = a.basicInfo.ativo
        bVal = b.basicInfo.ativo
        break
    }
    if (aVal < bVal) return order === 'asc' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  }

  const sortedRows = useMemo(() => {
    return [...rows].sort(comparator)
  }, [rows, order, orderBy])

  const handleSort = (id: HeadCell['id']) => {
    if (orderBy === id) {
      setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setOrderBy(id)
      setOrder('asc')
    }
  }

  return (
    <Paper
      sx={{
        width: '82rem',
        p: 3,
        borderRadius: 'transaprent',
        boxShadow: '0 1px 2px rgba(0,0,0,0)',
      }}
    >
      {/* Cabeçalho */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Colaboradores
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/register')}
          sx={{
            bgcolor: '#22C55E',
            '&:hover': { bgcolor: '#16A34A' },
            textTransform: 'none',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            fontWeight: 'bold',
            // remove a borda azul de foco e usa verde
            '&:focus': {
              outline: 'none',
              boxShadow: '0 0 0 0.2rem rgba(34,197,94,0.5)',
            },
          }}
        >
          Novo Colaborador
        </Button>
      </Box>


      {/* Tabela */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          width: '100%',
          borderRadius: '16px',
          boxShadow: '0px 4px 8px rgba(0,0,0,0.05)',
          overflow: 'hidden',
          bgcolor: '#FFFFFF',
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: '#F3F4F6' }}>
            <TableRow>
              {headCells.map((cell) => (
                <TableCell
                  key={cell.id}
                  sx={{
                    fontWeight: 600,
                    color: '#6B7280',
                    py: 1.5,
                    '&:first-of-type': { borderTopLeftRadius: '16px' },
                    '&:last-of-type': { borderTopRightRadius: '16px' },
                  }}
                >
                  <TableSortLabel
                    active={orderBy === cell.id}
                    direction={orderBy === cell.id ? order : 'asc'}
                    onClick={() => handleSort(cell.id)}
                  >
                    {cell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} sx={{ p: 0 }}>
                  <LinearProgress
                    variant="indeterminate"
                    sx={{
                      height: 4,
                      '& .MuiLinearProgress-bar': {
                        background:
                          'linear-gradient(90deg, #a6ff00 0%, #00ff6a 100%)',
                      },
                    }}
                  />
                </TableCell>
              </TableRow>
            ) : (
              sortedRows.map((r, i) => {
                const isLast = i === sortedRows.length - 1
                return (
                  <TableRow
                    key={i}
                    hover
                    sx={{
                      '&:last-of-type td': { borderBottom: 0 },
                      ...(isLast && {
                        '& td:first-of-type': {
                          borderBottomLeftRadius: '16px',
                        },
                        '& td:last-of-type': {
                          borderBottomRightRadius: '16px',
                        },
                      }),
                    }}
                  >
                    <TableCell
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        py: 1.5,
                      }}
                    >
                      <Avatar
                        src={r.basicInfo.avatarUrl}
                        alt={r.basicInfo.nome}
                        sx={{
                          bgcolor: '#E5E7EB',
                          color: '#6B7280',
                          width: 32,
                          height: 32,
                        }}
                      >
                        {r.basicInfo.nome.charAt(0)}
                      </Avatar>
                      {r.basicInfo.nome}
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      {r.basicInfo.email}
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      {r.departamento}
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Chip
                        label={r.basicInfo.ativo ? 'Ativo' : 'Inativo'}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          px: 1,
                          ...(r.basicInfo.ativo
                            ? {
                              bgcolor: 'rgba(34,197,94,0.1)',
                              color: '#166534',
                            }
                            : {
                              bgcolor: 'rgba(248,113,113,0.1)',
                              color: '#831919',
                            }),
                        }}
                      />
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
