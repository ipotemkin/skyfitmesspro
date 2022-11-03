import { FC } from 'react'
import { useAppSelector } from '../../hooks/appHooks'
import { selectSpinner } from '../../slices/spinnerSlice'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { Modal } from '../Modal/Modal'

// import styles from './style.module.css'

type SpinnerModalProps = {
  setIsOpened?: Function
}

const noop = () => {}

export const SpinnerModal: FC<SpinnerModalProps> = ({ setIsOpened = noop }) => {
  const isVisible = useAppSelector(selectSpinner)

  return (
    <>
      { isVisible &&
      <Modal isOpen={setIsOpened}>
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </Modal> }  
    </>
  )
}
