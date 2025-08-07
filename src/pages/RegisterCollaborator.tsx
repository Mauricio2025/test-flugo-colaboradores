import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Step1 from '../components/Step1'
import Step2 from '../components/Step2'

const steps = ['Infos Básicas', 'Infos Profissionais']

export default function RegisterCollaborator() {
  const [activeStep, setActiveStep] = useState(0)
  const navigate = useNavigate()

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((s) => s + 1)
    } else {
      navigate('/')
    }
  }
  const handleBack = () => setActiveStep((s) => s - 1)

  const progress = Math.round(((activeStep + 1) / steps.length) * 100)

  return (
    <Box sx={{ width: '82rem' }}>
      <Paper sx={{ p: 3, borderRadius: "transparent", boxShadow: 'none' }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" sx={{ color: '#22C55E' }} />}
          aria-label="breadcrumb"
          sx={{ mb: 2 }}
        >
          <Link
            underline="hover"
            href="/"
            sx={{ color: '#22C55E', '&:hover': { color: '#16A34A' } }}
          >
            Colaboradores
          </Link>
          <Typography color="text.disabled">Cadastrar Colaborador</Typography>
        </Breadcrumbs>

        {/* Barra de progresso */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Box sx={{ flexGrow: 1, mr: 2 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 4,
                borderRadius: 2,
                bgcolor: '#E5F9EE',
                '& .MuiLinearProgress-bar': { bgcolor: '#22C55E' },
              }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: '#6B7280', minWidth: 35 }}>
            {progress}%
          </Typography>
        </Box>


        <Box sx={{ display: 'flex' }}>
          {/* Stepper vertical */}
          <Box sx={{ mr: 6 }}>
            <Stepper orientation="vertical" activeStep={activeStep} sx={{ p: 0 }}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    StepIconProps={{
                      sx: {
                        color: index === activeStep ? '#22C55E' : '#9CA3AF',
                        '&.Mui-active': {
                          color: '#22C55E',
                        },
                        '&.Mui-completed': {
                          color: '#22C55E',
                        },
                      },
                    }}
                    sx={{
                      '& .MuiStepLabel-label': {
                        color: index === activeStep ? 'text.primary' : 'text.disabled',
                        fontWeight: index === activeStep ? 600 : 400,
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* Conteúdo do passo */}
          <Box sx={{ flexGrow: 1 }}>
            {activeStep === 0 && <Step1 onNext={handleNext} />}
            {activeStep === 1 && <Step2 onBack={handleBack} onNext={handleNext} />}
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
