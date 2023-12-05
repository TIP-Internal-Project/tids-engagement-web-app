import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import { useAppDispatch, useAppSelector } from '../redux/store'

interface FileUploadModalProps {
  show: boolean
  onHide: () => void
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ show, onHide }) => {

    const [selectedFile, setSelectedFile] = useState<File | undefined>()

	const modalStyle = {
		border: 'none', // Add a new border style
		margin: '4%',
		marginBottom: '0',
	}

	const ModalButton = {
		marginRight: '5px',
		borderColor: '#2B8000',
		backgroundColor: '#2B8000',
		width: '125px',
		fontSize: '11px',
		fontFamily: 'Mulish',
		height: '29px'
	}


	const ModalTitleDiv = {
		display: 'inline-flex'
	}


	const ModalStatus = {
		marginTop: '6px',
		paddingLeft: '11px'
	}


	const qrCodeTitle = {
		backgroundColor: '#5a8d37',
		width: '160px',
		padding: '11px',
		borderStyle: 'ridge',
		marginBottom: '1px'
		
	}

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        setSelectedFile(file)
    }
    
    const handleUpload = () => {
        // Handle file upload logic here using the selectedFile
        console.log('Uploading file:', selectedFile)
     }

	return (
		<Modal
			show={show}
			onHide={onHide}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			
			<Modal.Header closeButton style={modalStyle}>
				<Modal.Title id="contained-modal-title-vcenter" style={ModalTitleDiv}>File Upload
				</Modal.Title>
				
			</Modal.Header>
				
			<hr style={{ width: '87%', margin: '1rem auto', borderWidth: '2px', marginTop: '-5px' }} />

			<Modal.Body className="ModalBody">
                <Container fluid className="px-5">
                <label htmlFor="fileInput">Select a CSV file to upload</label>
                <input
                    type="file"
                    id="fileInput"
                    accept=".csv"
                    onChange={handleFileChange}
                    style={{ marginBottom: '10px' }}
                />

                <Row className="justify-content-end" style={{ marginTop: '30px' }}>
                    <Col xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', color: '#2B8000', marginRight: '2%' }}>
                    <Button variant="primary" className="px-4" onClick={onHide} style={{ backgroundColor: '#c12335', borderColor: '#c12335' }} >
                        Cancel
                    </Button>
                    </Col>
                    <Col xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', marginLeft: '2%' }}>
                    <Button
                        variant="danger"
                        className="px-4"
                        onClick={handleUpload}
                        style={{ backgroundColor: 'rgb(43, 128, 0)', borderColor: 'rgb(43, 128, 0)' }}
                        disabled={!selectedFile}
                    >
                        Upload
                    </Button>
                    </Col>
                </Row>
                </Container>
            </Modal.Body>
		</Modal>
	)
}

export default FileUploadModal
