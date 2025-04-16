import { motion } from 'framer-motion';
import Rat from './Rat';

interface LogEntry {
  date: string;
  duration: number;
  completed: boolean;
}

// Mock data - in a real app, this would come from localStorage or a backend
const mockLogs: LogEntry[] = [
  { date: '2024-02-20 14:30', duration: 45, completed: true },
  { date: '2024-02-20 13:00', duration: 45, completed: true },
  { date: '2024-02-20 11:15', duration: 30, completed: false },
  { date: '2024-02-19 16:45', duration: 45, completed: true },
  { date: '2024-02-19 15:00', duration: 45, completed: true },
];

const PomoLog = () => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-blue-100 to-purple-100">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">
            Pomo Log 📝
          </h1>
          <div className="scale-75">
            <Rat />
          </div>
        </div>

        <div className="space-y-4">
          {mockLogs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${log.completed ? 'bg-green-500' : 'bg-red-500'}`} />
                <div>
                  <p className="text-gray-600">{formatDate(log.date)}</p>
                  <p className="text-sm text-gray-500">{log.duration} minutes</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {log.completed ? (
                  <span className="text-green-500 text-sm font-medium">Completed</span>
                ) : (
                  <span className="text-red-500 text-sm font-medium">Interrupted</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>Total Completed Sessions: {mockLogs.filter(log => log.completed).length}</p>
          <p>Total Focus Time: {mockLogs.reduce((acc, log) => acc + (log.completed ? log.duration : 0), 0)} minutes</p>
        </div>
      </div>
    </div>
  );
};

export default PomoLog; 