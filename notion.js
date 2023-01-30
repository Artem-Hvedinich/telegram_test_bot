require('dotenv').config()
const {Client} = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY
});

(async () => {
  const database_id = process.env.NOTION_DATABASE_ID
  const response = await notion.databases.retrieve({database_id});
  console.log(response);
})();

(async () => {
  // const databaseId = process.env.NOTION_DATABASE_ID;
  const response = await notion.databases.list();
  // console.log(response);
})();

// function createdSuggest() {
//   notion.pages.create()
// }