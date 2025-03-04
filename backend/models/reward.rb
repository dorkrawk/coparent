require 'sequel'
DB_PATH = "./db/database.db"
DB = Sequel.sqlite(DB_PATH)

class Reward < Sequel::Model(:rewards)
end
