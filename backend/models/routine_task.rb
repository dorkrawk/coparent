require 'sequel'
DB_PATH = "./db/database.db"
DB = Sequel.sqlite(DB_PATH)

class RoutineTask < Sequel::Model(:routine_tasks)

  STATUSES = {
    inactive: "inactive",
    in_progress: "in_progress",
    complete: "complete"
  }

  def routine
    Routine[routine_id]
  end

  def kids_completed_arr
    kids_completed ? kids_completed.split(",").map(&:to_i) : []
  end

  def all_kids_complete?
    kids_completed_arr == routine.kid_ids
  end

  def complete_for_kid!(kid_id)
    new_kids_completed = kids_completed_arr << kid_id
    update(kids_completed: new_kids_completed.uniq.join(","))
    refresh
    complete! if all_kids_complete?
    routine.check_and_update_status!
  end

  def complete!
    update(status: STATUSES[:complete])
  end

  def complete?
    status == STATUSES[:complete]
  end
end
