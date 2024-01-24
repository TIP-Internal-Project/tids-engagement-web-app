import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { register } from '../redux/eventRegistrationSlice'
import { addStarPoints } from '../redux/addStarPointsSlice'
import { fetchGeolocation } from '../redux/geolocationSlice'

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

    const dispatch = useAppDispatch()
    const handleRegister = async (eventId: any, email: any, employeeName:any, pointsToAdd:any) => {
        const location = await dispatch(fetchGeolocation())
        const address = location.payload
        await dispatch(register({ eventId, email, address }))
        await dispatch(addStarPoints({ employeeName, pointsToAdd }))
    }

    const handleCancel = () => {
        onHide()
        setSelectedFile(undefined)
    }

    const handleUpload = async () => {
        // check if file exists
        if (selectedFile){
            const reader = new FileReader()
            reader.onload = (e) => {
            // contains all of the text in the csv file
            const csvText:any = e.target!.result
            // splits data into rows, using \n
            const lines:any[] = csvText.split('\n')
            // separates data by comma
            const csvDataLine:any[] = lines.map((line)=>line.split(','))
            // removes the header (first row of the csv file) and gets the actual data (second row onwards)
            const sliced = csvDataLine.slice(1)

            sliced.forEach((line:any) => {
              // splices to only get the starPoints, eventID, email, first name, and last name
              line.splice(0,2)
              line.splice(5,1)
            })

            // loop to get eventId and email for each row in the file
            let starPoints = 0
            let eventId = 0
            let email:any, givenName:any, familyName:any, employeeName:any = ''

            sliced.forEach((line:any, index) => {
                // Gets the the event id of the first row only
                if(starPoints == 0 && eventId == 0){
                    starPoints = parseInt(sliced[index][0])
                    eventId = sliced[index][1]
                }
                // const [starPoints,eventId,email] = sliced[index]
                email = sliced[index][2]
                givenName = sliced[index][3]
                familyName = sliced[index][4]
                employeeName = givenName + ' ' + familyName
                // for each row, insert data into database and add star points
                handleRegister(eventId,email,employeeName,starPoints)
            })
        }
            reader.readAsText(selectedFile)
            // Shows a pop up upon success and hides Upload modal
            onHide()
            alert('Successfully uploaded file')
            setSelectedFile(undefined)
        }
     }

	return (
		<Modal
			show={show}
			onHide={onHide}
			backdrop='static'
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>

			<Modal.Header closeButton style={modalStyle} onClick={handleCancel}>
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
                    <Button variant="primary" className="px-4" onClick={handleCancel} style={{ backgroundColor: '#c12335', borderColor: '#c12335' }} >
                        Cancel
                    </Button>
                    </Col>
                    <Col xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', marginLeft: '2%' }}>
                    <Button
                        variant="danger"
                        className="px-4"
                        onClick={handleUpload}
                        style={{ backgroundColor: 'rgb(43, 128, 0)', borderColor: 'rgb(43, 128, 0)' }}
                        disabled={!selectedFile || undefined}
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