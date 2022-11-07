import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { FC } from 'react'

import { useAppSelector } from '../../hooks/appHooks'
import { selectSpinner } from '../../slices/spinnerSlice'
import { Modal } from '../Modal/Modal'

type SpinnerModalProps = {
  setIsOpened?: Function
}

export const SpinnerModal: FC<SpinnerModalProps> = ({ setIsOpened = () => {} }) => {
  const isVisible = useAppSelector(selectSpinner)

  return (
    <>
      { isVisible &&
      <Modal isOpen={setIsOpened}>
        <Box sx={{ display: 'flex' }}>
          <CircularProgress
            thickness={6}
            size="4rem"
            style={{ color: '#FFF' }}
          />
        </Box>
      </Modal>
      }  
    </>
  )
}
