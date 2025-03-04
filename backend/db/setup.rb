require 'sqlite3'
require 'sequel'

db_path = "database.db"

if !File.exist?(db_path)
  db = SQLite3::Database.new(db_path)
end

DB = Sequel.sqlite(db_path)

DB.create_table? :tasks do
  primary_key :id
  String :title, null: false
  String :description, text: true
  Boolean :completed, default: false
  Integer :assignee_id, null: false 
  DateTime :created_at, default: Sequel::CURRENT_TIMESTAMP
end
