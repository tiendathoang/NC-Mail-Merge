import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Header,
  ImageRun,
  AlignmentType,
  SectionType,
  Footer,
  TextWrappingType,
  PageNumber,
  HorizontalPositionRelativeFrom,
  HorizontalPositionAlign,
  VerticalPositionRelativeFrom,
  VerticalPositionAlign,
} from "docx";
import { saveAs } from "file-saver";
import { imageBase64Data } from "../constants/constant";

const image = new ImageRun({
  data: Uint8Array.from(atob(imageBase64Data), (c) => c.charCodeAt(0)),
  transformation: {
    width: 260,
    height: 32,
  },
});

const imageFooter = new ImageRun({
  data: Uint8Array.from(atob(imageBase64Data), (c) => c.charCodeAt(0)),
  transformation: {
    width: 83,
    height: 11,
  },
  floating: {
    horizontalPosition: {
      relative: HorizontalPositionRelativeFrom.COLUMN,
      align: HorizontalPositionAlign.LEFT,
    },
    verticalPosition: {
      relative: VerticalPositionRelativeFrom.LINE,
      align: VerticalPositionAlign.CENTER,
    },
  },
});

export const generateDoc = ({
  employeeName,
  employeeInitials,
  module1Location,
  module1StartDate,
  module1EndDate,
  secondModuleLocation,
  secondModuleStartDate,
  secondModuleEndDate,
  toDay,
  seminarDetail,
}) => {
  const doc = new Document({
    sections: [
      {
        headers: {
          first: new Header({
            children: [
              new Paragraph({
                children: [image],
                alignment: AlignmentType.RIGHT,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Netcompany Vietnam Co., Ltd.   Opal Tower, 92 Nguyen Huu Canh, Ward 22, Binh Thanh   Ho Chi Minh City   Vietnam",
                    font: "Arial",
                    size: 14,
                  }),
                ],
                alignment: AlignmentType.RIGHT,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Phone: +84(0) 28 7300 5750   www.netcompany.com",
                    size: 14,
                    font: "Arial",
                  }),
                ],
                alignment: AlignmentType.RIGHT,
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  imageFooter,
                  new TextRun({
                    children: [
                      "© 2023 Netcompany          ",
                      PageNumber.CURRENT,
                      " / ",
                      PageNumber.TOTAL_PAGES,
                    ],
                    font: "Arial",
                    size: 14,
                  }),
                ],
                alignment: AlignmentType.RIGHT,
              }),
              // new Paragraph({
              //   children: [
              //     new TextRun({
              //       text: `© 2023 Netcompany ${PageNumber.CURRENT}/${PageNumber.TOTAL_PAGES}`,
              //       font: "Arial",
              //       size: 14,
              //     }),
              //   ],
              //   alignment: AlignmentType.RIGHT,
              // }),
            ],
          }),
        },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "SEMINAR INVITATION LETTER",
                size: 22,
                break: 3,
                font: "Arial (Headings)",
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Dear ${employeeName}`,
                size: 22,
                break: 3,
                font: "Arial (Headings)",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "You are hereby enrolled to the following training in Denmark with Netcompany A/S. Please find below the detailed of your training.",
                size: 22,
                break: 1,
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Module 1: ${seminarDetail.title}`,
                size: 22,
                break: 1,
                font: "Arial (Headings)",
                underline: { type: "single" },
              }),
            ],
            spacing: {
              after: 45,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Location: Denmark",
                size: 22,
                font: "Arial (Body)",
              }),
            ],
            spacing: {
              after: 45,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Period: ${module1StartDate} - ${module1EndDate}`,
                size: 22,
                font: "Arial (Body)",
              }),
            ],
            spacing: {
              after: 45,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Course description: ",
                size: 22,
                font: "Arial (Body)",
              }),
            ],
            spacing: {
              after: 45,
            },
          }),
          seminarDetail.heads1 &&
            new Paragraph({
              children: [
                new TextRun({
                  text: seminarDetail.heads1,
                  size: 22,
                  font: "Arial (Body)",
                }),
              ],
            }),
          ...seminarDetail?.bullets1.map(
            (item) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: item,
                    size: 22,
                    font: "Arial (Body)",
                  }),
                ],
                spacing: {
                  after: 45,
                },
                bullet: {
                  level: 0, // How deep you want the bullet to be. Maximum level is 9
                },
              })
          ),
          seminarDetail.heads2 &&
            new Paragraph({
              children: [
                new TextRun({
                  text: seminarDetail.heads2,
                  size: 22,
                  font: "Arial (Body)",
                  break: 1,
                }),
              ],
            }),
          ...seminarDetail.bullets2.map((item) => {
            return new Paragraph({
              children: [
                new TextRun({
                  text: item,
                  size: 22,
                  font: "Arial (Body)",
                }),
              ],
              spacing: {
                after: 45,
              },
              bullet: {
                level: 0, // How deep you want the bullet to be. Maximum level is 9
              },
            });
          }),
          seminarDetail.heads3 &&
            new Paragraph({
              children: [
                new TextRun({
                  text: seminarDetail.heads3,
                  size: 22,
                  font: "Arial (Body)",
                }),
              ],
            }),
          ...seminarDetail?.bullets3?.map(
            (item) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: item,
                    size: 22,
                    font: "Arial (Body)",
                  }),
                ],
                spacing: {
                  after: 45,
                },
                bullet: {
                  level: 0, // How deep you want the bullet to be. Maximum level is 9
                },
              })
          ),
          new Paragraph({
            children: [
              new TextRun({
                text: "Agenda: please find the appendix of module 1 attaches with this invitation letter  ",
                size: 22,
                font: "Arial (Headings)",
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Module 2: On-the-job-training ",
                size: 22,
                font: "Arial (Headings)",
                break: 1,
                underline: { type: "single" },
              }),
            ],
            spacing: {
              after: 45,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Location: ${secondModuleLocation}`,
                size: 22,
                font: "Arial (Body)",
              }),
            ],
            spacing: {
              after: 45,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Period: ${secondModuleStartDate} - ${secondModuleEndDate}`,
                size: 22,
                font: "Arial (Body)",
              }),
            ],
            spacing: {
              after: 45,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Course description:",
                size: 22,
                font: "Arial (Body)",
              }),
            ],
            spacing: {
              after: 65,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Module 2 is primarily a module regarding the practical skills needed in the business. Employees enjoy the daily feedback, coaching and learnings from their managers and peers.",
                size: 22,
                font: "Arial (Body)",
              }),
            ],
            spacing: {
              after: 45,
            },
            bullet: {
              level: 0, // How deep you want the bullet to be. Maximum level is 9
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Module 2 will always be an individual learning experience, because it depends on which prior module they have been on and which of the following skills, they need to practise.",
                size: 22,
                font: "Arial (Body)",
              }),
            ],
            spacing: {
              after: 45,
            },
            bullet: {
              level: 0, // How deep you want the bullet to be. Maximum level is 9
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Skills to practise in module 2 are i.e., Netcompany Methodology, Proper Code Writing, Documenting you code, Client Engagement, Project Management, Teamwork and Netcompany values and business model.",
                size: 22,
                font: "Arial (Body)",
              }),
            ],
            spacing: {
              after: 45,
            },
            bullet: {
              level: 0, // How deep you want the bullet to be. Maximum level is 9
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Above mentioned skills should be part of the day-to-day work and training.",
                size: 22,
                font: "Arial (Body)",
              }),
            ],
            spacing: {
              after: 45,
            },
            bullet: {
              level: 0, // How deep you want the bullet to be. Maximum level is 9
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Agenda: please find the appendix of module 1 attaches with this invitation letter  ",
                size: 22,
                font: "Arial (Headings)",
              }),
            ],
          }),
          seminarDetail.complete &&
            new Paragraph({
              children: [
                new TextRun({
                  text: seminarDetail.complete,
                  size: 22,
                  font: "Arial (Body)",
                  break: 1,
                }),
              ],
              spacing: {
                after: 55,
              },
            }),
          ...seminarDetail?.completeBullets.map(
            (item) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: item,
                    size: 22,
                    font: "Arial (Body)",
                  }),
                ],
                spacing: {
                  after: 45,
                },
                bullet: {
                  level: 0, // How deep you want the bullet to be. Maximum level is 9
                },
              })
          ),
          new Paragraph({
            children: [
              new TextRun({
                text: "Transport: The Company will cover all costs associated with the employee travel to Denmark. Accommodation: The Company will provide suitable accommodation in Denmark during the stay. Travel Insurance: The Company has travel insurance in place to cover all employees travelling abroad.",
                size: 22,
                font: "Arial (Headings)",
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `${toDay()}`,
                size: 22,
                font: "Arial (Headings)",
                break: 2,
              }),
            ],
            alignment: AlignmentType.RIGHT,
          }),
        ],

        properties: {
          titlePage: true,
        },
      },
    ],
  });

  Packer.toBlob(doc)
    .then((blob) => {
      saveAs(blob, `SEMINAR INVITATION LETTER - ${employeeInitials}.docx`);
      console.log("Document created successfully");
    })
    .catch((err) => console.log(err));
};
