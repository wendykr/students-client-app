import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { StudentList } from "./pages/StudentList";
import { StudentDetail } from "./pages/StudentDetail";
import { StudentEditForm } from "./pages/StudentEditForm";
import { StudentCreateForm } from "./pages/StudentCreateForm";
import { useState, useEffect } from "react"
import { EnumsContext } from "./context/EnumsContext";
import { IntlProvider } from "./context/IntlContext";
import { SwitcherLanguage } from "./components/SwitcherLanguage";
import { messages } from "./intl/messages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient()

function App() {

  const [gender, setGender] = useState([])
  const [house, setHouse] = useState([]);
  const [year, setYear] = useState([]);
  const [locale, setLocale] = useState("cs");

  useEffect(() => {
    const getGenders = async () => {
      const response = await fetch("http://localhost:8080/codebooks/GENDER");

      const data = await response.json();

      setGender(data);
    };

    getGenders();
  }, []);

  useEffect(() => {
    const getHouses = async () => {
      const response = await fetch("http://localhost:8080/codebooks/HOUSE");

      const data = await response.json();

      setHouse(data);
    };

    getHouses();
  }, []);

  useEffect(() => {
    const getYears = async () => {
      const response = await fetch(
        "http://localhost:8080/codebooks/YEAR",
      );

      const data = await response.json();

      setYear(data);
    };

    getYears();
  }, []);

  const router = createBrowserRouter([
    { path: "/", element: <StudentList /> },
    { path: "/students/:id", element: <StudentDetail /> },
    { path: "/students/:id/edit", element: <StudentEditForm /> },
    { path: "/students/create", element: <StudentCreateForm /> },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider messages={messages} locale={locale}>
        <EnumsContext.Provider value={{ gender, house, year }}>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {locale === "cs" ? "Přepnout na jazyk" : "Switch to language"}:{" "}
            <SwitcherLanguage locale={locale} setLocale={setLocale} />
          </div>
          <RouterProvider router={router}></RouterProvider>
        </EnumsContext.Provider>
      </IntlProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
