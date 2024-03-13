import React, { ChangeEvent, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import ImageModal from '../ImageModal'

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
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [newExpenseName, setNewExpenseName] = useState('')
  const [newExpenseAmount, setNewExpenseAmount] = useState('')
  const [expenseIdToModify, setExpenseIdToModify] = useState('')
  const [isModifying, setIsModifying] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState('')
  const totalExpense = calculateTotalExpense(expenses)
  const [showImageModal, setShowImageModal] = useState(false)
  const [imageReceiptURL, setImageReceiptURL] = useState<File | null>(null)
  // Error Message
  const [descriptionError, setDescriptionError] = useState('')
	const [receiptError, setReceiptError] = useState('')
	const [amountError, setAmountError] = useState('')

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

  // Add Expense
  const addExpense = () => {

    setDescriptionError('')
    setReceiptError('')
    setAmountError('')

    let hasError = false

    if (!newExpenseName ) {
      setDescriptionError('Receipt description is required.')
			hasError = true
    }

    if (!selectedImage) {
      setReceiptError('Receipt is required.')
			hasError = true
    }
    
    if (!newExpenseAmount) {
      setAmountError('Amount is required.')
			hasError = true
    }

    if (hasError) {
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
        imagePrev.src = require('../../assets/images/image.png')
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
      <Modal.Header closeButton className='modal-style'>
        <Modal.Title id='contained-modal-title-vcenter' className='mx-3 modal-title-style'>
          Add Expense
        </Modal.Title>
      </Modal.Header>

      <hr className='modal-space'/>

      <Modal.Body className='modal-body-style'>
          <Container fluid className='px-5 pb-4'>
            <div className='mb-20'>
              {/* Render the Description of Expense and Upload Receipt sections */}
              <Row className='mb-50'>
                <Col xs={8}>
                  <Form.Group>
                    <Form.Label>Event Title:</Form.Label>
                    <span className='event-header-style'>{event.title}</span>       
                  </Form.Group>
                </Col>
                
                <Col xs={3}>
                  <Form.Label>Estimated Budget:</Form.Label>
                  <span className='event-header-style'>{event.estimatedBudget.toLocaleString()}</span>
                </Col>

              </Row>
              <Row className='mb-50'>
                <Col xs={4}>
                
                    <Form.Group>
                        <Form.Label>Description of Expense:</Form.Label>
                        <Form.Control
                        required
                        as='textarea'
                        value={newExpenseName}
                        className='desc-of-expense'
                        name='descriptionExpense'
                        onChange={(e) => setNewExpenseName(e.target.value)}
                        />
                        {descriptionError && <div className="text-danger">{descriptionError}</div>}
                    </Form.Group>

                </Col>
                <Col xs={4}>
                    <Form.Group className='mb-3'>
                    <Form.Label>Upload Receipt</Form.Label>
                    <Form.Control
                        required
                        id='imageInput'
                        type='file'
                        defaultValue=''
                        className='upload-receipt'
                        name='uploadReceipt'
                        onChange={handleImageSelect}
                        />
                        <br />
                        <label
                            className='upload-receipt-label'
                            htmlFor='imageInput'
                        >
                            <img
                            id='imagePreview'
                            src={require('../../assets/images/image.png')}
                            className='image-prev-style'
                            />
                        </label>
                        {receiptError && <div className="text-danger">{receiptError}</div>}
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
                        className='amount'
                        name='amount'
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
                        {amountError && <div className="text-danger">{amountError}</div>}
                    </Form.Group>
                    <div className="d-flex justify-content-center align-items-center py-3" >
                      {isModifying ?
                          <Button variant='success'  className='save-width' onClick={addExpense}>Save</Button>
                      :
                          <Button variant='success'  className='save-width' onClick={addExpense}>Add</Button>
                      }
                      
                    </div>
                </Col>
              </Row>
            </div> 
          </Container> 
          <div className='px-5 pb-4 table-container'>
                  {expenses.length > 0 ? 
                    ( expenses.length > 5 ? 
                        <table className='table-style'>
                            <colgroup>
                              <col className='width-20' /> {/* Expense ID */}
                              <col className='width-20' /> {/* Description of Expense */}
                              <col className='width-20' /> {/* Receipt */}
                              <col className='width-20' /> {/* Amount */}
                              <col className='width-25' /> {/* Action */}
                            </colgroup>
                            <thead className='table-head-style'>
                            <tr className='table-head-row-style'>
                                <th className='th-left'>Expense ID</th>
                                <th className='th-left'>Description of Expense</th>
                                <th className='th-center'>Receipt</th>
                                <th className='th-center'>Amount</th>
                                <th className='th-center'></th>
                            </tr>
                            </thead>
                            <tbody>
                            {expenses.map((expense) => (
                                <tr key={expense.id} className={selectedRowId === expense.id ? 'row-clicked-lightgray' : 'row-clicked-inherit'}  onClick={() => handleRowClick(expense.id)}>
                                <td className='th-left'>{expense.id}</td>
                                <td className='expense-description'>{expense.description}</td>
                                <td className='th-center'>
                                    {/* Display image if imageUrl is available */}
                                    {expense.receipt ? (
                                        <img
                                            src={URL.createObjectURL(expense.receipt)}
                                            alt='Expense Receipt'
                                            className='expense-receipt'
                                            onClick={() => handleImageClick(expense.receipt)} // Add click event handler
                                        />
                                    ) : (
                                        // Display placeholder if imageUrl is not available
                                        <span>No Receipt</span>
                                    )}
                                </td>
                                <td className='expense-amount'>{expense.amount.toLocaleString()}</td>
                                <td className='th-center'>
                                  <Button variant='warning' className='px-4' onClick={() => handleModifyExpense(expense)}>Modify</Button>
                                  &nbsp;
                                  <Button variant='danger' className='px-4' onClick={() => deleteExpense(expense.id)}>Delete</Button>
                                </td> {/* Delete button for each row */}
                              </tr>
                            ))}
                            </tbody>
                        </table>
                    : <table className='table-style'>
                    <colgroup>
                        <col className='width-20' /> {/* Expense ID */}
                        <col className='width-20' /> {/* Description of Expense */}
                        <col className='width-20' /> {/* Receipt */}
                        <col className='width-20' /> {/* Amount */}
                        <col className='width-25' /> {/* Action */}
                    </colgroup>
                    <thead className='table-head-style'>
                    <tr className='table-head-row-style'>
                        <th className='th-left'>Expense ID</th>
                        <th className='th-left'>Description of Expense</th>
                        <th className='th-center'>Receipt</th>
                        <th className='th-center'>Amount</th>
                        <th className='th-center'></th>
                    </tr>
                    </thead>
                    <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id} className={selectedRowId === expense.id ? 'row-clicked-lightgray' : 'row-clicked-inherit'}  onClick={() => handleRowClick(expense.id)}>
                        <td className='th-left'>{expense.id}</td>
                        <td className='expense-description'>{expense.description}</td>
                        <td className='th-center'>
                            {/* Display image if imageUrl is available */}
                            {expense.receipt ? (
                                <img
                                    src={URL.createObjectURL(expense.receipt)}
                                    alt='Expense Receipt'
                                    className='expense-receipt'
                                    onClick={() => handleImageClick(expense.receipt)} // Add click event handler
                                />
                            ) : (
                                // Display placeholder if imageUrl is not available
                                <span>No Receipt</span>
                            )}
                        </td>
                        <td className='expense-amount'>{expense.amount.toLocaleString()}</td>
                        <td className='th-center'>
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
                      <div className='total-amount'>Total Expense Amount: {totalExpense.toLocaleString()}</div>
                </Col> :
                <Col xs={8}>
                      <div></div>
                </Col>  
              }   
              <Col xs={4} className='submit-button'>
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
