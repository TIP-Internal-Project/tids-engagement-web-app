import React, { FC } from 'react'
import TidsModal from '../Modal'
import Button from 'react-bootstrap/Button'

export type ConfirmDialogType = {
  type: DialogType
  isOpen: boolean
  targetId?: any
}

export enum DialogType {
  create = 'close',
  update = 'update',
  delete = 'delete',
  save = 'save',
  exit = 'exit',
  none = 'none',
}

interface ModalProps {
  show: boolean
  onHide: () => void
  centered?: boolean
  hasCloseBtn?: boolean
  onConfirm: () => void
  type: DialogType
}

const ConfirmDialog: FC<ModalProps> = ({
  onHide,
  show,
  centered = false,
  hasCloseBtn,
  onConfirm,
  type,
}) => {
  let bodyText = 'Do you wish to proceed?'
  if (type === DialogType.create) {
    bodyText = 'Do you wish to create this item?'
  } else if (type === DialogType.exit) {
    bodyText = 'Do you wish to close and discard changes?'
  } else if (type === DialogType.update) {
    bodyText = 'Do you wish to modify this item?'
  } else if (type === DialogType.delete) {
    bodyText = 'Do you wish to delete this item?'
  } else if (type === DialogType.save) {
    bodyText = 'Do you wish to save this item?'
  } else if (type === DialogType.none) {
    bodyText = ''
  }
  return (
    <TidsModal
      isDialog={true}
      show={show}
      onHide={onHide}
      size='sm'
      ariaLabelBy='confirm-dialog-modal'
      centered={centered}
      hasHeader={true}
      headerContent={<div>Please confirm</div>}
      bodyContent={<div>{bodyText}</div>}
      hasSeperator={false}
      footerContent={
        <div>
          <Button variant='dark' onClick={onHide} style={{ marginRight: '0.5em' }}>
            Cancel
          </Button>
          <Button variant='success' onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      }
      hasCloseBtn={hasCloseBtn}
    />
  )
}

export default ConfirmDialog
