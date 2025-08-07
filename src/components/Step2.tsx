import  { useState } from 'react'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRegistration } from '../contexts/RegistrationContext'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material'

// Firebase
import { db } from '../services/firebase'
import { collection, addDoc } from 'firebase/firestore'

interface Step2Props {
  onBack: () => void
  onNext: () => void
}

const schema = yup.object({
  departamento: yup.string().required('Departamento é obrigatório'),
})

type FormValues = yup.InferType<typeof schema>

const departamentos = [
  'Recursos Humanos',
  'Financeiro',
  'Tecnologia',
  'Marketing',
  'Vendas',
]

export default function Step2({ onBack, onNext }: Step2Props) {
  const { data, setBasicInfo, setDepartamento } = useRegistration()
  const [successOpen, setSuccessOpen] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: { departamento: data.departamento },
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    // atualiza o contexto
    setDepartamento(values.departamento)

    const payload = {
      nome: data.basicInfo.nome,
      email: data.basicInfo.email,
      ativo: data.basicInfo.ativo,
      departamento: values.departamento,
      criadoEm: new Date(),
    }

    try {
      await addDoc(collection(db, 'colaboradores'), payload)
      setSuccessOpen(true)
    } catch (err) {
      console.error(err)
      alert('Erro ao salvar. Tente novamente.')
    }
  }

  const handleClose = () => {
    setSuccessOpen(false)
    // limpa contexto e formulários
    setBasicInfo({ nome: '', email: '', ativo: false })
    setDepartamento('')
    reset({ departamento: '' })
    onNext()
  }

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" fontWeight="bold" gutterBottom color="gray">
          Informações Profissionais
        </Typography>

        <Controller
          name="departamento"
          control={control}
          render={({ field }) => (
            <FormControl
              fullWidth
              margin="normal"
              error={!!errors.departamento}
              sx={{
                '& .MuiInputLabel-root.Mui-focused': { color: '#22C55E' },
              }}
            >
              <InputLabel id="departamento-label" sx={{ '&.Mui-focused': { color: '#22C55E' } }}>
                Departamento
              </InputLabel>
              <Select
                {...field}
                labelId="departamento-label"
                label="Departamento"
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 2 },
                  '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#22C55E' },
                  '& .MuiSvgIcon-root': { color: '#22C55E' },
                }}
              >
                {departamentos.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.departamento?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={onBack}
            sx={{
              borderColor: '#22C55E',
              color: '#22C55E',
              '&:hover': { borderColor: '#16A34A', color: '#16A34A' },
              '&:focus': {
                outline: 'none',
                boxShadow: '0 0 0 0.2rem rgba(34,197,94,0.5)',
              },
            }}
          >
            Voltar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid}
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
            Concluir
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Colaborador cadastrado com sucesso!
        </Alert>
      </Snackbar>
    </>
  )
}
