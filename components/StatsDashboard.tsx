import React, { useMemo } from 'react';
import { UserStats } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface Props {
  stats: UserStats;
  totalQuestionsInPool: number;
}

const StatsDashboard: React.FC<Props> = ({ stats, totalQuestionsInPool }) => {
  const data = useMemo(() => {
    let correct = 0;
    let incorrect = 0;
    let untouched = totalQuestionsInPool;

    const values = Object.values(stats) as Array<UserStats[string]>;

    values.forEach(s => {
      // Consider a question "mastered" if the last attempt was correct
      if (s.lastResult === 'correct') {
        correct++;
        untouched--;
      } else if (s.lastResult === 'incorrect') {
        incorrect++;
        untouched--;
      }
    });
    // Fix negative untouched if stats persist beyond pool changes (edge case)
    untouched = Math.max(0, untouched);

    return [
      { name: '正解', value: correct, color: '#22c55e' }, // green-500
      { name: '不正解', value: incorrect, color: '#ef4444' }, // red-500
      { name: '未回答', value: untouched, color: '#94a3b8' }, // slate-400
    ];
  }, [stats, totalQuestionsInPool]);

  const accuracy = useMemo(() => {
    const values = Object.values(stats) as Array<UserStats[string]>;
    const attempted = values.reduce((acc, curr) => acc + curr.attempts, 0);
    const totalCorrect = values.reduce((acc, curr) => acc + curr.correct, 0);
    return attempted === 0 ? 0 : Math.round((totalCorrect / attempted) * 100);
  }, [stats]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-6">
      <h2 className="text-lg font-bold text-slate-800 mb-4">学習ステータス</h2>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-1/2 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-500">総合正答率</p>
            <p className="text-3xl font-bold text-blue-600">{accuracy}%</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
             <p className="text-sm text-slate-500">回答数</p>
             <p className="text-3xl font-bold text-slate-700">{Object.keys(stats).length} <span className="text-base font-normal text-slate-400">/ {totalQuestionsInPool}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;