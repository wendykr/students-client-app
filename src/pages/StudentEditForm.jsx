import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react"
import { EnumsContext } from "../context/EnumsContext";
import { translateEnums } from "../helper/translateEnums";
import { IntlContext } from "../context/IntlContext";
import { useTranslate } from "../hooks/useTranslate";

export const StudentEditForm = () => {
  const { gender, house, year } = useContext(EnumsContext)
  const { locale } = useContext(IntlContext);
  const { id } = useParams();
  const t = useTranslate();

  const [student, setStudent] = useState();
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const getStudent = async () => {
    const response = await fetch(`http://localhost:8080/students/${id}`);
    
    const data = await response.json()
    
    setStudent(data)
      setLoading(false);
    }
    
    getStudent()
  }, [id])

  const handleEdit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const body = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      gender: form.gender.value,
      house: form.house.value,
      year: form.year.value,
    };

  try {
    const response = await fetch(
      `http://localhost:8080/students/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Editace se nepovedla");
    }

    setMessage(t("messageSuccesEdit"));
  } catch (error) {
    setMessage("Nastala chyba při úpravě ❌");
    console.error(error);
  }
};

  if (loading) return (
    <p>
      {t("loading")}
    </p>
  );

  return (
    <>
      <h1>{t("titleEdit")}</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleEdit}>
        <table className="table table-light table-bordered">
          <tbody>
            <tr>
              <th>
                <label htmlFor="firstName" className="form-label">
                  {t("thFirstName")}
                </label>
              </th>
              <td>
                <input
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  defaultValue={student.firstName}
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="lastName" className="form-label">
                  {t("thLastName")}
                </label>
              </th>
              <td>
                <input
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  defaultValue={student.lastName}
                  required
                />
              </td>
            </tr>
            <tr>
              <th>{t("thGender")}</th>
              <td>
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="gender"
                    className="form-check-input"
                    value="M"
                    required
                    defaultChecked={student.gender === "M"}
                  />{" "}
                  {translateEnums("M", gender, locale)}
                </label>
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="gender"
                    className="form-check-input"
                    value="F"
                    required
                    defaultChecked={student.gender === "F"}
                  />{" "}
                  {translateEnums("F", gender, locale)}
                </label>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="house" className="form-label">
                  {t("thHouse")}
                </label>
              </th>
              <td>
                <select
                  id="house"
                  name="house"
                  className="form-select"
                  required
                  defaultValue={student.house}
                >
                  {house.map((item) => (
                    <option key={item.code} value={item.code}>
                      {translateEnums(item.code, house, locale)}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="year" className="form-label">
                  {t("thYear")}
                </label>
              </th>
              <td>
                <select
                  id="year"
                  name="year"
                  className="form-select"
                  required
                  defaultValue={student.year}
                >
                  {year.map((item) => (
                    <option key={item.code} value={item.code}>
                      {translateEnums(item.code, year, locale)}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button type="submit" className="btn btn-primary">
                  {t("buttonSave")}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <nav>
        <Link to="/">{t("buttonBack")}</Link>
      </nav>
    </>
  );
};
