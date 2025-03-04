# require_relative "../db/config"
require 'sequel'
DB_PATH = "./db/database.db"
DB = Sequel.sqlite(DB_PATH)

class Kid < Sequel::Model(:kids)
end
