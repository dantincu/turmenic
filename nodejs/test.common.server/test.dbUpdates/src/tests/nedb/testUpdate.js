import { dbContainer } from '../../../src.common.server/utils/noSql/nedb/dbContainer.js';

const dbCtr = dbContainer.instance;
const dbList = dbCtr.dbList;

export const runTestUpdate = () => {
    console.log("Running testUpdate");

    let db = dbCtr.getDatabase({ dbName: "testData", corruptAlertThreshold: 0.99 });
    db.removeIndex({ fieldName: "y" });
    db.remove({});
    db.loadDatabase(err => {
        if (err) {
            console.log("Load database error", err);
        } else {
            // db.ensureIndex({ fieldName: "y", unique: true });
            console.log("Trying to remove unique constraint");
            db.removeIndex({ fieldName: "y" });

            let doc = {
                x: 100,
                y: null
            }

            /* db.insert(doc, (err, newDoc) => {
                console.log("doc", doc);
                console.log("newDoc", newDoc);

                doc.x++;
                db.insert(doc, (err, newDoc1) => {
                    console.log("doc", doc);
                    console.log("newDoc", newDoc1);
                });
            }); */

            /* db.update({ x: 100 }, doc, { multi: true, upsert: true }, (err, numAffected, affectedDocuments, upsert) => {
                console.log(err, numAffected, affectedDocuments, upsert);
            }); */
        }
    });
}