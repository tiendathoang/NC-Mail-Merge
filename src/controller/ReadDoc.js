import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Header,
  ImageRun,
  HorizontalPositionRelativeFrom,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";
import logoNC from "../images/logoNC.png";

const toDataURL = (url) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

// const ImageLogo = new ImageRun({
//   data: Uint8Array.from(
//     atob(
//       toDataURL(logoNC).then((dataUrl) => {
//         return dataUrl;
//       }),
//       "base64"
//     ),
//     (c) => c.charCodeAt(0)
//   ),
//   transformation: {
//     width: 200,
//     height: 200,
//   },
// });

const imageBase64Data = `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`;
console.log(imageBase64Data);

const image = new ImageRun({
  data: Uint8Array.from(atob(imageBase64Data), (c) => c.charCodeAt(0)),
  transformation: {
    width: 260,
    height: 32,
  },
});

export const generateDoc = async () => {
  const doc = new Document({
    sections: [
      {
        headers: {
          default: new Header({
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
                text: "Dear Hoàng Tiến Đạt",
                size: 22,
                break: 3,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "You are hereby enrolled to the following training in Denmark with Netcompany A/S. Please find below the detailed of your training",
                size: 22,
                break: 1,
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Module 1: CES",
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
                text: "Location: DK",
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
                text: "Period: 1 Nov - 10 Nov",
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
                text: "Course description: [insert respective seminar description]",
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
                text: "Agenda: please find the appendix of module 1 attaches with this invitation letter  ",
                size: 22,
                font: "Arial (Headings)",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Module 2: On-the-job-training ",
                size: 22,
                font: "Arial (Headings)",
                break: 3,
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
                text: "Location: [module 2 location]",
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
                text: "Period: 1 Nov - 20 Nov",
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
          new Paragraph({
            children: [
              new TextRun({
                text: "Upon completion of this training: ",
                size: 22,
                font: "Arial (Headings)",
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "have gained an understanding of the role as consultant at Netcompany.",
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
                text: "Have gained an understanding of Netcompany Methodology.",
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
                text: "Have increased the awareness of protocol during client projects and team-based projects.",
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
                text: "Transport: The Company will cover all costs associated with the employee travel to Denmark. Accommodation: The Company will provide suitable accommodation in Denmark during the stay. Travel Insurance: The Company has travel insurance in place to cover all employees travelling abroad.",
                size: 22,
                font: "Arial (Headings)",
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "31.10.2023",
                size: 22,
                font: "Arial (Headings)",
                break: 2,
              }),
            ],
            alignment: AlignmentType.RIGHT,
          }),
        ],

        properties: {},
      },
    ],
  });

  Packer.toBlob(doc)
    .then((blob) => {
      saveAs(blob, "ex.docx");
      console.log("Document created successfully");
    })
    .catch((err) => console.log(err));
};

// headers: {
//   default: new Header({
//     children: [
//       new Paragraph({
//         children: [
//           new TextRun("Hello World"),
//           new TextRun({
//             text: "Foo Bar",
//             bold: true,
//           }),
//           new TextRun({
//             text: "\tGithub is the best",
//             bold: true,
//           }),
//         ],
//       }),
// new ImageRun({
//   data: toDataURL(logoNC).then((dataUrl) => {
//     return dataUrl;
//   }),
//   transformation: {
//     width: 200,
//     height: 200,
//   },
// }),
//     ],
//   }),
// },
