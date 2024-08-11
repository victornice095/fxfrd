import React, { lazy, Suspense, useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicRoute from "./components/PublicRoute";
import MajorLayout from "./components/MajorLayout";
import MinorLayout from "./components/MinorLayout";
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import AdminRoute from "./components/AdminRoute";

const Contact = lazy(() => import("./pages/contact"));
const FAQ = lazy(() => import("./pages/faq"));
const Policy = lazy(() => import("./pages/policy"));
const Login = lazy(() => import("./pages/login"));
const Refer = lazy(() => import("./pages/refer"));
const Market = lazy(() => import("./pages/marketing"));
const Terms = lazy(() => import("./pages/terms"));
const ForgotPassword = lazy(() => import("./pages/forgotpassword"));
const PasswordLinkSent = lazy(() => import("./pages/passwordlinksent"));
const RegisterSuccessSuccess = lazy(() => import("./pages/registersuccess"));
const ResetPassword = lazy(() => import("./pages/resetpassword"));
const Resetsuccess = lazy(() => import("./pages/resetsuccess"));
const ResendConfirmation = lazy(() => import("./pages/resendconfirmation"));
const Deposit = lazy(() => import("./pages/deposit"));
const Wallet = lazy(() => import("./pages/wallet"));
const Exchange = lazy(() => import("./pages/exchange"));
const Funds = lazy(() => import("./pages/fund"));
const KYC = lazy(() => import("./pages/kyc"));
const KYC2 = lazy(() => import("./pages/kyc/kyc"));

const Withdraw = lazy(() => import("./pages/withdraw"));
// const Withdrawal = lazy(() => import("./pages/withdraw-2"));
const User = lazy(() => import("./pages/user"));
const Transact = lazy(() => import("./pages/transact"));
const Help = lazy(() => import("./pages/help"));
const SentEmails = lazy(() => import("./pages/sentmails"));
// const ReceivedEmails = lazy(() => import("./pages/receivemails"));
const SendMail = lazy(() => import("./pages/sendmail"));
const Sent = lazy(() => import("./pages/sent"));
// const Received = lazy(() => import("./pages/inboxed"));
const Verified = lazy(() => import("./components/Verified"));
const Maintenance = lazy(() => import("./pages/maintenance"));
const AdminRegister = lazy(() => import("./pages/adminpage/adminregister"));
const AdminLogin = lazy(() => import("./pages/adminpage/adminlogin"));
const AdminUserLayout = lazy(() => import("./components/AdminUserLayout"));
const AdminDashboard = lazy(() => import("./pages/adminpage/admindashboard"));
const AdminUser = lazy(() => import("./pages/adminpage/adminuser"));
const AdminEdit = lazy(() => import("./pages/adminpage/adminedit"));
const BTC = lazy(() => import("./pages/adminpage/adminbtc"));
const ETH = lazy(() => import("./pages/adminpage/admineth"));
const BNB = lazy(() => import("./pages/adminpage/adminbnb"));
const USDT = lazy(() => import("./pages/adminpage/adminusdt"));
const LTC = lazy(() => import("./pages/adminpage/adminltc"));
const BCH = lazy(() => import("./pages/adminpage/adminbch"));
// const USDC = lazy(() => import("./pages/adminpage/adminusdc"));
// const SOL = lazy(() => import("./pages/adminpage/adminsol"));
// const DOGE = lazy(() => import("./pages/adminpage/admindoge"));
// const ADA = lazy(() => import("./pages/adminpage/adminada"));

const AdminUserDeposit = lazy(() =>
  import("./pages/adminpage/adminuserdeposit")
);
const AdminUserWithdraw = lazy(() =>
  import("./pages/adminpage/adminuserwithdrawal")
);
const AdminUserTransfer = lazy(() =>
  import("./pages/adminpage/adminusertransfer")
);
const AdminUserMessages = lazy(() =>
  import("./pages/adminpage/adminuserissues")
);
const AdminNewMessage = lazy(() => import("./pages/adminpage/adminnewmessage"));

const AdminSentMessage = lazy(() =>
  import("./pages/adminpage/adminsentmessage")
);
const AdminDeposits = lazy(() => import("./pages/adminpage/adminalldeposits"));

const AdminWithdrawals = lazy(() =>
  import("./pages/adminpage/adminallwithdrawals")
);
const AdminTransfers = lazy(() =>
  import("./pages/adminpage/adminalltransfers")
);
const AdminKycs = lazy(() => import("./pages/adminpage/adminallkyc"));
const AdminKyc = lazy(() => import("./pages/adminpage/adminuserkyc"));
const AdminIssues = lazy(() => import("./pages/adminpage/adminallissues"));
const AdminReceivedMessage = lazy(() =>
  import("./pages/adminpage/adminreceivedmessage")
);
const Register = lazy(() => import("./pages/register"));
const About = lazy(() => import("./pages/about"));
const Home = lazy(() => import("./pages/home"));
const UserRoute = lazy(() => import("./components/UserRoute"));
const UserDetails = lazy(() => import("./components/UserDetails"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const AdminMessages = lazy(() => import("./pages/adminpage/adminallmessages"));
const ChangePassword = lazy(() => import("./pages/changepassword"));
const RefTeam = lazy(() => import("./pages/refteam"));

const App = () => {
  const [maintenance, setMaintenance] = useState(false);

  useEffect(() => {
    if (process.env.REACT_APP_MAINTENANCE === "true") {
      setMaintenance(true);
    }
  }, []);

  return (
    <div className="app">
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route>
            <Route
              exact
              path="/maintenance-in-progress"
              element={maintenance ? <Maintenance /> : <Navigate to="/" />}
            ></Route>
          </Route>
          <Route element={<PublicRoute />}>
            <Route element={<MajorLayout />}>
              <Route
                exact
                path="/"
                index
                element={
                  maintenance ? (
                    <Navigate to="/maintenance-in-progress" />
                  ) : (
                    <Home />
                  )
                }
              />
              <Route
                exact
                path="/about"
                element={
                  maintenance ? (
                    <Navigate to="/maintenance-in-progress" />
                  ) : (
                    <About />
                  )
                }
              />
              <Route
                exact
                path="/contact-us"
                element={
                  maintenance ? (
                    <Navigate to="/maintenance-in-progress" />
                  ) : (
                    <Contact />
                  )
                }
              />
              <Route
                exact
                path="/refer-and-earn"
                element={
                  maintenance ? (
                    <Navigate to="/maintenance-in-progress" />
                  ) : (
                    <Refer />
                  )
                }
              />
              <Route
                exact
                path="/marketing-policy"
                element={
                  maintenance ? (
                    <Navigate to="/maintenance-in-progress" />
                  ) : (
                    <Market />
                  )
                }
              />
              <Route
                exact
                path="/privacy-policy"
                element={
                  maintenance ? (
                    <Navigate to="/maintenance-in-progress" />
                  ) : (
                    <Policy />
                  )
                }
              />
              <Route
                exact
                path="/terms-and-conditions"
                element={
                  maintenance ? (
                    <Navigate to="/maintenance-in-progress" />
                  ) : (
                    <Terms />
                  )
                }
              />
              <Route
                exact
                path="/faq"
                element={
                  maintenance ? (
                    <Navigate to="/maintenance-in-progress" />
                  ) : (
                    <FAQ />
                  )
                }
              />
            </Route>
            <Route element={<MinorLayout />}>
              <Route
                exact
                path="/register"
                element={
                  maintenance ? (
                    <Navigate to="/maintenance-in-progress" />
                  ) : (
                    <Register />
                  )
                }
              />
              <Route
                exact
                path="/login"
                element={
                  maintenance ? (
                    <Navigate to="/maintenance-in-progress" />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                exact
                path="/forgot-password"
                element={
                  maintenance ? (
                    <Navigate to="/maintenance-in-progress" />
                  ) : (
                    <ForgotPassword />
                  )
                }
              />
              <Route
                exact
                path="/reset-link-sent"
                element={
                  maintenance ? (
                    <Navigate to="/maintenance-in-progress" />
                  ) : (
                    <PasswordLinkSent />
                  )
                }
              />
              <Route
                exact
                path="/resend-confirmation-email"
                element={
                  maintenance ? (
                    <Navigate to="/maintenance-in-progress" />
                  ) : (
                    <ResendConfirmation />
                  )
                }
              />
              <Route element={<Verified />}>
                <Route
                  exact
                  path="/registration-successful"
                  element={
                    maintenance ? (
                      <Navigate to="/maintenance-in-progress" />
                    ) : (
                      <RegisterSuccessSuccess />
                    )
                  }
                />
              </Route>

              <Route
                exact
                path="/reset-password"
                element={
                  maintenance ? (
                    <Navigate to="/maintenance-in-progress" />
                  ) : (
                    <ResetPassword />
                  )
                }
              />
              <Route
                exact
                path="/reset-success"
                element={
                  maintenance ? (
                    <Navigate to="/maintenance-in-progress" />
                  ) : (
                    <Resetsuccess />
                  )
                }
              />
            </Route>
          </Route>
          <Route element={<UserRoute />}>
            <Route element={<UserDetails />}>
              <Route element={<UserLayout />}>
                <Route
                  exact
                  path="/dashboard"
                  element={
                    maintenance ? (
                      <Navigate to="/maintenance-in-progress" />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route
                  exact
                  path="/wallet"
                  element={
                    maintenance ? (
                      <Navigate to="/maintenance-in-progress" />
                    ) : (
                      <Wallet />
                    )
                  }
                />
                <Route
                  exact
                  path="/convert"
                  element={
                    maintenance ? (
                      <Navigate to="/maintenance-in-progress" />
                    ) : (
                      <Exchange />
                    )
                  }
                />
                <Route
                  exact
                  path="/user-reset-password"
                  element={
                    maintenance ? (
                      <Navigate to="/maintenance-in-progress" />
                    ) : (
                      <ChangePassword />
                    )
                  }
                />
                <Route
                  exact
                  path="/referral"
                  element={
                    maintenance ? (
                      <Navigate to="/maintenance-in-progress" />
                    ) : (
                      <RefTeam />
                    )
                  }
                />
                <Route
                  exact
                  path="/user"
                  element={
                    maintenance ? (
                      <Navigate to="/maintenance-in-progress" />
                    ) : (
                      <User />
                    )
                  }
                />
                <Route
                  exact
                  path="/kyc"
                  element={
                    maintenance ? (
                      <Navigate to="/maintenance-in-progress" />
                    ) : (
                      <KYC />
                    )
                  }
                />
                <Route
                  exact
                  path="/kyc-success"
                  element={
                    maintenance ? (
                      <Navigate to="/maintenance-in-progress" />
                    ) : (
                      <KYC2 />
                    )
                  }
                />
                <Route
                  exact
                  path="/funds"
                  element={
                    maintenance ? (
                      <Navigate to="/maintenance-in-progress" />
                    ) : (
                      <Funds />
                    )
                  }
                >
                  <Route
                    index
                    element={
                      maintenance ? (
                        <Navigate to="/maintenance-in-progress" />
                      ) : (
                        <Deposit />
                      )
                    }
                  />
                  <Route
                    exact
                    path="deposit"
                    index
                    element={
                      maintenance ? (
                        <Navigate to="/maintenance-in-progress" />
                      ) : (
                        <Deposit />
                      )
                    }
                  />
                  <Route
                    exact
                    path="withdraw"
                    element={
                      maintenance ? (
                        <Navigate to="/maintenance-in-progress" />
                      ) : (
                        <Withdraw />
                      )
                    }
                  />
                  {/* <Route
                    exact
                    path="confirm-withdrawal"
                    element={
                      maintenance ? (
                        <Navigate to="/maintenance-in-progress" />
                      ) : (
                        <Withdrawal />
                      )
                    }
                  /> */}
                  <Route
                    exact
                    path="transfer"
                    element={
                      maintenance ? (
                        <Navigate to="/maintenance-in-progress" />
                      ) : (
                        <Transact />
                      )
                    }
                  />
                </Route>
                <Route
                  exact
                  path="/help"
                  element={
                    maintenance ? (
                      <Navigate to="/maintenance-in-progress" />
                    ) : (
                      <Help />
                    )
                  }
                >
                  <Route
                    index
                    element={
                      maintenance ? (
                        <Navigate to="/maintenance-in-progress" />
                      ) : (
                        <SendMail />
                      )
                    }
                  />
                  <Route
                    exact
                    path="send-mail"
                    element={
                      maintenance ? (
                        <Navigate to="/maintenance-in-progress" />
                      ) : (
                        <SendMail />
                      )
                    }
                  />
                  <Route
                    exact
                    path="sent-emails"
                    element={
                      maintenance ? (
                        <Navigate to="/maintenance-in-progress" />
                      ) : (
                        <SentEmails />
                      )
                    }
                  />
                  <Route
                    exact
                    path="sent-emails/:messageID"
                    element={
                      maintenance ? (
                        <Navigate to="/maintenance-in-progress" />
                      ) : (
                        <Sent />
                      )
                    }
                  />
                  {/* <Route
                    exact
                    path="inbox"
                    element={
                      maintenance ? (
                        <Navigate to="/maintenance-in-progress" />
                      ) : (
                        <ReceivedEmails />
                      )
                    }
                  />
                  <Route
                    exact
                    path="inbox/:messageID"
                    element={
                      maintenance ? (
                        <Navigate to="/maintenance-in-progress" />
                      ) : (
                        <Received />
                      )
                    }
                  /> */}
                </Route>
              </Route>
            </Route>
          </Route>
          <Route element={<AdminLayout />}>
            <Route exact path="/admin/register" element={<AdminRegister />} />
            <Route exact path="/admin/login" element={<AdminLogin />} />
          </Route>
          <Route element={<AdminUserLayout />}>
            <Route element={<AdminRoute />}>
              <Route
                exact
                path="/admin/dashboard"
                element={<AdminDashboard />}
              />
              <Route exact path="/admin/deposits" element={<AdminDeposits />} />
              <Route
                exact
                path="/admin/withdrawals"
                element={<AdminWithdrawals />}
              />
              <Route
                exact
                path="/admin/transfers"
                element={<AdminTransfers />}
              />
              <Route
                exact
                path="/admin/kyc-verification"
                element={<AdminKycs />}
              />
              <Route
                exact
                path="/admin/kyc-verification/:userId"
                element={<AdminKyc />}
              />
              <Route exact path="/admin/messages" element={<AdminMessages />} />
              <Route exact path="/admin/issues" element={<AdminIssues />} />

              <Route exact path="/admin/user/:userId" element={<AdminUser />}>
                <Route index element={<AdminUserDeposit />} />
                <Route exact path="deposits" element={<AdminUserDeposit />} />
                <Route
                  exact
                  path="withdrawals"
                  element={<AdminUserWithdraw />}
                />
                <Route exact path="transfers" element={<AdminUserTransfer />} />
                <Route exact path="messages" element={<AdminUserMessages />}>
                  <Route index element={<AdminNewMessage />} />
                  <Route exact path="send" element={<AdminNewMessage />} />
                  <Route exact path="sent" element={<AdminSentMessage />} />
                  <Route
                    exact
                    path="inbox"
                    element={<AdminReceivedMessage />}
                  />
                </Route>
              </Route>
              <Route
                exact
                path="/admin/edit-user/:userId"
                element={<AdminEdit />}
              >
                <Route index element={<BTC />} />
                <Route exact path="btc" element={<BTC />} />
                <Route exact path="eth" element={<ETH />} />
                <Route exact path="bnb" element={<BNB />} />
                <Route exact path="usdt" element={<USDT />} />
                <Route exact path="ltc" element={<LTC />} />
                <Route exact path="bch" element={<BCH />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
