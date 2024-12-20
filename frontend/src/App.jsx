import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from './pages/Home';
import Footer from "./components/Footer";
import TentangKami from "./pages/TentangKami";
import Kontak from "./pages/Kontak";
import { Navbar } from "./components/Navbar";
import { AdminNavbar } from "./components/AdminNavbar";
import { UserNavbar } from "./components/UserNavbar";
import PaketSuka from "./pages/PaketSuka";
import AdminDashboard from "./dashboard/AdminDashboard";
import RegisterPage from "./Auth/RegisterPage";
import LoginPage from "./Auth/LoginPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom.js";
import NotFound from "./pages/NotFound";
import UserList from "./AdminComponents/UserList";
import EditUser from "./AdminComponents/EditUser";
import Rules from "./UserComponents/Rules"
import UserPage from "./UserComponents/UserPage";
import UserPacket from "./UserComponents/UserPacket";
import Order from "./UserComponents/Order"
import SuccessPage from "./PaymentRedirect/SuccessPage";
import InstructureList from "./AdminComponents/InstructureList";
import { InstructureNavbar } from "./components/InstructureNavbar";
import InstructureDashboard from "./InstructureComponent/InstructureDashboard"
import Certificate from "./UserComponents/Certificate";
import PurchaseDetails from "./UserComponents/PurchaseDetails";
import MyPostTestimoni from "./UserComponents/MyPostTestimoni";
import PacketCardList from "./AdminComponents/PacketCardList";

function App() {
  const user = useRecoilValue(userAtom);

  return (
    <>
      {!user && <Navbar />}
      {user && user.role === 'admin' && <AdminNavbar />}
      {user && user.role === 'user' && <UserNavbar />}
      {user && user.role === 'instructure' && <InstructureNavbar />}
      <Routes>
        <Route path="/kontak" element={!user ? <Kontak /> : <Navigate to={user.role === 'admin' ? '/admin' : user.role === 'instructure' ? '/instructure' : '/user'} />} />
        <Route path="/about" element={!user ? <TentangKami /> : <Navigate to={user.role === 'admin' ? '/admin' : user.role === 'instructure' ? '/instructure' : '/user'} />} />
        <Route path="/services" element={!user ? <PaketSuka /> : <Navigate to={user.role === 'admin' ? '/admin' : user.role === 'instructure' ? '/instructure' : '/user'} />} />
        <Route path="/admin" element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/instructure" element={user && user.role === 'instructure' ? <InstructureDashboard /> : <Navigate to="/" />} />
        <Route path="/user-list" element={user && user.role === 'admin' ? <UserList /> : <Navigate to="/" />} />
        <Route path="/packet-list" element={user && user.role === 'admin' ? <PacketCardList /> : <Navigate to="/" />} />
        <Route path="/instructure-list" element={user && user.role === 'admin' ? <InstructureList /> : <Navigate to="/" />} />
        <Route path="/admin/users/:id" element={user && user.role === 'admin' ? <EditUser /> : <Navigate to="/" />} />
        <Route path="/user" element={user && user.role === 'user' ? <UserPage /> : <Navigate to="/" />} />
        <Route path="/success" element={user && user.role === 'user' ? <SuccessPage /> : <Navigate to="/" />} />
        <Route path="/user/packet" element={user && user.role === 'user' ? <UserPacket /> : <Navigate to="/" />} />
        <Route path="/user/post" element={user && user.role === 'user' ? <MyPostTestimoni /> : <Navigate to="/" />} />
        <Route path="/user/mypurchase" element={user && user.role === 'user' ? <PurchaseDetails /> : <Navigate to="/" />} />
        <Route path="/user/rules" element={user && user.role === 'user' ? <Rules /> : <Navigate to="/" />} />
        <Route path="/user/certificate" element={user && user.role === 'user' ? <Certificate /> : <Navigate to="/" />} />
        <Route path="/user/order" element={user && user.role === 'user' ? <Order /> : <Navigate to="/" />} />
        <Route path="/" element={!user ? <Home /> : <Navigate to={user.role === 'admin' ? '/admin' : user.role === 'instructure' ? '/instructure' : '/user'} />} />
        <Route path="/auth/register" element={!user ? <RegisterPage /> : <Navigate to={user.role === 'admin' ? '/admin' : user.role === 'instructure' ? '/instructure' : '/user'} />} />
        <Route path="/auth/login" element={!user ? <LoginPage /> : <Navigate to={user.role === 'admin' ? '/admin' : user.role === 'instructure' ? '/instructure' : '/user'} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!user && <Footer />}
    </>
  );
}

export default App;
