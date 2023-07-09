import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00B8F1',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FFE274',
      contrastText: '#807960',
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                return <Route key={index} path={route.path} element={<Page />} />;
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
