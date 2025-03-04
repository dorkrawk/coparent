require 'sqlite3'
require 'sequel'

db_path = "database.db"

if !File.exist?(db_path)
  db = SQLite3::Database.new(db_path)
end

DB = Sequel.sqlite(db_path)

DB.create_table? :routines do
  primary_key :id
  String :name, null: false
  Integer :total_time
  String :description, text: true
  String :status
  String :kid_ids, text: true
  Integer :owner_id
  DateTime :created_at, default: Sequel::CURRENT_TIMESTAMP
end

DB.create_table? :routine_tasks do
  primary_key :id
  String :name, null: false
  Integer :routine_id
  Integer :buffer_time
  String :filter
  String :filter_value
  String :image_file
  String :audio_file
  String :kids_completed, text: true
  String :status
  DateTime :created_at, default: Sequel::CURRENT_TIMESTAMP
end

DB.create_table? :rewards do
  primary_key :id
  String :name
  String :link
  Integer :routine_id
  DateTime :created_at, default: Sequel::CURRENT_TIMESTAMP
end

DB.create_table? :kids do
  primary_key :id
  String :name
  Integer :age
  String :image_file
  DateTime :created_at, default: Sequel::CURRENT_TIMESTAMP
end
