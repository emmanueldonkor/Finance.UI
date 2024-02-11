import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { DeleteExpense, EditExpense, NewExpense } from '../../services/expenses';
import { useDispatch } from 'react-redux';
import "./expenseform.css"

export default function ExpenseForm({ expense, setIsEditing }) {
  const descriptions = ['Groceries', 'Credit Card', 'Student Loans', 'Eating out', 'Accomodation','Other'];
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState(descriptions[0]);
  const [isNewExpense, setIsNewExpense] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (expense !== undefined) {
      setIsNewExpense(false);
      setAmount(expense?.amount);
    } else {
      setIsNewExpense(true);
    }
  }, [expense]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isNewExpense) {
      NewExpense(dispatch, { description, amount: Number(amount) });
    } else {
      EditExpense(dispatch, {
        id: expense.id,
        description,
        amount: Number(amount),
      });
      setIsEditing(false);
    }
  };

  return (
    <div className="expense-form" style={{ overflow: 'hidden' }}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="select"
              onChange={(event) => setDescription(event.target.value)}
            >
              {descriptions.map((des) => (
                <option key={des}>{des}</option>
              ))}
            </Form.Control>
          </Col>
          <Col>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </Col>
          <Col className="d-flex align-items-end">
            {isNewExpense ? (
              <Button className="btn" variant="primary" type="submit">
                Add
              </Button>
            ) : (
              <>
                <Button
                  className="me-2"
                  variant="danger"
                  onClick={() => DeleteExpense(dispatch, expense)}
                >
                  Delete
                </Button>
                <Button className="me-2 btn" variant="success" type="submit">
                  Save
                </Button>
                <Button
                  className="btn"
                  variant="secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}

ExpenseForm.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }),
  setIsEditing: PropTypes.func.isRequired,
};


