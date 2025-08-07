import type { BasicInfo } from '../contexts/RegistrationContext'
import { useRegistration } from '../contexts/RegistrationContext'
import { useForm, Controller, type Resolver, type SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Box,
  Button,
  Switch,
  TextField,
  Typography,
  FormControlLabel,
} from '@mui/material'

interface Step1Props {
  onNext: () => void
}

const schema = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  ativo: yup.boolean().required(),
})

type FormValues = yup.InferType<typeof schema>

export default function Step1({ onNext }: Step1Props) {
  const { data, setBasicInfo } = useRegistration()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      nome: data.basicInfo.nome,
      email: data.basicInfo.email,
      ativo: data.basicInfo.ativo,
    },
    resolver: yupResolver(schema) as Resolver<FormValues>,
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    setBasicInfo(values as BasicInfo)
    onNext()
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom color='gray'>
        Informações Básicas
      </Typography>

      <Controller
        name="nome"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nome"
            fullWidth
            margin="normal"
            error={!!errors.nome}
            helperText={errors.nome?.message}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&.Mui-focused fieldset': {
                  borderColor: '#22C55E',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#22C55E',
              },
            }}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="E-mail"
            placeholder="e.g. joao@gmail.com"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&.Mui-focused fieldset': {
                  borderColor: '#22C55E',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#22C55E',
              },
            }}
          />
        )}
      />

      <Controller
        name="ativo"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                {...field}
                checked={field.value}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: '#22C55E' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#22C55E' },
                }}
              />
            }
            label="Ativar ao criar"
            sx={{ mt: 3, color: '#22C55E' }}
          />
        )}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 6 }}>
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
          Próximo
        </Button>
      </Box>
    </Box>
  )
}
