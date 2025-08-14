import React, { useState, useEffect } from 'react';
import { X, Calendar, ChevronDown } from 'lucide-react';
import { FormInput, FormSelect, Modal } from './ReusableComponents';
import usePaymentStatus from '../hooks/usePaymentStatus';

const PaymentDetails = ({ isOpen, onClose, employeeId }) => {
  const [paymentMonth, setPaymentMonth] = useState('June-2025');
  const [paymentDate, setPaymentDate] = useState('24-Jun-2025');
  const [transactionRef, setTransactionRef] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  // Payment status hook - fetch when modal opens
  const { data: paymentData, loading: paymentLoading, error: paymentError, fetchPaymentStatus } = usePaymentStatus({
    mempid: employeeId,
    year: '2025',
    startmonth: 'Jan',
    endmonth: 'Dec',
    autoFetch: false
  });

  // Fetch payment status when modal opens and employeeId is available
  useEffect(() => {
    if (isOpen && employeeId) {
      fetchPaymentStatus();
    }
  }, [isOpen, employeeId, fetchPaymentStatus]);

  // Update payment status based on API response
  useEffect(() => {
    if (paymentData && paymentData.length > 0) {
      // Check if any payment record exists for the current period
      const hasPayment = paymentData.some(payment => 
        payment.paymentStatus === 'Paid' || payment.status === 'Completed'
      );
      setIsPaid(hasPayment);
    } else {
      setIsPaid(false);
    }
  }, [paymentData]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Payment Details" size="large">
      {/* Loading State */}
      {paymentLoading && (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          color: '#1976d2',
          fontSize: '14px'
        }}>
          Checking payment status...
        </div>
      )}

      {/* Error State */}
      {paymentError && (
        <div style={{ 
          padding: '15px', 
          margin: '10px 0', 
          backgroundColor: '#ffebee', 
          border: '1px solid #f44336', 
          borderRadius: '4px',
          color: '#c62828',
          fontSize: '14px'
        }}>
          Error checking payment status: {paymentError}
        </div>
      )}

      {/* Payment Status Indicator */}
      {!paymentLoading && (
        <div style={{ 
          padding: '15px', 
          margin: '0 0 20px 0', 
          backgroundColor: isPaid ? '#e8f5e8' : '#fff3cd', 
          border: `1px solid ${isPaid ? '#4caf50' : '#ffc107'}`, 
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          <div style={{ 
            fontWeight: 'bold', 
            marginBottom: '5px', 
            color: isPaid ? '#2e7d32' : '#f57c00'
          }}>
            {isPaid ? '✅ Payment Status: PAID' : '⚠️ Payment Status: PENDING'}
          </div>
          <div style={{ color: isPaid ? '#2e7d32' : '#f57c00' }}>
            {isPaid 
              ? 'Payment has been completed for this employee.' 
              : 'Payment is pending. Please complete the payment process.'
            }
          </div>
        </div>
      )}

      {/* Form Fields - Show only if payment is NOT done */}
      {!isPaid && (
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
      )}

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
              <img src="/pdf.png" alt="PDF" style={{ width: 18, height: 18 }} />
              Bank Details & Guidelines
            </button>
            <button 
              aria-label="Payment History" 
              title="Payment History"
              style={{
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
              }}
            >
              <img src="/PAY.png" alt="Payment History" style={{ width: 18, height: 18 }} />
              Payment History
            </button>
          </div>
          <button 
            disabled={isPaid}
            style={{
              backgroundColor: isPaid ? '#cccccc' : '#42a5f5',
              color: isPaid ? '#666666' : 'white',
              border: 'none',
              padding: '12px 32px',
              borderRadius: 6,
              fontSize: 15,
              fontWeight: 600,
              cursor: isPaid ? 'not-allowed' : 'pointer',
              minWidth: '100px',
              opacity: isPaid ? 0.6 : 1
            }}
          >
            {isPaid ? 'Payment Completed' : 'Submit'}
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