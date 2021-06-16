export {};
const Airtable = require("airtable");
const fs = require("fs");
const path = require("path");

interface TranslationObject {
  key: string;
  fr: string;
  en: string;
}

interface AirtableRecord {
  get: (args0: "key" | "fr" | "en" | "name") => string;
}

interface JSONObject {
  [key: string]: string;
  value: string;
}

const API_KEY: string = JSON.parse(fs.readFileSync(".env-cmdrc.json"))["prod"]["AIRTABLE_API_KEY"];
const BASE_ID: string = JSON.parse(fs.readFileSync(".env-cmdrc.json"))["prod"][
  "AIRTABLE_LANG_BASE_ID"
];
const airtable = new Airtable({ apiKey: API_KEY });

// Getting all records from table with name tableName;
const getTableByName = async (tableName: string) => {
  try {
    const records = await airtable
      .base(BASE_ID)(tableName)
      .select({
        fields: ["key", "fr", "en"],
      })
      .all();

    if (records?.length) {
      const translations = records.map((translation: AirtableRecord) => {
        return {
          key: translation.get("key"),
          fr: translation.get("fr"),
          en: translation.get("en"),
        };
      });
      return translations;
    } else {
      console.log("Nothing returned from airtable, table:', tableName, 'is empty?");
      return [];
    }
  } catch (e) {
    console.error(tableName);
    console.log(e);
    throw new Error("An error occurred");
  }
};

//delete deprecated file fileName
const deleteOldFile = (fileName: string) => {
  try {
    fs.unlinkSync(path.join("./public/locales/en", fileName));
    fs.unlinkSync(path.join("./public/locales/fr", fileName));
  } catch (error) {
    console.error("Couldn't delete file", fileName);
  }
};

const writeLocales = (translationObject: TranslationObject, lang: string, fileName: string) => {
  try {
    // If file exists, reads from it and append new JSON value
    const json: JSONObject = JSON.parse(
      fs.readFileSync(path.join("./public/locales", lang, fileName))
    );
    json[translationObject.key] = lang === "en" ? translationObject.en : translationObject.fr;
    fs.writeFileSync(path.join("./public/locales", lang, fileName), JSON.stringify(json, null, 2));
  } catch (error) {
    // File doesn't exist, create it and write JSON value
    const dir = "public/locales/" + lang;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const json: { [key: string]: string } = {};
    json[translationObject.key] = lang === "en" ? translationObject.en : translationObject.fr;
    fs.writeFileSync(path.join("public/locales", lang, fileName), JSON.stringify(json, null, 2));
  }
};

//Getting all translation tables from Airtable
const getTablesName = async () => {
  try {
    const tablesNames = await airtable
      .base(BASE_ID)("All tables")
      .select({ fields: ["name"] })
      .all();

    const names = tablesNames.map((table: AirtableRecord) => {
      return table.get("name");
    });
    if (names?.length) {
      return names;
    } else {
      console.log("ERROR No tables were returned from Airtable");
      throw new Error();
    }
  } catch {
    console.log("ERROR");
    throw new Error();
  }
};

console.log("Getting Airtable tables names");
getTablesName().then((tables) => {
  tables.map((table: string) => {
    getTableByName(table).then((result) => {
      console.log("Table", table, "is being parsed");
      if (result?.length) {
        const tableDotJson = table + ".json";
        console.log("Deleting old", tableDotJson);
        deleteOldFile(tableDotJson);
        result.map((translationObject: TranslationObject) => {
          writeLocales(translationObject, "fr", tableDotJson);
          writeLocales(translationObject, "en", tableDotJson);
        });
        console.log("New", tableDotJson, "is ready");
      }
    });
  });
});
