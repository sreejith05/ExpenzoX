import React from 'react'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart} from "recharts";
const CustomLineChart = ({ data }) => {
    const CustomTooltip =({ active, payload}) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
            <p className="text-xs font-semibold text-purple-800 mb-1">{payload[0].payload.category}</p>
            <p className="text-sm text-gray-600">
                Amount: <span className="text-sm font-medium text-gray-900">₹{payload[0].payload.amount}</span>
            </p>
        </div>
     );    
    }
    return null;
    };
    return <div className="bg-white">
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2D1155" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#4C1D95" stopOpacity={0.08} />
                </linearGradient>
                </defs>

                <CartesianGrid stroke="none" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555"}} stroke="none" />
                <YAxis tick={{ fontSize:12, fill:"#555" }} stroke="none" />
                <Tooltip content={<CustomTooltip />} />

                <Area type="monotone" dataKey="amount" stroke="#2D1155" fill="url(#incomeGradient)" strokeWidth={3} dot={{ r: 3, fill: "#4C1D95"  }} />
            </AreaChart>
        </ResponsiveContainer>

    </div>
  
}

export default CustomLineChart