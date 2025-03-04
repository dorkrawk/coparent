require 'sequel'

DB_PATH = "./database.db"
DB = Sequel.sqlite(DB_PATH)
