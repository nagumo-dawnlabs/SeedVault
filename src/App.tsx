import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/Layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { ChampionsArena } from './pages/ChampionsArena';
import { StakeDashboard } from './pages/StakeDashboard';

function App() {
    return (
        <Router>
            <AppLayout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/champions" element={<ChampionsArena />} />
                    <Route path="/dashboard" element={<StakeDashboard />} />
                </Routes>
            </AppLayout>
        </Router>
    );
}

export default App;
