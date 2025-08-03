import React, { useState } from 'react';
import { X, Calendar, ChevronDown, FileText, CreditCard } from 'lucide-react';
import { FormInput, FormSelect, Modal } from './ReusableComponents';

const PaymentDetails = ({ isOpen, onClose }) => {
  const [paymentMonth, setPaymentMonth] = useState('June-2025');
  const [paymentDate, setPaymentDate] = useState('24-Jun-2025');
  const [transactionRef, setTransactionRef] = useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Payment Details" size="large">
      {/* Form Fields */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 50 }}>
          {/* Payment Month */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <FormSelect
              label="Payment for the Month"
              value={paymentMonth}
              onChange={(e) => setPaymentMonth(e.target.value)}
              options={['June-2025', 'July-2025', 'August-2025']}
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: '#1a1a1a',
                marginBottom: 8
              }}
            />
          </div>

          {/* Payment Date */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <FormInput
              label="Date of Payment"
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              required={true}
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: '#1a1a1a',
                marginBottom: 8
              }}
            />
          </div>

          {/* Transaction Reference */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <FormInput
              label="Transaction Reference No"
              type="text"
              value={transactionRef}
              onChange={(e) => setTransactionRef(e.target.value)}
              placeholder="XXX-XXXX-XXXX-XX-XXXX"
              required={true}
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: '#1a1a1a',
                marginBottom: 8
              }}
            />
          </div>
        </div>
      </div>

        {/* Action Links and Submit */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
          padding: '0 16px'
        }}>
          <div style={{ display: 'flex', gap: 32 }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'transparent',
              border: 'none',
              color: '#000000',
              cursor: 'pointer',
              fontSize: 15,
              fontWeight: 600,
              padding: '8px 0'
            }}>
              <FileText size={16} color="#f44336" />
              Bank Details & Guidelines
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'transparent',
              border: 'none',
              color: '#000000',
              cursor: 'pointer',
              fontSize: 15,
              fontWeight: 600,
              padding: '8px 0'
            }}>
              <CreditCard size={16} color="#8B5CF6" />
              Payment History
            </button>
          </div>
          <button style={{
            backgroundColor: '#42a5f5',
            color: 'white',
            border: 'none',
            padding: '12px 32px',
            borderRadius: 6,
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            minWidth: '100px'
          }}>
            Submit
          </button>
        </div>

        {/* Payment History Table */}
        <div>
          <h3 style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#1a1a1a',
            marginBottom: 16,
            letterSpacing: 0.1
          }}>
            Payment History
          </h3>
          <div style={{
            border: '1px solid #ddd',
            borderRadius: 6,
            overflow: 'hidden'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#333',
                    borderBottom: '1px solid #ddd'
                  }}>
                    Name
                  </th>
                  <th style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#333',
                    borderBottom: '1px solid #ddd'
                  }}>
                    Month
                  </th>
                  <th style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#333',
                    borderBottom: '1px solid #ddd'
                  }}>
                    Payment Date
                  </th>
                  <th style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#333',
                    borderBottom: '1px solid #ddd'
                  }}>
                    Reference Number
                  </th>
                  <th style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#333',
                    borderBottom: '1px solid #ddd'
                  }}>
                    Submitted Date
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{
                    padding: '12px 16px',
                    fontSize: 14,
                    color: '#333',
                    borderBottom: '1px solid #eee'
                  }}>
                    Murali
                  </td>
                  <td style={{
                    padding: '12px 16px',
                    fontSize: 14,
                    color: '#333',
                    borderBottom: '1px solid #eee'
                  }}>
                    June 2025
                  </td>
                  <td style={{
                    padding: '12px 16px',
                    fontSize: 14,
                    color: '#333',
                    borderBottom: '1px solid #eee'
                  }}>
                    24-Jun-2025
                  </td>
                  <td style={{
                    padding: '12px 16px',
                    fontSize: 14,
                    color: '#333',
                    borderBottom: '1px solid #eee'
                  }}>
                    23425252523525
                  </td>
                  <td style={{
                    padding: '12px 16px',
                    fontSize: 14,
                    color: '#333',
                    borderBottom: '1px solid #eee'
                  }}>
                    24-Jun-2025
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </Modal>
  );
};

export default PaymentDetails; 