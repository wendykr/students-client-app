import { Link } from "react-router-dom";
import { useContext } from "react";
import { EnumsContext } from "../context/EnumsContext";
import { IntlContext } from "../context/IntlContext";
import { translateEnums } from "../helper/translateEnums";
import { useTranslate } from "../hooks/useTranslate";

export const StudentForm = ({ defaultValues, onSubmit }) => {
  const { gender, house, year } = useContext(EnumsContext);
  const { locale } = useContext(IntlContext);
  const t = useTranslate();

  return (
    <form onSubmit={onSubmit}>
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
                defaultValue={defaultValues.firstName}
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
                defaultValue={defaultValues.lastName}
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
                  defaultChecked={defaultValues.gender === "M"}
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
                  defaultChecked={defaultValues.gender === "F"}
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
                defaultValue={defaultValues.house}
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
                defaultValue={defaultValues.year}
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
  );
};
