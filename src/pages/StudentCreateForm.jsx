import { Link } from "react-router-dom"
import { useState, useContext } from "react"
import { EnumsContext } from "../context/EnumsContext";
import { translateEnums } from "../helper/translateEnums";
import { IntlContext } from "../context/IntlContext";
import { useTranslate } from "../hooks/useTranslate";

export const StudentCreateForm = () => {
  const { house: houseEnum, gender: genderEnum, year: yearEnum } = useContext(EnumsContext);
  const { locale } = useContext(IntlContext);
  const t = useTranslate();

  const [message, setMessage] = useState("")

  const handleCreate = async (e) => {
    e.preventDefault();

    const form = e.target;

    if (
      !form.firstName.value?.trim() ||
      !form.lastName.value?.trim() ||
      !form.gender.value ||
      !form.house.value ||
      !form.year.value
    ) {
      setMessage(t("messageEmptyField"));
      return;
    }

    const body = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      gender: form.gender.value,
      house: form.house.value,
      year: form.year.value,
    };

    try {
      const response = await fetch("http://localhost:8080/students", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Přidání se nepovedlo");
      }

      setMessage(t("messageSuccesCreate"));
    } catch (error) {
      setMessage("Nastala chyba při přidání ❌");
      console.error(error);
    }
  }

  return (
    <>
      <h1>{t("titleCreate")}</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleCreate}>
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
                  />{" "}
                  {translateEnums("M", genderEnum, locale)}
                </label>
                <label className="form-check-label">
                  <input
                    type="radio"
                    name="gender"
                    className="form-check-input"
                    value="F"
                    required
                  />{" "}
                  {translateEnums("F", genderEnum, locale)}
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
                >
                  <option></option>
                  {houseEnum.map((item) => (
                    <option key={item.code} value={item.code}>
                      {translateEnums(item.code, houseEnum, locale)}
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
                >
                  <option></option>
                  {yearEnum.map((item) => (
                    <option key={item.code} value={item.code}>
                      {translateEnums(item.code, yearEnum, locale)}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
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
