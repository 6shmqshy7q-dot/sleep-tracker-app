 EOF

   cat << 'CONTENT'
   "use client";

   import { useState } from "react";

   interface SleepRecord {
     id: number;
     userId: number;
     sleepTime: string;
     wakeTime: string;
     sleepQuality: string;
     duration: number;
     notes?: string;
     createdAt: string;
   }

   export default function SleepRecordDemo() {
     const [isLoggedIn, setIsLoggedIn] = useState(false);
     const [user, setUser] = useState<any>(null);
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [username, setUsername] = useState("");
     const [isRegistering, setIsRegistering] = useState(false);
     const [message, setMessage] = useState("");

     const [sleepTime, setSleepTime] = useState("");
     const [wakeTime, setWakeTime] = useState("");
     const [sleepQuality, setSleepQuality] = useState("好");
     const [notes, setNotes] = useState("");
     const [records, setRecords] = useState<SleepRecord[]>([
       {
         id: 1,
         userId: 1,
         sleepTime: "2026-01-04T22:00:00",
         wakeTime: "2026-01-05T06:00:00",
         sleepQuality: "好",
         duration: 480,
         notes: "昨晚睡得很好",
         createdAt: "2026-01-05T07:00:00"
       }
     ]);

     const handleLogin = async () => {
       setMessage("正在登录...");
       setTimeout(() => {
         setIsLoggedIn(true);
         setUser({ id: 1, email, username });
         setMessage("登录成功！");
       }, 500);
     };

     const handleRegister = async () => {
       setMessage("正在注册...");
       setTimeout(() => {
         setIsLoggedIn(true);
         setUser({ id: Date.now(), email, username });
         setMessage("注册成功！");
       }, 500);
     };

     const handleSubmitRecord = async () => {
       if (!sleepTime || !wakeTime) {
         setMessage("请填写完整信息");
         return;
       }

       const duration = Math.floor(
         (new Date(wakeTime).getTime() - new Date(sleepTime).getTime()) / 1000 / 60
       );

       const newRecord: SleepRecord = {
         id: Date.now(),
         userId: user?.id || 1,
         sleepTime,
         wakeTime,
         sleepQuality,
         duration,
         notes,
         createdAt: new Date().toISOString()
       };

       setRecords([newRecord, ...records]);
       setMessage("睡眠记录已保存！");
       setSleepTime("");
       setWakeTime("");
       setNotes("");
     };

     const handleLogout = () => {
       setIsLoggedIn(false);
       setUser(null);
       setEmail("");
       setPassword("");
       setUsername("");
       setMessage("");
     };

     return (
       <div className="max-w-4xl mx-auto p-6 space-y-8">
         <div className="text-center space-y-2">
           <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-purple-600
    bg-clip-text text-transparent">
             智能睡眠监测器
           </h1>
           <p className="text-gray-600">
             追踪您的睡眠质量，改善睡眠习惯
           </p>
           <div className="inline-block px-4 py-1 bg-green-100 text-green-700
   rounded-full text-sm">
             🎭 演示模式 - 无需真实数据库
           </div>
         </div>

         {!isLoggedIn ? (
           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border
   border-gray-200">
             <h2 className="text-2xl font-semibold mb-6 text-center">
               {isRegistering ? "用户注册" : "用户登录"}
             </h2>

             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">
                   邮箱
                 </label>
                 <input
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg
   focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                   placeholder="请输入邮箱"
                 />
               </div>

               {isRegistering && (
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     用户名
                   </label>
                   <input
                     type="text"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg
   focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                     placeholder="请输入用户名"
                   />
                 </div>
               )}

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">
                   密码
                 </label>
                 <input
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg
   focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                   placeholder="请输入密码"
                 />
               </div>

               <button
                 onClick={isRegistering ? handleRegister : handleLogin}
                 disabled={!email || !password || (isRegistering && !username)}
                 className="w-full py-3 bg-gradient-to-r from-teal-600 to-purple-600
   text-white rounded-lg font-medium hover:from-teal-700 hover:to-purple-700
   disabled:opacity-50 disabled:cursor-not-allowed transition-all"
               >
                 {isRegistering ? "注册" : "登录"}
               </button>

               <p className="text-center text-sm text-gray-600">
                 {isRegistering ? "已有账号？" : "还没有账号？"}
                 <button
                   onClick={() => setIsRegistering(!isRegistering)}
                   className="text-teal-600 hover:text-teal-700 ml-1"
                 >
                   {isRegistering ? "登录" : "注册"}
                 </button>
               </p>
             </div>
           </div>
         ) : (
           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border
   border-gray-200">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-2xl font-semibold">
                 欢迎，{user?.username || user?.email}
               </h2>
               <button
                 onClick={handleLogout}
                 className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800
   transition-colors"
               >
                 退出登录
               </button>
             </div>

             <div className="space-y-6">
               <h3 className="text-xl font-medium">记录睡眠数据</h3>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     入睡时间
                   </label>
                   <input
                     type="datetime-local"
                     value={sleepTime}
                     onChange={(e) => setSleepTime(e.target.value)}
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg
   focus:ring-2 focus:ring-teal-500"
                   />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                     起床时间
                   </label>
                   <input
                     type="datetime-local"
                     value={wakeTime}
                     onChange={(e) => setWakeTime(e.target.value)}
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg
   focus:ring-2 focus:ring-teal-500"
                   />
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">
                   睡眠质量
                 </label>
                 <select
                   value={sleepQuality}
                   onChange={(e) => setSleepQuality(e.target.value)}
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg
   focus:ring-2 focus:ring-teal-500"
                 >
                   <option value="好">好</option>
                   <option value="中">中</option>
                   <option value="差">差</option>
                 </select>
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">
                   备注（可选）
                 </label>
                 <textarea
                   value={notes}
                   onChange={(e) => setNotes(e.target.value)}
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg
   focus:ring-2 focus:ring-teal-500"
                   rows={3}
                   placeholder="记录任何想备注的内容..."
                 />
               </div>

               <button
                 onClick={handleSubmitRecord}
                 disabled={!sleepTime || !wakeTime}
                 className="w-full py-3 bg-gradient-to-r from-teal-600 to-purple-600
   text-white rounded-lg font-medium hover:from-teal-700 hover:to-purple-700
   disabled:opacity-50 disabled:cursor-not-allowed transition-all"
               >
                 保存记录
               </button>
             </div>

             <div className="mt-8">
               <h3 className="text-xl font-medium mb-4">睡眠记录</h3>

               {records.length === 0 ? (
                 <p className="text-gray-500 text-center py-8">
                   暂无记录，开始记录您的第一次睡眠吧！
                 </p>
               ) : (
                 <div className="space-y-4">
                   {records.map((record) => (
                     <div
                       key={record.id}
                       className="bg-gradient-to-r from-teal-50 to-purple-50 rounded-lg
   p-4 border border-teal-100"
                     >
                       <div className="flex justify-between items-start">
                         <div className="space-y-1">
                           <p className="font-medium">
                             入睡：{new Date(record.sleepTime).toLocaleString()} |
                             起床：{new Date(record.wakeTime).toLocaleString()}
                           </p>
                           <p className="text-sm text-gray-600">
                             睡眠质量: {record.sleepQuality} |
                             时长: {Math.floor(record.duration / 60)}小时{record.duration
    % 60}分钟
                           </p>
                           {record.notes && (
                             <p className="text-sm text-gray-500 mt-1">{record.notes}</p>
                           )}
                         </div>
                         <span className="text-xs text-gray-400">
                           {new Date(record.createdAt).toLocaleDateString()}
                         </span>
                       </div>
                     </div>
                   ))}
                 </div>
               )}
             </div>
           </div>
         )}

         {message && (
           <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3
   rounded-lg shadow-lg animate-fade-in">
             {message}
           </div>
         )}
       </div>
     );
   }
   CONTENT

   cat << 'EOF'
