import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


const RenderLineChart = ({data}) => (
    <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
            <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#363062"
                    dot={false}
                />
                <CartesianGrid
                    stroke="rgba(255,255,255,0.25)"
                    strokeDasharray="5 5"
                    vertical={true}
                    horizontal={false}
                />
                <XAxis
                    dataKey="date"
                    tick={ {fill: "#ffffff", fontSize: 14 }}
                    minTickGap={20}
                    axisLine={{ stroke: "#ffffff" }}
                />
                <YAxis
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    tick={{ fill: "#ffffff", fontSize: 14}}
                    axisLine={{ stroke: "#ffffff" }}
                    tickFormatter={(tickValue) => {
                        return tickValue.toFixed(4);
                    }}
                />
                <Tooltip contentStyle={{ backgroundColor: "#6f65ab" }}/>
            </LineChart>
        </ResponsiveContainer>
    </div>
);

export default RenderLineChart;
