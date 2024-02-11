
import { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ExpenseForm from './ExpenseForm';
import './listrow.css'; // Import the external CSS file

export default function ListRow({ expense }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="list-row" style={{margin:'8px'}}>
      {isEditing ? (
        <ExpenseForm expense={expense} setIsEditing={setIsEditing} />
      ) : (
        <div className="expense-details">
          <Row>
            <Col className="expense-description">
              {expense?.description}
              <div>
                <small>
                  <i  style={{fontSize:'10px'}}>{new Date(expense?.createdAt).toLocaleString()}</i>
                </small>
              </div>
            </Col>
            <Col className="expense-amount">
              €{expense?.amount.toFixed(2)}
            </Col>
            <Col>
              <Button
                variant="outline-primary"
                onClick={() => setIsEditing(!isEditing)}
                className="expense-buttons"
              >
                Edit
              </Button>
            </Col>
          </Row>
          <hr className="expense-divider" />
        </div>
      )}
    </div>
  );
}

ListRow.propTypes = {
  expense: PropTypes.shape({
    description: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};


