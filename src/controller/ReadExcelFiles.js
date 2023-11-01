import readXlsxFile from "read-excel-file";

// An example *.xlsx document:
// ------------------------------------------------------------
// | START DATE | NUMBER OF STUDENTS | IS FREE | COURSE TITLE |
// ------------------------------------------------------------
// | 03/24/2018 |         10         |   true  |  Chemistry   |
// ------------------------------------------------------------

// const map = {
//   0: "id",
//   "First Name": "firstName",
//   "Last Name": "lastName",
//   Gender: "gender",
//   Country: "country",
//   Age: "age",
//   Date: "date",
//   id: "uid",
// };

const map = {
  "No.": "id",
  Initials: "initials",
  "Employee name": "employeeName",
  "Job Title": "jobTitle",
  Level: "level",
  "Business Unit": "businessUnit",
  Project: "project",
  "Seminar to attend in DK": "firstModuleLocation",
  "Seminar (Module 1) date": "firstModuleDate",
  "Duration of seminar 1 (days)": "firstModuleLength",
  "Arrival date to DK": {
    type: Date,
    prop: "dkArrivalDate",
  },
  "Departure date from DK": {
    type: Date,
    prop: "dkLeavingDate",
  },
  "Total Days": "totalModule1Days",
  "Module 2 Period": "secondModuleLength",
  "Module 2 Location": "secondModuleLocation",
  "Personal Plan (Vacation) Period": "personalPlanPeriod",
  "Visa appointment date": "visaAppointmentDate",
  "Trip Status": "tripStatus",
  "Visa Status": "visaStatus",
  "DKHR Module 2 hotel Booking": "dkhrModule2HotelBooking",
  "DKHR comments": "dkhrComments",
  "VNHR Comments": "vnhrComments",
};

// File.
export const getExcelFiles = (
  input,
  setInputDataState,
  excelSheet,
  setError
) => {
  if (!input) return;

  readXlsxFile(input.files[0], {
    sheet: excelSheet,
    map,
    dateFormat: "mm/dd/yyyy",
  })
    .then((payload) => {
      if (!payload || !payload?.rows.length) {
        setError({
          errorState: true,
          errorText:
            "Wrong file or wrong sheet or sheet is in incorrect format. Please check again.",
        });
        return;
      }
      setInputDataState(payload.rows);
    })
    .catch((err) => {
      setError({
        errorState: true,
        errorText: err.toString(),
      });
    });
};
