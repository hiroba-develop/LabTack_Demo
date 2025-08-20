import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Files from "./pages/Files";
import DM from "./pages/DM";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import { useEffect } from "react";
import { HomeProvider } from "./contexts/HomeContext";
import { FileProvider } from "./contexts/FileContext";
import { DMProvider } from "./contexts/DMContext";
import { CalendarProvider } from "./contexts/CalendarContext";
import { DetailPanelProvider } from "./contexts/DetailPanelContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { UserProvider } from "./contexts/UserContext";
import ChannelList from "./components/ChannelList";
import FolderTree from "./components/FolderTree";
import DMSidebar from "./components/DMSidebar";
import CalendarSidebar from "./components/CalendarSidebar";

function App() {
  const basename = import.meta.env.BASE_URL;

  useEffect(() => {
    document.title = "LabTack";
  }, []);

  return (
    <SettingsProvider>
      <DetailPanelProvider>
        <UserProvider>
          <HomeProvider>
            <FileProvider>
              <DMProvider>
                <CalendarProvider>
                  <Router basename={basename}>
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route
                        path="/"
                        element={
                          <Layout sidebarContent={<ChannelList />} headerTitle="ホーム">
                            <Dashboard />
                          </Layout>
                        }
                      />
                      <Route
                        path="/files"
                        element={
                          <Layout sidebarContent={<FolderTree />} headerTitle="ファイル">
                            <Files />
                          </Layout>
                        }
                      />
                      <Route
                        path="/dm"
                        element={
                          <Layout sidebarContent={<DMSidebar />} headerTitle="DM">
                            <DM />
                          </Layout>
                        }
                      />
                      <Route
                        path="/calendar"
                        element={
                          <Layout sidebarContent={<CalendarSidebar />} headerTitle="カレンダー">
                            <Calendar />
                          </Layout>
                        }
                      />
                      <Route
                        path="/settings"
                        element={
                          <Layout sidebarContent={<></>} headerTitle="設定">
                            <Settings />
                          </Layout>
                        }
                      />
                    </Routes>
                  </Router>
                </CalendarProvider>
              </DMProvider>
            </FileProvider>
          </HomeProvider>
        </UserProvider>
      </DetailPanelProvider>
    </SettingsProvider>
  );
}

export default App;
