export class Env {
  static DB_URL = "mongodb+srv://storagesmash-db.1gtwf.gcp.mongodb.net/global";
  static DB_PASSWORD = process.env.DB_PASSWORD!;

  static Firebase_Key = require("/home/samuel/Desktop/code/storagesmash/StorageSmash-Api/env/officialstoragesmashFirebaseAdminsdk.json");
}
