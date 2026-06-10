import { BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import FaqPage from './pages/FaqPage';

export default function App() {
 return (
 <BrowserRouter>
 <Routes>
 <Route path="/" element={<HomePage />} />
 <Route path="/packages" element={<BookingPage />} />
 <Route path="/faq" element={<FaqPage />} />
 </Routes>
 </BrowserRouter>
 );
}
