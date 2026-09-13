const { useState, useEffect, useMemo, useRef } = React;

const Icons = {
    Home: () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    Dumbbell: ({size=22}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14.4 14.4 5.6 5.6"/><path d="m20 20-5.6-5.6"/><path d="m11.3 20 2.8-2.8a2 2 0 0 0 0-2.8l-4.2-4.2a2 2 0 0 0-2.8 0l-2.8 2.8"/><path d="m20 11.3-2.8 2.8a2 2 0 0 1-2.8 0l-4.2-4.2a2 2 0 0 1 0-2.8l2.8-2.8"/><path d="M4 4l4.2 4.2"/><path d="M4 14.1l2.8-2.8"/><path d="M14.1 4l-2.8 2.8"/></svg>,
    History: () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>,
    Stats: () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    Plus: ({size=22}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    Undo: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>,
    Check: ({size=20, color="currentColor"}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    Trash: ({size=18}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
    Edit: ({size=18}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    X: ({size=22}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    Clock: ({size=14}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    Play: ({size=14}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    Pause: ({size=14}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>,
    RefreshCw: ({size=18}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>,
    ChevronRight: ({size=18}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
    ChevronDown: ({size=18}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
    BackArrow: ({size=22}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
};

const generateId = () => Math.random().toString(36).substr(2, 9);

const formatDate = (dateObj) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
};
const formatTime = (dateObj) => {
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
};
const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}j ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
};
const formatTimerDisplay = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    const pad = (num) => num.toString().padStart(2, '0');
    if (h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}`;
    return `${pad(m)}:${pad(s)}`;
};

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") return initialValue;
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {}
    };
    return [storedValue, setValue];
}

const Modal = ({ isOpen, onClose, title, children, actions }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-cardBg rounded-2xl w-full max-w-xs overflow-hidden shadow-2xl z-10 animate-slide-up border border-white/10">
                <div className="p-5">
                    {title && <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>}
                    <div className="text-textSec text-sm">{children}</div>
                </div>
                <div className="p-3 bg-white/5 flex justify-end gap-2 border-t border-white/5">
                    {actions}
                </div>
            </div>
        </div>
    );
};

const Button = ({ children, onClick, variant = 'primary', className = '', disabled=false, icon: Icon }) => {
    const baseClass = "flex items-center justify-center gap-2 rounded-xl font-bold transition-all active:scale-95 no-select";
    
    const variants = {
        primary: "bg-gradient-to-r from-accent to-accentOrange text-black hover:brightness-110 py-3.5 px-6 shadow-lg shadow-accent/20",
        secondary: "bg-white/10 text-white hover:bg-white/15 py-3 px-5 border border-white/5",
        danger: "bg-danger/20 text-danger hover:bg-danger/30 py-3 px-5 border border-danger/20",
        ghost: "bg-transparent text-textSec hover:text-white py-2 px-4"
    };

    return (
        <button 
            onClick={onClick} 
            disabled={disabled}
            className={`${baseClass} ${variants[variant]} ${disabled ? 'opacity-40 cursor-not-allowed active:scale-100' : ''} ${className}`}
        >
            {Icon && <Icon size={18} />}
            {children}
        </button>
    );
};

const Input = ({ label, type = "text", value, onChange, placeholder, suffix }) => (
    <div className="mb-4">
        {label && <label className="block text-xs font-semibold text-textSec uppercase tracking-wider mb-1.5">{label}</label>}
        <div className="relative">
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-appBg border border-white/10 rounded-xl px-4 py-3 text-white placeholder-textSec/50 focus:outline-none focus:border-accent transition-all text-sm font-medium"
            />
            {suffix && <div className="absolute right-4 top-1/2 -translate-y-1/2 text-textSec text-xs font-bold">{suffix}</div>}
        </div>
    </div>
);

const WorkoutSetup = ({ onStart, savedExercises, createCustomExercise, deleteCustomExercise, onBack }) => {
    const [selectedExercise, setSelectedExercise] = useState(savedExercises[0] || { name: 'Push Up', target: 100, unit: 'reps' });
    const [customName, setCustomName] = useState('');
    const [customTarget, setCustomTarget] = useState('50');
    const [customUnit, setCustomUnit] = useState('reps');
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleCreate = () => {
        if (!customName.trim()) return;
        const newEx = {
            name: customName.trim(),
            target: parseInt(customTarget) || 10,
            unit: customUnit || 'reps'
        };
        createCustomExercise(newEx);
        setSelectedExercise(newEx);
        setCustomName('');
        setShowCreateModal(false);
    };

    return (
        <div className="flex-1 flex flex-col bg-appBg h-full overflow-hidden animate-slide-up pb-20">
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-appBg">
                <div className="flex items-center gap-2">
                    <button onClick={onBack} className="p-2 -ml-2 text-textSec hover:text-white">
                        <Icons.BackArrow />
                    </button>
                    <h2 className="text-base font-bold text-white">Pilih Latihan</h2>
                </div>
                <button onClick={() => setShowCreateModal(true)} className="text-accent text-xs font-bold flex items-center gap-1 px-3 py-1.5 bg-accent/10 rounded-lg border border-accent/20">
                    <Icons.Plus size={14} /> Baru
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-32">
                {savedExercises.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-textSec py-12 text-center">
                        <p className="mb-4 text-sm font-medium text-white/70">Tiada latihan tersimpan.</p>
                        <Button onClick={() => setShowCreateModal(true)}>Cipta Latihan</Button>
                    </div>
                ) : (
                    savedExercises.map(ex => {
                        const isSelected = selectedExercise.name === ex.name;
                        return (
                            <div 
                                key={ex.id || ex.name}
                                onClick={() => setSelectedExercise(ex)}
                                className={`bg-cardBg border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all ${isSelected ? 'border-accent bg-accent/5' : 'border-white/5 hover:border-white/15'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${isSelected ? 'bg-accent text-black' : 'bg-white/5 text-white'}`}>
                                        🔥
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm text-white">{ex.name}</div>
                                        <div className="text-xs text-textSec mt-0.5">Target: {ex.target} {ex.unit}</div>
                                    </div>
                                </div>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); deleteCustomExercise(ex.id); }}
                                    className="text-textSec hover:text-danger p-2"
                                    title="Padam Latihan"
                                >
                                    <Icons.Trash size={16} />
                                </button>
                            </div>
                        );
                    })
                )}
            </div>

            {savedExercises.length > 0 && (
                <div className="p-4 bg-cardBg border-t border-white/10 fixed bottom-16 left-0 right-0 z-30 max-w-md mx-auto">
                    <Button className="w-full" onClick={() => onStart(selectedExercise)}>
                        MULA WORKOUT ({selectedExercise.name})
                    </Button>
                </div>
            )}

            <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Cipta Latihan Baru">
                <Input label="Nama Latihan" placeholder="Contoh: Pull Up, Squat" value={customName} onChange={e => setCustomName(e.target.value)} />
                <Input label="Target Sasaran" type="number" placeholder="Contoh: 50" value={customTarget} onChange={e => setCustomTarget(e.target.value)} />
                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="ghost" onClick={() => setShowCreateModal(false)}>Batal</Button>
                    <Button onClick={handleCreate}>Cipta</Button>
                </div>
            </Modal>
        </div>
    );
};

const Home = ({ startWorkout, history, goToTab, onResetAll }) => {
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const today = new Date().setHours(0,0,0,0);
    const todaysWorkouts = history.filter(h => h.timestamp >= today);
    const totalReps = history.reduce((acc, curr) => acc + (curr.completed || 0), 0);
    const lastWorkout = history[0];

    return (
        <div className="flex-1 flex flex-col overflow-y-auto p-5 pb-24">
            <header className="flex items-center justify-between mb-6 pt-2">
                <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute -inset-1.5 bg-gradient-to-tr from-accentOrange via-accent to-yellow-400 rounded-2xl blur-md opacity-80 animate-pulse"></div>
                        <div className="relative w-11 h-11 bg-gradient-to-tr from-accentOrange to-accent rounded-2xl flex items-center justify-center animate-glow shadow-xl border border-white/20">
                            <span className="text-xl filter drop-shadow">🔥</span>
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-accentOrange rounded-full border-2 border-appBg z-10 shadow-sm"></div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-lg font-extrabold tracking-wider text-white">WORKOUT</h1>
                            <span className="text-[10px] font-black bg-accent/20 text-accent px-1.5 py-0.5 rounded border border-accent/30 tracking-widest">PRO</span>
                        </div>
                        <div className="flex items-center gap-1 text-accent text-xs font-bold tracking-wide mt-0.5">
                            <span>⚡</span> TRACKER
                        </div>
                    </div>
                </div>

                <button 
                    onClick={() => setShowResetConfirm(true)}
                    title="Padam Keseluruhan Data"
                    className="p-2.5 rounded-xl bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20 active:scale-95 transition-all flex items-center justify-center"
                >
                    <Icons.Trash size={18} />
                </button>
            </header>

            <button 
                onClick={() => startWorkout(null)}
                className="w-full bg-gradient-to-r from-accent to-accentOrange text-black rounded-2xl p-5 mb-6 flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-xl shadow-accent/25 no-select font-black text-lg tracking-wide"
            >
                <div className="bg-black/20 p-2 rounded-full">
                    <Icons.Plus size={24} />
                </div>
                <span>+ NEW WORKOUT</span>
            </button>

            <h2 className="text-xs font-bold text-textSec uppercase tracking-widest mb-3">Ringkasan Ringkas</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-cardBg p-4 rounded-2xl border border-white/5">
                    <div className="text-textSec text-xs font-medium mb-1">Hari Ini</div>
                    <div className="text-2xl font-black text-white">{todaysWorkouts.length} <span className="text-xs font-normal text-textSec">sesi</span></div>
                </div>
                <div className="bg-cardBg p-4 rounded-2xl border border-white/5">
                    <div className="text-textSec text-xs font-medium mb-1">Jumlah Reps</div>
                    <div className="text-2xl font-black text-accent">{totalReps.toLocaleString()}</div>
                </div>
            </div>

            {lastWorkout && (
                <div>
                    <div className="flex justify-between items-center mb-2 px-1">
                        <span className="text-xs font-bold text-textSec uppercase tracking-widest">Terakhir Disimpan</span>
                        <button onClick={() => goToTab('history')} className="text-accent text-xs font-semibold hover:underline">Lihat Semua</button>
                    </div>
                    <div className="bg-cardBg rounded-2xl border border-white/5 p-4 relative overflow-hidden active:bg-white/5 transition-colors cursor-pointer" onClick={() => goToTab('history')}>
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="font-bold text-base text-white">{lastWorkout.name}</div>
                                <div className="text-accent font-black text-lg mt-0.5">
                                    {lastWorkout.completed} <span className="text-xs font-normal text-textSec">/ {lastWorkout.target} {lastWorkout.unit}</span>
                                </div>
                            </div>
                            <div className="p-2 text-textSec">
                                <Icons.ChevronRight />
                            </div>
                        </div>
                        <div className="text-[11px] text-textSec mt-3 pt-2 border-t border-white/5 flex items-center gap-2">
                            <span>{lastWorkout.date}</span>
                            <span>•</span>
                            <span>{lastWorkout.time}</span>
                        </div>
                    </div>
                </div>
            )}

            <Modal isOpen={showResetConfirm} onClose={() => setShowResetConfirm(false)} title="Padam Keseluruhan Data?">
                <p className="mb-2 text-white text-sm font-medium">Adakah anda pasti mahu menghapuskan semua sejarah workout dan template latihan?</p>
                <p className="text-xs text-danger font-semibold mb-3">⚠️ Tindakan ini akan memadamkan keseluruhan rekod serta mengeset semula statistik kepada 0 secara kekal.</p>
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setShowResetConfirm(false)}>Batal</Button>
                    <Button variant="danger" onClick={() => { onResetAll(); setShowResetConfirm(false); }}>Padam Keseluruhan</Button>
                </div>
            </Modal>
        </div>
    );
};

const ActiveWorkout = ({ workout, onFinish, onCancel }) => {
    const [count, setCount] = useState(0);
    const [undoStack, setUndoStack] = useState([]);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [customAddValue, setCustomAddValue] = useState('');
    const [showCustomModal, setShowCustomModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);

    useEffect(() => {
        let interval;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setElapsedSeconds(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning]);

    const updateCount = (amount) => {
        setUndoStack(prev => [...prev, count]);
        setCount(prev => Math.max(0, prev + amount));
    };

    const handleUndo = () => {
        if (undoStack.length === 0) return;
        const newStack = [...undoStack];
        const previousCount = newStack.pop();
        setCount(previousCount);
        setUndoStack(newStack);
    };

    const handleCustomAdd = () => {
        const val = parseInt(customAddValue);
        if (!isNaN(val) && val !== 0) {
            updateCount(val);
        }
        setShowCustomModal(false);
        setCustomAddValue('');
    };

    const handleReset = () => {
        setUndoStack(prev => [...prev, count]);
        setCount(0);
        setShowResetModal(false);
    };

    const progressPercentage = Math.min(100, Math.round((count / (workout.target || 1)) * 100));
    const isTargetAchieved = count >= workout.target;
    const extraCount = count - workout.target;

    return (
        <div className="flex-1 flex flex-col bg-appBg h-full overflow-hidden">
            <div className="p-4 flex items-center justify-between bg-appBg border-b border-white/5">
                <button onClick={onCancel} className="text-textSec hover:text-white p-2">
                    <Icons.X />
                </button>
                <div className="text-base font-black tracking-wider uppercase text-white truncate max-w-[200px]">
                    {workout.name}
                </div>
                <button onClick={() => setShowResetModal(true)} className="text-textSec hover:text-white p-2">
                    <Icons.RefreshCw size={18} />
                </button>
            </div>

            <div className="px-5 py-3 bg-cardBg/40 border-b border-white/5">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2.5 bg-white/5 rounded-full px-3.5 py-1.5 text-xs border border-white/10">
                        <Icons.Clock size={14} />
                        <span className="font-mono font-bold text-white text-sm">{formatTimerDisplay(elapsedSeconds)}</span>
                        <button 
                            onClick={() => setIsTimerRunning(!isTimerRunning)} 
                            className="ml-1.5 p-1.5 rounded-full bg-accent text-black hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center justify-center"
                            title={isTimerRunning ? "Pause Timer" : "Start Timer"}
                        >
                            {isTimerRunning ? <Icons.Pause size={14} /> : <Icons.Play size={14} />}
                        </button>
                    </div>
                    <div className="text-accent font-black text-sm">
                        {progressPercentage}%
                    </div>
                </div>
                
                <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden relative">
                    <div 
                        className="absolute top-0 left-0 h-full transition-all duration-300 ease-out bg-gradient-to-r from-accent to-accentOrange rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>

                {isTargetAchieved && (
                    <div className="mt-2 text-center text-accent text-xs font-black flex items-center justify-center gap-1.5 animate-fade-in">
                        <Icons.Check size={14} /> TARGET ACHIEVED {extraCount > 0 ? `(+${extraCount})` : ''}
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-4 my-2">
                <div className="text-center w-full">
                    <div className="text-[5.5rem] leading-none font-black tracking-tighter text-white tabular-nums drop-shadow-2xl">
                        {count}
                    </div>
                    <div className="text-lg text-textSec font-bold mt-1 uppercase tracking-wider">
                        / {workout.target} {workout.unit}
                    </div>
                </div>
            </div>

            <div className="bg-cardBg rounded-t-3xl pt-5 pb-6 px-4 border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-10">
                <div className="flex justify-center gap-2 mb-3">
                    {[-1, -5, -10].map(val => (
                        <button 
                            key={val}
                            onClick={() => updateCount(val)}
                            className="h-10 flex-1 rounded-xl bg-white/5 text-textSec font-bold text-sm hover:bg-white/10 active:bg-white/20 active:scale-95 transition-all no-select"
                        >
                            {val}
                        </button>
                    ))}
                    <button 
                        onClick={handleUndo}
                        disabled={undoStack.length === 0}
                        className={`h-10 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all no-select text-xs ${undoStack.length === 0 ? 'bg-white/5 text-white/20' : 'bg-white/10 text-white hover:bg-white/20 active:scale-95'}`}
                    >
                        <Icons.Undo /> <span>UNDO</span>
                    </button>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-3">
                    {[1, 5, 10, 20].map(val => (
                        <button 
                            key={val}
                            onClick={() => updateCount(val)}
                            className="h-14 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 text-white font-black text-xl hover:brightness-125 active:scale-95 transition-all no-select flex items-center justify-center shadow-md"
                        >
                            +{val}
                        </button>
                    ))}
                </div>
                
                <div className="mb-4">
                     <button 
                        onClick={() => setShowCustomModal(true)}
                        className="w-full h-11 rounded-xl bg-white/5 text-white font-bold tracking-wider text-xs border border-white/10 active:scale-95 transition-all no-select"
                    >
                        CUSTOM ADD / SUBTRACT
                    </button>
                </div>

                <Button 
                    className="w-full py-4 text-base font-black tracking-wider" 
                    onClick={() => onFinish({ ...workout, completed: count, duration: elapsedSeconds })}
                >
                    ✓ SELESAI & SIMPAN
                </Button>
            </div>

            <Modal isOpen={showCustomModal} onClose={() => setShowCustomModal(false)} title="Custom Add/Subtract">
                <Input 
                    type="number" 
                    placeholder="Contoh: 15 atau -5" 
                    value={customAddValue} 
                    onChange={(e) => setCustomAddValue(e.target.value)} 
                />
                <div className="flex justify-end gap-2 mt-2">
                    <Button variant="ghost" onClick={() => setShowCustomModal(false)}>Batal</Button>
                    <Button onClick={handleCustomAdd}>Tambah</Button>
                </div>
            </Modal>

            <Modal isOpen={showResetModal} onClose={() => setShowResetModal(false)} title="Reset Counter?">
                <p className="mb-2">Adakah anda pasti mahu mengeset semula kaunter latihan ini kepada 0?</p>
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setShowResetModal(false)}>Batal</Button>
                    <Button variant="danger" onClick={handleReset}>Reset</Button>
                </div>
            </Modal>
        </div>
    );
};

const WorkoutSummary = ({ workoutData, onSave, onDiscard }) => {
    const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

    const handleSave = () => {
        const now = new Date();
        const record = {
            id: generateId(),
            name: workoutData.name,
            target: workoutData.target,
            completed: workoutData.completed,
            unit: workoutData.unit,
            duration: workoutData.duration,
            timestamp: now.getTime(),
            date: formatDate(now),
            time: formatTime(now),
            status: workoutData.completed >= workoutData.target ? 'Completed' : 'Partial'
        };
        onSave(record);
    };

    return (
        <div className="flex-1 flex flex-col bg-appBg p-5 justify-center">
            <div className="bg-cardBg rounded-3xl p-6 border border-white/10 shadow-2xl animate-slide-up text-center">
                <div className="mb-4 inline-flex p-4 rounded-full bg-accent/20 text-accent">
                    <Icons.Check size={36} />
                </div>
                <h2 className="text-2xl font-black mb-1 text-white">Selesai Workout!</h2>
                <p className="text-textSec text-xs mb-6">Tahniah kerana berjaya menyelesaikan sesi ini.</p>
                
                <div className="bg-appBg rounded-2xl p-4 mb-6 text-left border border-white/5">
                    <div className="font-bold text-lg text-white">{workoutData.name}</div>
                    <div className="text-3xl font-black text-accent my-2 tracking-tight">
                        {workoutData.completed} <span className="text-sm text-textSec font-medium">/ {workoutData.target} {workoutData.unit}</span>
                    </div>
                    <div className="flex items-center gap-2 text-textSec text-xs mt-3 pt-3 border-t border-white/5">
                        <Icons.Clock size={14} /> Tempoh Masa: {formatDuration(workoutData.duration)}
                    </div>
                </div>

                <div className="flex flex-col gap-2.5">
                    <Button onClick={handleSave} className="py-3.5 text-base font-bold">
                        ✓ SIMPAN REKOD
                    </Button>
                    <Button variant="ghost" onClick={() => setShowDiscardConfirm(true)} className="text-danger hover:text-danger hover:bg-danger/10 py-3 text-xs">
                        🗑 PADAM / BUANG
                    </Button>
                </div>
            </div>

            <Modal isOpen={showDiscardConfirm} onClose={() => setShowDiscardConfirm(false)} title="Buang Sesi Ini?">
                <p className="mb-3">Adakah anda pasti mahu membuang sesi workout ini tanpa menyimpannya ke Sejarah?</p>
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setShowDiscardConfirm(false)}>Batal</Button>
                    <Button variant="danger" onClick={onDiscard}>Buang</Button>
                </div>
            </Modal>
        </div>
    );
};

const HistoryTab = ({ history, onDelete, onBulkDelete, onClearAll, onUpdate }) => {
    const [selectedIds, setSelectedIds] = useState([]);
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [viewingRecord, setViewingRecord] = useState(null);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [showBulkConfirm, setShowBulkConfirm] = useState(false);

    const toggleSelect = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    if (viewingRecord) {
        return <HistoryDetail 
            record={viewingRecord} 
            onClose={() => setViewingRecord(null)} 
            onDelete={(id) => { onDelete(id); setViewingRecord(null); }}
            onUpdate={(updated) => { onUpdate(updated); setViewingRecord(updated); }}
        />;
    }

    return (
        <div className="flex-1 flex flex-col bg-appBg h-full overflow-hidden pb-16">
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-appBg z-10">
                <h2 className="text-lg font-bold text-white">History</h2>
                {history.length > 0 && (
                    <button 
                        onClick={() => {
                            setIsSelectMode(!isSelectMode);
                            setSelectedIds([]);
                        }}
                        className="text-accent font-bold text-xs px-3 py-1.5 bg-accent/10 rounded-lg border border-accent/20"
                    >
                        {isSelectMode ? 'Batal' : 'Select'}
                    </button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 pb-28">
                {history.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-textSec my-16 text-center">
                        <div className="p-4 rounded-full bg-white/5 mb-3 text-white/30">
                            <Icons.History />
                        </div>
                        <p className="font-bold text-white mb-1">Belum ada rekod workout.</p>
                        <p className="text-xs text-textSec">Mulakan workout pertama anda sekarang.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2.5">
                        {history.map(record => (
                            <div 
                                key={record.id} 
                                onClick={() => isSelectMode ? toggleSelect(record.id) : setViewingRecord(record)}
                                className={`bg-cardBg border rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition-all ${isSelectMode && selectedIds.includes(record.id) ? 'border-accent bg-accent/5' : 'border-white/5 hover:border-white/15'}`}
                            >
                                {isSelectMode && (
                                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 ${selectedIds.includes(record.id) ? 'bg-accent border-accent text-black' : 'border-white/30'}`}>
                                        {selectedIds.includes(record.id) && <Icons.Check size={14} />}
                                    </div>
                                )}
                                
                                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 font-bold">
                                    🔥
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-sm text-white truncate">
                                        {record.name}
                                    </div>
                                    <div className="text-xs text-textSec mt-0.5">
                                        {record.date} • {record.time}
                                    </div>
                                </div>
                                
                                <div className="text-right flex-shrink-0">
                                    <div className="font-black text-base text-accent">
                                        {record.completed}
                                    </div>
                                    <div className="text-[11px] text-textSec">
                                        / {record.target} {record.unit}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {!isSelectMode && history.length > 0 && (
                    <div className="mt-8 text-center pb-4">
                        <button onClick={() => setShowClearConfirm(true)} className="text-textSec text-xs font-semibold underline hover:text-danger">
                            CLEAR ALL HISTORY
                        </button>
                    </div>
                )}
            </div>

            {isSelectMode && selectedIds.length > 0 && (
                <div className="absolute bottom-16 left-0 right-0 p-4 z-20 bg-appBg/90 backdrop-blur-md">
                    <Button 
                        variant="danger" 
                        className="w-full shadow-xl"
                        onClick={() => setShowBulkConfirm(true)}
                    >
                        <Icons.Trash size={16} /> DELETE SELECTED ({selectedIds.length})
                    </Button>
                </div>
            )}

            <Modal isOpen={showClearConfirm} onClose={() => setShowClearConfirm(false)} title="Hapus Semua Sejarah?">
                <p className="mb-2 text-danger font-bold text-sm">Adakah anda pasti mahu menghapuskan semua history?</p>
                <p className="text-xs mb-3">Tindakan ini tidak boleh dibatalkan semula.</p>
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setShowClearConfirm(false)}>Batal</Button>
                    <Button variant="danger" onClick={() => { onClearAll(); setShowClearConfirm(false); }}>Hapus Semua</Button>
                </div>
            </Modal>

            <Modal isOpen={showBulkConfirm} onClose={() => setShowBulkConfirm(false)} title="Padam Rekod Dipilih?">
                <p className="mb-3">Adakah anda pasti mahu memadam {selectedIds.length} rekod yang dipilih?</p>
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setShowBulkConfirm(false)}>Batal</Button>
                    <Button variant="danger" onClick={() => { 
                        onBulkDelete(selectedIds); 
                        setIsSelectMode(false); 
                        setSelectedIds([]);
                        setShowBulkConfirm(false);
                    }}>Padam</Button>
                </div>
            </Modal>
        </div>
    );
};

const HistoryDetail = ({ record, onClose, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    
    const [editName, setEditName] = useState(record.name);
    const [editCompleted, setEditCompleted] = useState(record.completed.toString());
    const [editTarget, setEditTarget] = useState(record.target.toString());

    const handleSave = () => {
        onUpdate({
            ...record,
            name: editName,
            completed: parseInt(editCompleted) || 0,
            target: parseInt(editTarget) || 0
        });
        setIsEditing(false);
    };

    return (
        <div className="flex-1 flex flex-col bg-appBg animate-slide-up absolute inset-0 z-30">
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-appBg">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 -ml-2 text-textSec hover:text-white">
                        <Icons.BackArrow />
                    </button>
                    <h2 className="text-base font-bold text-white">Detail Rekod</h2>
                </div>
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="p-2 text-accent font-bold text-xs flex items-center gap-1">
                        <Icons.Edit size={16} /> <span>Edit</span>
                    </button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-5">
                {!isEditing ? (
                    <div className="space-y-4">
                        <div className="text-center py-6 bg-cardBg rounded-2xl border border-white/5">
                            <div className="inline-flex p-3 rounded-2xl bg-accent/10 text-accent mb-3 text-2xl">
                                🔥
                            </div>
                            <h1 className="text-xl font-black uppercase text-white tracking-wide">{record.name}</h1>
                            <div className="text-3xl font-black text-accent mt-2">
                                {record.completed} <span className="text-sm text-textSec font-medium">/ {record.target} {record.unit}</span>
                            </div>
                        </div>

                        <div className="bg-cardBg rounded-2xl border border-white/5 overflow-hidden text-sm">
                            <div className="p-3.5 border-b border-white/5 flex justify-between">
                                <span className="text-textSec">Tarikh</span>
                                <span className="font-bold text-white">{record.date}</span>
                            </div>
                            <div className="p-3.5 border-b border-white/5 flex justify-between">
                                <span className="text-textSec">Masa</span>
                                <span className="font-bold text-white">{record.time}</span>
                            </div>
                            <div className="p-3.5 flex justify-between">
                                <span className="text-textSec">Tempoh Sesi</span>
                                <span className="font-bold text-white">{formatDuration(record.duration || 0)}</span>
                            </div>
                        </div>

                        <Button variant="danger" className="w-full mt-4" onClick={() => setShowDeleteConfirm(true)}>
                            <Icons.Trash size={16} /> Padam Rekod Ini
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <Input label="Nama Latihan" value={editName} onChange={e => setEditName(e.target.value)} />
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <Input label="Selesai" type="number" value={editCompleted} onChange={e => setEditCompleted(e.target.value)} />
                            </div>
                            <div className="flex-1">
                                <Input label={`Target (${record.unit})`} type="number" value={editTarget} onChange={e => setEditTarget(e.target.value)} />
                            </div>
                        </div>
                        
                        <div className="flex gap-2 pt-3">
                            <Button variant="secondary" className="flex-1" onClick={() => setIsEditing(false)}>Batal</Button>
                            <Button className="flex-1" onClick={handleSave}>Simpan Changes</Button>
                        </div>
                    </div>
                )}
            </div>

            <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="Padam Rekod?">
                <p className="mb-3">Adakah anda pasti mahu memadam rekod latihan ini?</p>
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)}>Batal</Button>
                    <Button variant="danger" onClick={() => onDelete(record.id)}>Padam</Button>
                </div>
            </Modal>
        </div>
    );
};

const StatsTab = ({ history }) => {
    const [selectedPeriod, setSelectedPeriod] = useState('today');

    const totalWorkouts = history.length;
    const totalReps = history.reduce((sum, h) => sum + (h.completed || 0), 0);
    
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    const dayOfWeek = now.getDay() === 0 ? 6 : now.getDay() - 1;
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek).getTime();

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const yearStart = new Date(now.getFullYear(), 0, 1).getTime();

    const todayWorkouts = history.filter(h => h.timestamp >= todayStart);
    const weekWorkouts = history.filter(h => h.timestamp >= weekStart);
    const monthWorkouts = history.filter(h => h.timestamp >= monthStart);
    const yearWorkouts = history.filter(h => h.timestamp >= yearStart);

    const sumReps = (list) => list.reduce((sum, h) => sum + (h.completed || 0), 0);

    const periodOptions = [
        { id: 'today', label: 'Hari Ini', workouts: todayWorkouts.length, reps: sumReps(todayWorkouts), badge: 'HARI' },
        { id: 'week', label: 'Minggu Ini', workouts: weekWorkouts.length, reps: sumReps(weekWorkouts), badge: 'MINGGU' },
        { id: 'month', label: 'Bulan Ini', workouts: monthWorkouts.length, reps: sumReps(monthWorkouts), badge: 'BULAN' },
        { id: 'year', label: 'Tahun Ini', workouts: yearWorkouts.length, reps: sumReps(yearWorkouts), badge: 'TAHUN' },
    ];

    const activePeriod = periodOptions.find(p => p.id === selectedPeriod) || periodOptions[0];

    const bestRecord = [...history].sort((a, b) => (b.completed || 0) - (a.completed || 0))[0];

    const exerciseStats = history.reduce((acc, curr) => {
        if (!acc[curr.name]) acc[curr.name] = 0;
        acc[curr.name] += (curr.completed || 0);
        return acc;
    }, {});
    
    const sortedExercises = Object.entries(exerciseStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    return (
        <div className="flex-1 flex flex-col bg-appBg h-full overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-appBg z-10 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Statistik Latihan</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-cardBg p-4 rounded-2xl border border-white/5 shadow-md">
                        <div className="text-textSec text-[11px] font-bold uppercase tracking-wider mb-1">JUMLAH SESI</div>
                        <div className="text-2xl font-black text-white">{totalWorkouts}</div>
                    </div>
                    <div className="bg-cardBg p-4 rounded-2xl border border-white/5 shadow-md">
                        <div className="text-textSec text-[11px] font-bold uppercase tracking-wider mb-1">JUMLAH REPS</div>
                        <div className="text-2xl font-black text-accent">{totalReps.toLocaleString()}</div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2 px-1">
                        <h3 className="text-xs font-bold text-textSec uppercase tracking-wider">Ringkasan Tempoh Masa</h3>
                    </div>

                    <div className="grid grid-cols-4 gap-1 p-1 bg-cardBg rounded-xl border border-white/5 mb-3">
                        {periodOptions.map(period => (
                            <button
                                key={period.id}
                                onClick={() => setSelectedPeriod(period.id)}
                                className={`py-2 text-[11px] font-bold rounded-lg transition-all text-center no-select ${
                                    selectedPeriod === period.id 
                                        ? 'bg-gradient-to-r from-accent to-accentOrange text-black shadow-md' 
                                        : 'text-textSec hover:text-white'
                                }`}
                            >
                                {period.badge}
                            </button>
                        ))}
                    </div>

                    <div className="bg-cardBg p-5 rounded-2xl border border-white/10 shadow-lg relative overflow-hidden animate-fade-in">
                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/5">
                            <span className="text-sm font-bold text-white flex items-center gap-2">
                                <span>📅</span> {activePeriod.label}
                            </span>
                            <span className="text-[10px] bg-accent/15 text-accent font-extrabold px-2 py-0.5 rounded border border-accent/20 tracking-wider">
                                {activePeriod.badge}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-appBg/50 p-3 rounded-xl border border-white/5">
                                <div className="text-textSec text-xs font-medium mb-1">Sesi Latihan</div>
                                <div className="text-2xl font-black text-white">
                                    {activePeriod.workouts} <span className="text-xs font-normal text-textSec">sesi</span>
                                </div>
                            </div>
                            <div className="bg-appBg/50 p-3 rounded-xl border border-white/5">
                                <div className="text-textSec text-xs font-medium mb-1">Jumlah Reps</div>
                                <div className="text-2xl font-black text-accent">
                                    {activePeriod.reps.toLocaleString()} <span className="text-xs font-normal text-textSec">reps</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {bestRecord && (
                    <div className="bg-gradient-to-br from-cardBg to-accent/10 p-4 rounded-2xl border border-accent/20 relative overflow-hidden shadow-lg">
                        <div className="flex items-center justify-between mb-1">
                            <div className="text-textSec text-[11px] font-bold uppercase tracking-wider">REKOD TERTINGGI</div>
                            <span className="text-sm">🏆</span>
                        </div>
                        <div className="text-lg font-black text-white">{bestRecord.name}</div>
                        <div className="text-2xl font-black text-accent mt-0.5">{bestRecord.completed} <span className="text-xs text-textSec font-medium">{bestRecord.unit}</span></div>
                    </div>
                )}

                {sortedExercises.length > 0 && (
                    <div>
                        <h3 className="text-xs font-bold text-textSec uppercase tracking-wider mb-2 px-1">Top Latihan</h3>
                        <div className="bg-cardBg rounded-2xl border border-white/5 overflow-hidden text-sm shadow-md">
                            {sortedExercises.map(([name, total], idx) => (
                                <div key={name} className={`p-3.5 flex justify-between items-center ${idx !== sortedExercises.length -1 ? 'border-b border-white/5' : ''}`}>
                                    <span className="font-bold text-white">{name}</span>
                                    <span className="font-black text-accent">{total.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const App = () => {
    const [currentTab, setCurrentTab] = useState('home'); 
    const [workoutState, setWorkoutState] = useState('none'); 
    const [activeWorkoutData, setActiveWorkoutData] = useState(null);
    
    const [history, setHistory] = useLocalStorage('workout_history', []);
    const [savedExercises, setSavedExercises] = useLocalStorage('saved_exercises', [
        { id: '1', name: 'Push Up', target: 100, unit: 'reps' },
        { id: '2', name: 'Squat', target: 50, unit: 'reps' }
    ]);

    const startWorkoutSetup = () => {
        setCurrentTab('workout');
        setWorkoutState('setup');
    };

    const resetAllAppData = () => {
        setHistory([]);
        setSavedExercises([]);
        localStorage.removeItem('workout_history');
        localStorage.removeItem('saved_exercises');
    };

    const beginWorkout = (data) => {
        setActiveWorkoutData(data);
        setWorkoutState('active');
    };

    const finishWorkout = (dataWithResult) => {
        setActiveWorkoutData(dataWithResult);
        setWorkoutState('summary');
    };

    const saveWorkout = (record) => {
        setHistory(prev => [record, ...prev]);
        resetWorkoutFlow();
        setCurrentTab('history');
    };

    const discardWorkout = () => {
        resetWorkoutFlow();
        setCurrentTab('home');
    };

    const resetWorkoutFlow = () => {
        setWorkoutState('none');
        setActiveWorkoutData(null);
    };

    const deleteRecord = (id) => {
        setHistory(prev => prev.filter(r => r.id !== id));
    };
    const bulkDelete = (ids) => {
        setHistory(prev => prev.filter(r => !ids.includes(r.id)));
    };
    const clearAllHistory = () => {
        setHistory([]);
    };
    const updateRecord = (updatedRecord) => {
        setHistory(prev => prev.map(r => r.id === updatedRecord.id ? updatedRecord : r));
    };

    let content;
    if (currentTab === 'workout') {
        if (workoutState === 'setup') {
            content = <WorkoutSetup 
                onStart={beginWorkout} 
                savedExercises={savedExercises} 
                createCustomExercise={(ex) => setSavedExercises(prev => [...prev, {id: generateId(), ...ex}])}
                deleteCustomExercise={(id) => setSavedExercises(prev => prev.filter(e => e.id !== id))}
                onBack={() => { setWorkoutState('none'); setCurrentTab('home'); }}
            />;
        } else if (workoutState === 'active') {
            content = <ActiveWorkout workout={activeWorkoutData} onFinish={finishWorkout} onCancel={discardWorkout} />;
        } else if (workoutState === 'summary') {
            content = <WorkoutSummary workoutData={activeWorkoutData} onSave={saveWorkout} onDiscard={discardWorkout} />;
        } else {
            content = <Home startWorkout={startWorkoutSetup} history={history} goToTab={setCurrentTab} onResetAll={resetAllAppData} />;
        }
    } else if (currentTab === 'history') {
        content = <HistoryTab history={history} onDelete={deleteRecord} onBulkDelete={bulkDelete} onClearAll={clearAllHistory} onUpdate={updateRecord} />;
    } else if (currentTab === 'stats') {
        content = <StatsTab history={history} />;
    } else {
        content = <Home startWorkout={startWorkoutSetup} history={history} goToTab={setCurrentTab} onResetAll={resetAllAppData} />;
    }

    const hideNav = (currentTab === 'workout' && (workoutState === 'active' || workoutState === 'summary'));

    return (
        <div className="h-full w-full flex flex-col bg-appBg text-textMain relative overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {content}
            </div>

            {!hideNav && (
                <div className="absolute bottom-0 left-0 right-0 w-full bg-cardBg/95 backdrop-blur-xl py-2 px-4 flex justify-around items-center z-40 border-t border-white/5 shadow-2xl">
                    {[
                        { id: 'home', icon: Icons.Home, label: 'Home' },
                        { id: 'workout', icon: Icons.Dumbbell, label: 'Workout', action: startWorkoutSetup },
                        { id: 'history', icon: Icons.History, label: 'History' },
                        { id: 'stats', icon: Icons.Stats, label: 'Stats' },
                    ].map(tab => {
                        const isActive = (currentTab === tab.id);
                        return (
                            <button 
                                key={tab.id}
                                onClick={() => tab.action ? tab.action() : setCurrentTab(tab.id)}
                                className={`flex flex-col items-center gap-1 p-1 min-w-[55px] transition-all no-select ${isActive ? 'text-accent' : 'text-textSec hover:text-white'}`}
                            >
                                <tab.icon size={20} />
                                <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
