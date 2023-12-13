import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './config/UserContext';
import HomePage from './components/HomePage';
import Main from './components/Main';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AddCollectionDrive from './components/AddCollectionDrive';
import AggregatedAmountReport from './components/AggregatedAmountReport';
import BloodDonationsReport from './components/BloodDonationsReport';
import CollectionDriveReport from './components/CollectionDriveReport';
import EditProfileAdmin from './components/EditProfileAdmin';
import EditProfileUser from './components/EditProfileUser';
import ForgotPassword from './components/ForgotPassword';
import NewPassword from './components/NewPassword';
import Notification from './components/Notification';
import OperationsHistory from './components/OperationsHistory';
import Payment from './components/Payment';
import PaymentsReport from './components/PaymentsReport';
import Policy from './components/Policy';
import ProcessRequest from './components/ProcessRequest';
import Reports from './components/Reports';
import ShowProfile from './components/ShowProfile';
import UsersEdit from './components/UsersEdit';


function App() {
    return (
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/SignUpPage" element={<SignUp />} />
            <Route path="/SignInPage" element={<SignIn />} />
            <Route path="/MainPage" element={<Main />} />
            <Route path="/AddCollectionDrivePage" element={<AddCollectionDrive />} />
            <Route path="/AggregatedAmountReportPage" element={<AggregatedAmountReport />} />
            <Route path="/BloodDonationsReportPage" element={<BloodDonationsReport />} />
            <Route path="/CollectionDriveReportPage" element={<CollectionDriveReport />} />
            <Route path="/EditProfileAdminPage" element={<EditProfileAdmin />} />
            <Route path="/EditProfileUserPage" element={<EditProfileUser />} />
            <Route path="/ForgotPasswordPage" element={<ForgotPassword />} />
            <Route path="/NewPasswordPage" element={<NewPassword />} />
            <Route path="/NotificationPage" element={<Notification />} />
            <Route path="/OperationsHistoryPage" element={<OperationsHistory />} />
            <Route path="/PaymentPage" element={<Payment />} />
            <Route path="/PaymentsReportPage" element={<PaymentsReport />} />
            <Route path="/PolicyPage" element={<Policy />} />
            <Route path="/ProcessRequestPage" element={<ProcessRequest />} />
            <Route path="/ReportsPage" element={<Reports />} />
            <Route path="/ShowProfilePage" element={<ShowProfile />} />
            <Route path="/UsersEditPage" element={<UsersEdit />} />
          </Routes>
        </Router>
      </UserProvider>
    );
  }
  

export default App;
