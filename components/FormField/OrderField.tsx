import React from 'react'

type OrderProps = {
  orderLength: number
  orderNumber: number
}

const OrderField: React.FC<OrderProps> = ({ orderNumber, orderLength }) => {
  return (
    <p className='mt-2 text-xs text-right text-gray-500'>{`問${orderNumber + 1}/${orderLength}`}</p>
  )
}

export default OrderField
