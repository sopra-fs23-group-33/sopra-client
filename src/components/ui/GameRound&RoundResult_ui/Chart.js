import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


const RenderLineChart = ({data}) => (
    <div style={{ width: '100%', height: 450 }}>
            <ResponsiveContainer>
                    <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="date" tick={{ fill: "#ffffff" }} />
                        <YAxis type="number" domain={['dataMin - 0.1', 'dataMax + 0.1']} tick={{ fill: "#ffffff" }}/>
                        <Tooltip contentStyle={{backgroundColor: "#2e2954"}}/>
                    </LineChart>
            </ResponsiveContainer>
    </div>
);

export default RenderLineChart;