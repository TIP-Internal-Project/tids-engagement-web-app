import React, { ChangeEvent, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import ImageModal from './ImageModal'



interface ExpenseModalProps {
  show: boolean
  onHide: () => void
  event: any
  action: string
}

interface Expense {
    id: string
    description: string
    amount: number
    receipt: File | null
}


// Function to calculate the total expense amount
const calculateTotalExpense = (expenses: Expense[]) => {
    let total = 0
    expenses.forEach((expense) => {
      total += expense.amount
    })
    return total
  }

const ExpenseModal: React.FC<ExpenseModalProps> = ({ show, onHide, event, action }) => {

const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setSelectedImage(file)

    // Clear the value of the file input
    event.target.value = ''

    const imagePrev = document.getElementById('imagePreview') as HTMLImageElement

    if (imagePrev && file) {
      imagePrev.src = URL.createObjectURL(file)
      imagePrev.style.height = '100%'
      imagePrev.style.borderRadius = '25px'
      imagePrev.style.width = '100%'
    }
  }


  const ModalTitleDiv = {
    display: 'inline-flex',
  }

  const modalStyle = {
    border: 'none', // Add a new border style
    margin: '4%',
    marginBottom: '0',
  }

  const modalSpace = { 
    width: '87%', 
    margin: '1rem auto', 
    borderWidth: '2px', 
    marginTop: '-5px' 
  }


  const [expenses, setExpenses] = useState<Expense[]>([])

  const [newExpenseName, setNewExpenseName] = useState('')
  const [newExpenseAmount, setNewExpenseAmount] = useState('')
  const [expenseIdToModify, setExpenseIdToModify] = useState('')
  const [isModifying, setIsModifying] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState('')

  const totalExpense = calculateTotalExpense(expenses)

  // Add Expense
  const addExpense = () => {


    if (!newExpenseName || !newExpenseAmount) {
      // Prevent adding empty expenses
      return
    }

    const modifiedExpenseIndex = expenses.findIndex(expense => expense.id === expenseIdToModify)

    const imagePrev = document.getElementById('imagePreview') as HTMLImageElement
    if (modifiedExpenseIndex !== -1) {
        // Update the expense with the new data
        const updatedExpenses = [...expenses]
        updatedExpenses[modifiedExpenseIndex] = {
        ...updatedExpenses[modifiedExpenseIndex],
        description: newExpenseName,
        amount: parseFloat(newExpenseAmount.replace(/,/g, '')),// Convert back to a number
        receipt: selectedImage
        }

        // Update the expenses state with the modified expense
        setExpenses(updatedExpenses)
        
    }else{
        let exist = true
        let count = 1

        let amount = newExpenseAmount.replace(/[^0-9.]/g, '') // Allow only digits and dot
        const decimalCount = (amount.match(/\./g) || []).length
        
        // Allow only one dot and limit decimal places to two
        if (decimalCount > 1 || (decimalCount === 1 && amount.split('.')[1].length > 2)) {
            amount = newExpenseAmount
        }
       

        while (exist) {
            const idExists = expenses.filter((expense) => expense.id === `${event.eventId}-${expenses.length + count}`).length > 0

        
            
            if (!idExists) {
                exist = false
            }
        
            const newExpense = {
                id: `${event.eventId}-${expenses.length + count}`,
                description: newExpenseName,
                amount: parseFloat(amount), // Convert amount to integer
                receipt: selectedImage,
            }

            setExpenses([...expenses, newExpense])
            count++
        }
        

    }

    // Clear input fields after adding expense
    setIsModifying(false)
    setNewExpenseName('')
    setNewExpenseAmount('')
    setSelectedImage(null)
    setExpenseIdToModify('')
    

    if (imagePrev) {
        imagePrev.src = require('../assets/images/image.png')
        imagePrev.style.height = '40px'
        imagePrev.style.width = '40px'
    }

    
  }

  // Delete Expense
  const deleteExpense = (id : string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  // Function to handle modification of expense data
  const handleModifyExpense = (expense: Expense) => {
    // Set the expense data back into the form fields for modification
    setIsModifying(true)
    setNewExpenseName(expense.description)
    setNewExpenseAmount(expense.amount.toLocaleString())
    setSelectedImage(expense.receipt)
    setSelectedRowId(expense.id)

    const imagePrev = document.getElementById('imagePreview') as HTMLImageElement
    if (imagePrev && expense.receipt) {
        imagePrev.src = URL.createObjectURL(expense.receipt)
        imagePrev.style.height = '116px'
        imagePrev.style.borderRadius = '25px'
        imagePrev.style.width = '100%'
    }

  
    // You may need to store the ID of the expense being modified for updating later
    setExpenseIdToModify(expense.id)
  }

  const [showImageModal, setShowImageModal] = useState(false)
  const [imageReceiptURL, setImageReceiptURL] = useState<File | null>(null)

  const handleImageClick = ( selectedExpense : File | null) => {
      setShowImageModal(true)
      setImageReceiptURL(selectedExpense)
  }

  const handleCloseImageModal = () => {
      setShowImageModal(false)
  }

  const handleRowClick = (expenseId : string) => {
    setSelectedRowId(expenseId)
  }

  return (
    <div>
    <Modal
      show={show}
      onHide={onHide}
      size='xl'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton style={modalStyle}>
        <Modal.Title id='contained-modal-title-vcenter' className='mx-3' style={ModalTitleDiv}>
          Add Expense
        </Modal.Title>
      </Modal.Header>

      <hr style={modalSpace} />

      <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <Container fluid className='px-5 pb-4'>
            <div style={{ marginBottom: '20px' }}>
              {/* Render the Description of Expense and Upload Receipt sections */}
              <Row style={{ marginBottom: '50px' }}>
                <Col xs={8}>
                  <Form.Group>
                    <Form.Label>Event Title:</Form.Label>
                    <span style={{ fontWeight: 'bold', fontSize: '1.2em', marginLeft: '10px' }}>{event.title}</span>       
                  </Form.Group>
                </Col>
                
                <Col xs={3}>
                  <Form.Label>Estimated Budget:</Form.Label>
                  <span style={{ fontWeight: 'bold', fontSize: '1.2em', marginLeft: '10px' }}>{event.estimatedBudget.toLocaleString()}</span>
                </Col>

              </Row>
              <Row style={{ marginBottom: '50px' }}>
                <Col xs={4}>
                
                    <Form.Group>
                        <Form.Label>Description of Expense:</Form.Label>
                        <Form.Control
                        as='textarea'
                        value={newExpenseName}
                        style={{ backgroundColor: '#DEDEDE', height: '116px', borderRadius: '25px', resize:'none'}}
                        onChange={(e) => setNewExpenseName(e.target.value)}
                        />
                    </Form.Group>

                </Col>
                <Col xs={4}>
                    <Form.Group className='mb-3'>
                    <Form.Label>Upload Receipt</Form.Label>
                    <Form.Control
                        id='imageInput'
                        required
                        type='file'
                        defaultValue=''
                        style={{ backgroundColor: '#DEDEDE', height: '116px', display: 'none' }}
                        onChange={handleImageSelect}
                        />
                        <br />
                        <label
                            style={{
                            height: '116px',
                            backgroundColor: '#DEDEDE',
                            borderRadius: '25px',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            }}
                            htmlFor='imageInput'
                        >
                            <img
                            id='imagePreview'
                            src={require('../assets/images/image.png')}
                            style={{ width: '40px', height: '40px' }}
                            />
                        </label>
                    </Form.Group>
                </Col>
                <Col xs={4}>
                    <Form.Group>
                        <Form.Label>Amount:</Form.Label>
                        <Form.Control
                        required
                        type="text"
                        step="0.01"
                        value={newExpenseAmount}
                        style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                        onChange={(e) => {
                        
                            let amount = e.target.value.replace(/[^0-9.]/g, '') // Allow only digits and dot
                            const decimalCount = (amount.match(/\./g) || []).length
                            
                            // Allow only one dot and limit decimal places to two
                            if (decimalCount > 1 || (decimalCount === 1 && amount.split('.')[1].length > 2)) {
                                amount = newExpenseAmount
                            }

                            setNewExpenseAmount(amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')) // Add commas
                        }}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-center align-items-center py-3" >
                      {isModifying ?
                          <Button variant='success'  style={{width: '100px'}} onClick={addExpense}>Save</Button>
                      :
                          <Button variant='success'  style={{width: '100px'}} onClick={addExpense}>Add</Button>
                      }
                      
                    </div>
                </Col>
              </Row>
            </div> 
          </Container> 
          <div className='px-5 pb-4'  style={{ maxHeight: 'calc(63vh - 350px)', overflowY: 'auto' }}>
                  {expenses.length > 0 ? 
                    ( expenses.length > 5 ? 
                        <table style={{ width: '100%', tableLayout: 'fixed' }}>
                            <colgroup>
                                <col style={{ width: '20%' }} /> {/* Expense ID */}
                                <col style={{ width: '20%' }} /> {/* Description of Expense */}
                                <col style={{ width: '20%' }} /> {/* Receipt */}
                                <col style={{ width: '20%' }} /> {/* Amount */}
                                <col style={{ width: '25%' }} /> {/* Action */}
                            </colgroup>
                            <thead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#fff' }}>
                            <tr style={{ borderBottom: '1px solid #ccc' }}>
                                <th style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>Expense ID</th>
                                <th style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>Description of Expense</th>
                                <th style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>Receipt</th>
                                <th style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>Amount</th>
                                <th style={{ textAlign: 'center', whiteSpace: 'nowrap' }}></th>
                            </tr>
                            </thead>
                            <tbody>
                            {expenses.map((expense) => (
                                <tr key={expense.id} style={{borderBottom: '1px solid #ccc',backgroundColor : selectedRowId === expense.id ? 'lightgray' : 'inherit'}}  onClick={() => handleRowClick(expense.id)}>
                                <td style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>{expense.id}</td>
                                <td style={{ textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{expense.description}</td>
                                <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                                    {/* Display image if imageUrl is available */}
                                    {expense.receipt ? (
                                        <img
                                            src={URL.createObjectURL(expense.receipt)}
                                            alt='Expense Receipt'
                                            style={{ width: '50px', height: '50px' }}
                                            onClick={() => handleImageClick(expense.receipt)} // Add click event handler
                                        />
                                    ) : (
                                        // Display placeholder if imageUrl is not available
                                        <span>No Receipt</span>
                                    )}
                                </td>
                                <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>{expense.amount.toLocaleString()}</td>
                                <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                                  <Button variant='warning' className='px-4' onClick={() => handleModifyExpense(expense)}>Modify</Button>
                                  &nbsp;
                                  <Button variant='danger' className='px-4' onClick={() => deleteExpense(expense.id)}>Delete</Button>
                                </td> {/* Delete button for each row */}
                              </tr>
                            ))}
                            </tbody>
                        </table>
                    : <table style={{ width: '100%', tableLayout: 'fixed' }}>
                    <colgroup>
                        <col style={{ width: '20%' }} /> {/* Expense ID */}
                        <col style={{ width: '20%' }} /> {/* Description of Expense */}
                        <col style={{ width: '20%' }} /> {/* Receipt */}
                        <col style={{ width: '20%' }} /> {/* Amount */}
                        <col style={{ width: '25%' }} /> {/* Action */}
                    </colgroup>
                    <thead>
                    <tr style={{ borderBottom: '1px solid #ccc' }}>
                        <th style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>Expense ID</th>
                        <th style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>Description of Expense</th>
                        <th style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>Receipt</th>
                        <th style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>Amount</th>
                        <th style={{ textAlign: 'center', whiteSpace: 'nowrap' }}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id} style={{borderBottom: '1px solid #ccc',backgroundColor : selectedRowId === expense.id ? 'lightgray' : 'inherit'}}  onClick={() => handleRowClick(expense.id)}>
                        <td style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>{expense.id}</td>
                        <td style={{ textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{expense.description}</td>
                        <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                            {/* Display image if imageUrl is available */}
                            {expense.receipt ? (
                                <img
                                    src={URL.createObjectURL(expense.receipt)}
                                    alt='Expense Receipt'
                                    style={{ width: '50px', height: '50px' }}
                                    onClick={() => handleImageClick(expense.receipt)} // Add click event handler
                                />
                            ) : (
                                // Display placeholder if imageUrl is not available
                                <span>No Receipt</span>
                            )}
                        </td>
                        <td style={{ textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{expense.amount.toLocaleString()}</td>
                        <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                          <Button variant='warning' className='px-4' onClick={() => handleModifyExpense(expense)}>Modify</Button>
                          &nbsp;
                          <Button variant='danger' className='px-4' onClick={() => deleteExpense(expense.id)}>Delete</Button>
                        </td> {/* Delete button for each row */}
                      </tr>
                    ))}
                    </tbody>
                </table>
                    ) : (<div className="table-responsive"></div>)
                  }
            </div>
            <Row>
              {expenses.length > 0 ?
                <Col xs={8}>
                      <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '20px', marginLeft: '46px' }}>Total Expense Amount: {totalExpense.toLocaleString()}</div>
                </Col> :
                <Col xs={8}>
                      <div></div>
                </Col>  
              }   
              <Col xs={4} style={{ display: 'flex', alignItems: 'right', justifyContent: 'right', height: '50px', paddingRight: '76px', paddingBottom: '10px' }}>
                <Button variant='success' className='px-4'>
                
                        Submit
              </Button>
              </Col>
            </Row>
      </Modal.Body>
      </Modal>
    {showImageModal && (
          <ImageModal
            show={showImageModal}
            onHide={handleCloseImageModal}
            title = 'Expense Receipt'
            imageUrl={imageReceiptURL}
            action={action}
          />)}
    </div>
  )
}

export default ExpenseModal
