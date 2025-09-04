// Export utilities for CSV and PDF generation

export function downloadCSV(data: any[], filename: string) {
  if (data.length === 0) {
    throw new Error('No data to export')
  }

  // Get headers from the first object
  const headers = Object.keys(data[0])
  
  // Convert data to CSV format
  const csvContent = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        const value = row[header]
        // Handle null/undefined values
        if (value === null || value === undefined) {
          return ''
        }
        // Escape commas and quotes
        const stringValue = String(value)
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`
        }
        return stringValue
      }).join(',')
    )
  ].join('\n')

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Export rooms data
export function exportRoomsCSV(rooms: any[]) {
  const exportData = rooms.map(room => ({
    'Room Number': room.roomNumber,
    'Type': room.type,
    'Capacity': room.capacity,
    'Current Occupancy': room.currentOccupancy,
    'Floor': room.floor,
    'Block': room.block,
    'Monthly Rent': room.monthlyRent,
    'Status': room.status,
    'Amenities': Array.isArray(room.amenities) ? room.amenities.join('; ') : room.amenities,
    'Created Date': new Date(room.createdAt).toLocaleDateString()
  }))

  downloadCSV(exportData, 'rooms-export')
}

// Export bookings data
export function exportBookingsCSV(bookings: any[]) {
  const exportData = bookings.map(booking => ({
    'Booking ID': booking.id,
    'Student Name': booking.user?.name || 'N/A',
    'Student ID': booking.user?.studentId || 'N/A',
    'Room Number': booking.room?.roomNumber || 'N/A',
    'Status': booking.status,
    'Start Date': new Date(booking.startDate).toLocaleDateString(),
    'End Date': booking.endDate ? new Date(booking.endDate).toLocaleDateString() : 'Ongoing',
    'Monthly Rent': booking.monthlyRent,
    'Security Deposit': booking.securityDeposit || 0,
    'Created Date': new Date(booking.createdAt).toLocaleDateString()
  }))

  downloadCSV(exportData, 'bookings-export')
}

// Export payments data
export function exportPaymentsCSV(payments: any[]) {
  const exportData = payments.map(payment => ({
    'Payment ID': payment.id,
    'Student Name': payment.user?.name || 'N/A',
    'Student ID': payment.user?.studentId || 'N/A',
    'Amount': payment.amount,
    'Type': payment.type,
    'Status': payment.status,
    'Due Date': new Date(payment.dueDate).toLocaleDateString(),
    'Paid Date': payment.paidDate ? new Date(payment.paidDate).toLocaleDateString() : 'N/A',
    'Payment Method': payment.method || 'N/A',
    'Reference': payment.reference || 'N/A',
    'Description': payment.description || 'N/A'
  }))

  downloadCSV(exportData, 'payments-export')
}

// Export students data
export function exportStudentsCSV(students: any[]) {
  const exportData = students.map(student => ({
    'Student ID': student.studentId || 'N/A',
    'Name': student.name,
    'Email': student.email,
    'Phone': student.phone || 'N/A',
    'Room Number': student.roomNumber || 'Not Assigned',
    'Course': student.course || 'N/A',
    'Year': student.year || 'N/A',
    'Guardian Name': student.guardianName || 'N/A',
    'Guardian Phone': student.guardianPhone || 'N/A',
    'Emergency Contact': student.emergencyContact || 'N/A',
    'Registration Date': new Date(student.createdAt).toLocaleDateString()
  }))

  downloadCSV(exportData, 'students-export')
}

// Utility to format data for reports
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Generate monthly report data
export function generateMonthlyReport(payments: any[], month: number, year: number) {
  const monthPayments = payments.filter(payment => {
    const paymentDate = new Date(payment.paidDate || payment.dueDate)
    return paymentDate.getMonth() === month && paymentDate.getFullYear() === year
  })

  const totalCollected = monthPayments
    .filter(p => p.status === 'PAID')
    .reduce((sum, p) => sum + p.amount, 0)

  const totalPending = monthPayments
    .filter(p => p.status === 'PENDING')
    .reduce((sum, p) => sum + p.amount, 0)

  const totalOverdue = monthPayments
    .filter(p => p.status === 'OVERDUE')
    .reduce((sum, p) => sum + p.amount, 0)

  return {
    month: new Date(year, month).toLocaleString('en-IN', { month: 'long', year: 'numeric' }),
    totalPayments: monthPayments.length,
    totalCollected,
    totalPending,
    totalOverdue,
    collectionRate: monthPayments.length > 0 ? (monthPayments.filter(p => p.status === 'PAID').length / monthPayments.length * 100).toFixed(1) + '%' : '0%'
  }
}

// Print functionality
export function printReport(title: string, content: string) {
  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            line-height: 1.6;
          }
          h1 { 
            color: #333; 
            border-bottom: 2px solid #333; 
            padding-bottom: 10px;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0;
          }
          th, td { 
            border: 1px solid #ddd; 
            padding: 8px; 
            text-align: left;
          }
          th { 
            background-color: #f2f2f2; 
            font-weight: bold;
          }
          @media print {
            body { margin: 0; }
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <p>Generated on: ${new Date().toLocaleString()}</p>
        ${content}
      </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }
}
