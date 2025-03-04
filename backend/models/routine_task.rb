require 'sequel'
DB_PATH = "./db/database.db"
DB = Sequel.sqlite(DB_PATH)

class RoutineTask < Sequel::Model(:routine_tasks)

  STATUSES = {
    inactive: "inactive",
    in_progress: "in_progress",
    complete: "complete"
  }

  def complete!
    update(status: STATUSES[:complete])
  end

  def complete?
    status == STATUSES[:complete]
  end
end
